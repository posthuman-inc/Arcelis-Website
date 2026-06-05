import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Surfaced at build/runtime so a missing env var never fails silently.
  console.warn("[arcelis] Supabase env vars are not set. Lead capture will be disabled.");
}

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;

export type LeadInput = {
  full_name: string;
  company?: string;
  email: string;
  phone?: string;
  employee_count?: string;
  message?: string;
};
