import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://cwcnanzfvrwwvcegngmv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3Y25hbnpmdnJ3d3ZjZWduZ212Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDA3MzYsImV4cCI6MjA1ODUxNjczNn0.fxvwowTT0NHVJQBgjyttLpY8vjzDorqG4JDGK4Hgpyo';

export const supabase = createClient(supabaseUrl, supabaseKey);