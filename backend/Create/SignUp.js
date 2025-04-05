import { supabase } from './supabaseClient';

async function handleSignUp(email, password) {
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