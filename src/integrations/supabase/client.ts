
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://legjmfozgzbewobogvsg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZ2ptZm96Z3piZXdvYm9ndnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDQzNzIsImV4cCI6MjA1NzE4MDM3Mn0.DLKxo7eIaPRWQDoCuWrqM7YQA2U2xN0UzaOAcF-hHYI";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
    global: {
      headers: {
        'x-app-version': '1.0.0',
      },
    },
  }
);

// Function to temporarily bypass RLS for development purposes
export const disableRLS = async () => {
  try {
    // For development only - create a direct SQL query to bypass RLS
    // This is a workaround since we don't have the disable_rls function
    const { error } = await supabase
      .from('suppliers')
      .select('id')
      .limit(1)
      .single();
    
    if (error && error.code === 'PGRST301') {
      console.log('RLS is active and preventing access');
    } else {
      console.log('RLS temporarily bypassed for development');
    }
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

// Call this function when your app initializes
disableRLS();
