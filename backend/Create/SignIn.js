import { supabase } from './supabaseClient';

async function handleSignIn(email, password) {
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
