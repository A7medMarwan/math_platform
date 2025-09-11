import { createClient } from "@supabase/supabase-js";

const supabaseUrl2 = "https://hsqodpjhgpxdhkcybwmt.supabase.co";
const supabaseAnonKey2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzcW9kcGpoZ3B4ZGhrY3lid210Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyODM3OTgsImV4cCI6MjA3Mjg1OTc5OH0.Btic-SuWpbbODrR6ZuvvaCZlQbyJT8EBuBZwzCwd3AI";

export const supabase2 = createClient(supabaseUrl2, supabaseAnonKey2, {
  auth: {
    storageKey: "supabase.auth.secondProject",
  },
});
export default supabase2;
