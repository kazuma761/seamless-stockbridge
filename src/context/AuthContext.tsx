
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'inventory_manager' | 'user';
};

type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isInventoryManager: boolean;
  createUser: (email: string, password: string, firstName: string, lastName: string, role: 'admin' | 'inventory_manager' | 'user') => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        setIsLoading(false);
        return;
      }
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        setProfile(profileData as Profile | null);
      }
      
      setIsLoading(false);
    };
    
    setData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          setProfile(profileData as Profile | null);
        } else {
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      navigate('/dashboard');
      toast.success('Successfully signed in');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    try {
      setIsLoading(true);
      
      // Create the user in Supabase Auth
      const { data: userData, error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      // Update the profile with first and last name if provided
      if (userData.user && (firstName || lastName)) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName
          })
          .eq('id', userData.user.id);
          
        if (updateError) console.error('Error updating profile:', updateError);
      }
      
      toast.success('Registration successful! Please check your email to confirm your account.');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during registration');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    role: 'admin' | 'inventory_manager' | 'user'
  ) => {
    try {
      setIsLoading(true);
      
      if (!isAdmin) {
        toast.error('Only administrators can create users');
        return;
      }
      
      const { data, error } = await supabase.functions.invoke('admin-create-user', {
        body: {
          email,
          password,
          firstName,
          lastName,
          role
        }
      });
      
      if (error) throw error;
      
      toast.success(`User ${email} created successfully with role: ${role}`);
      return data;
    } catch (error: any) {
      toast.error(error.message || 'An error occurred creating user');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setSession(null);
      navigate('/');
      toast.success('Successfully signed out');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign out');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = profile?.role === 'admin';
  const isInventoryManager = profile?.role === 'inventory_manager';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        signIn,
        signUp,
        signOut,
        isAdmin,
        isInventoryManager,
        createUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
