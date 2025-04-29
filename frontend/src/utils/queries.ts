import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)
export async function handleSignIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      console.error('Error signing in:', error.message);
    } else {
      console.log('Sign-in successful:', data);
    }
  }

  
  export async function createEvent( 
        name: string, 
        spots_remaining: string, 
        description: string, 
        _time: string, 
        allergens: string,
        time_start: any,
        time_end: any
    ) {
    const { data, error } = await supabase
      .from('Events')
      .insert(
        {
          name,
          spots_remaining,
          description,
          time_start,
          time_end,
          allergens
        }
      )
  
    if (error) {
      console.error('Error creating event:', error.message)
      return { success: false, error }
    }
  
    if (!data) {
      return { success: false, error: new Error('No data returned') };
    }
    return { success: true, event: data[0] }
  }
  
  export async function handleSignUp(fullname: string, email: string, password: string) {
    const { data, error } = await supabase
      .from('users')
      .insert({
      fullname,
      email,
      password,
    });
  
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('Sign-up successful:', data);
    }
  }