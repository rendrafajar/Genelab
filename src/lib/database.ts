import { createClient } from "@supabase/supabase-js";

// Use Supabase client instead of direct pg connection in browser environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

// Log connection status
console.log("Supabase client initialized");

export default supabase;
