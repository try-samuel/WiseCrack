import { supabase } from "./supabase";

export const saveMood = async (mood: string) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("User not authenticated");
    return;
  }

  const { error } = await supabase
    .from("moods")
    .insert([{ mood, user_id: user.id }]);

  if (error) console.error("Error saving mood:", error);
};
