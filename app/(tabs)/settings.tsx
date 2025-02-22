import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";

const moods = ["😊", "😐", "😢", "😡", "😴"]; // Example moods

const SettingsScreen = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  useEffect(() => {
    fetchLastMood();
  }, []);

  const saveMood = async (mood: string) => {
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

  const fetchLastMood = async () => {
    const { data, error } = await supabase
      .from("moods")
      .select("mood")
      .order("created_at", { ascending: false })
      .limit(1);

    if (!error && data.length > 0) {
      setSelectedMood(data[0].mood);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you feeling today?</Text>
      <View style={styles.moodContainer}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood}
            onPress={() => saveMood(mood)}
            style={styles.moodButton}
          >
            <Text style={styles.moodText}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMood && (
        <Text style={styles.currentMood}>Your last mood: {selectedMood}</Text>
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  moodContainer: { flexDirection: "row", gap: 10 },
  moodButton: { padding: 10, borderRadius: 10, backgroundColor: "#ddd" },
  moodText: { fontSize: 24 },
  currentMood: { marginTop: 20, fontSize: 16 },
});
