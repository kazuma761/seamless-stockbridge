// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://legjmfozgzbewobogvsg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZ2ptZm96Z3piZXdvYm9ndnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MDQzNzIsImV4cCI6MjA1NzE4MDM3Mn0.DLKxo7eIaPRWQDoCuWrqM7YQA2U2xN0UzaOAcF-hHYI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);