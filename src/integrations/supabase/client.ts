// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xzppribyovslacpmrqdc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6cHByaWJ5b3ZzbGFjcG1ycWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxOTc3MTAsImV4cCI6MjA2ODc3MzcxMH0.6QFrx3BWAgyqk2EnCqmr4jegMDf-dwXzAE-aBxOKbks";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});