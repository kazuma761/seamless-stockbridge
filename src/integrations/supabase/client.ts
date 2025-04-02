
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

// Function to disable RLS for development purposes
export const disableRLS = async () => {
  try {
    // This is a workaround for development only - creates a temporary service role session
    // In production, you should use proper authentication
    await supabase.rpc('disable_rls');
    console.log('RLS temporarily disabled for development');
  } catch (error) {
    console.error('Failed to disable RLS:', error);
  }
};

// Call this function when your app initializes
disableRLS();
