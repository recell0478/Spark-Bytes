import { supabase } from '../backend/supabaseClient'

export async function createEvent({ name, spots_remaining, description, time, allergens }) {
  const { data, error } = await supabase
    .from('Events')
    .insert([
      {
        name,
        spots_remaining,
        description,
        time_start,
        time_end,
        allergens
      }
    ])

  if (error) {
    console.error('Error creating event:', error.message)
    return { success: false, error }
  }

  return { success: true, event: data[0] }
}

