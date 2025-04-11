import {supabase} from './supabaseClient'





async function handleSignIn(email: string, password: string) {
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
        time: string, 
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
  
    return { success: true, event: data[0] }
  }
  
  async function handleSignUp(fullname: string, email: string, password: string) {
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