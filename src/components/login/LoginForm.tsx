
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui-components/GlassCard';
import { useAuth } from '@/context/AuthContext';

interface LoginFormProps {
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { signIn, signUp, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      await signUp(email, password, firstName, lastName);
    } else {
      await signIn(email, password);
    }
  };

  return (
    <GlassCard className={cn('w-full max-w-md p-8', className)} elevation="high">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient">InventTrack</h2>
        <p className="text-muted-foreground mt-2">Inventory Management System</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="block w-full pl-10 pr-3 py-2.5 border border-border bg-white/5 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="block w-full pl-10 pr-10 py-2.5 border border-border bg-white/5 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
        
        {isSignUp && (
          <>
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                className="block w-full px-3 py-2.5 border border-border bg-white/5 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                className="block w-full px-3 py-2.5 border border-border bg-white/5 rounded-lg focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </>
        )}
        
        {!isSignUp && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-border bg-white/5 focus:ring-accent/50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="hover:text-accent transition-colors">
                Forgot password?
              </a>
            </div>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-ocean hover:bg-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300',
            isLoading && 'opacity-70 cursor-not-allowed'
          )}
        >
          {isLoading ? (
            <div className="animate-pulse flex items-center">
              <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2"></div>
              {isSignUp ? 'Signing up...' : 'Signing in...'}
            </div>
          ) : (
            isSignUp ? 'Sign Up' : 'Sign In'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        {isSignUp ? (
          <p>Already have an account? <button onClick={() => setIsSignUp(false)} className="text-accent hover:underline">Sign In</button></p>
        ) : (
          <p>Don't have an account? <button onClick={() => setIsSignUp(true)} className="text-accent hover:underline">Sign Up</button></p>
        )}
      </div>
    </GlassCard>
  );
};

export default LoginForm;
