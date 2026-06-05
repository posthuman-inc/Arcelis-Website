import { createClient } from "@supabase/supabase-js";

// The anon/publishable key is public by design — it ships in the browser bundle
// regardless, and RLS (public.leads is insert-only, no read) is what protects
// data. So these are safe defaults that let the deploy work with zero config.
// Env vars still override them for staging/other projects. NEVER put the
// service_role key or the sbp_ management token here.
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://qgcxitrxxishmhwdfkxz.supabase.co";
const anonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_7F7tKv_Uux5xGQ-y0xJP3Q_Bh08_gbL";

export const supabase = createClient(url, anonKey);

export type LeadInput = {
  full_name: string;
  company?: string;
  email: string;
  phone?: string;
  employee_count?: string;
  message?: string;
};
