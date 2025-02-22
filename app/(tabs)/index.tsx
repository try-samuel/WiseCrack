import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { supabase } from "@/lib/supabase";

const HomeScreen = () => {
  const [lastMood, setLastMood] = useState<string | null>(null);

  useEffect(() => {
    fetchLastMood();
  }, []);

  const fetchLastMood = async () => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return;

    const { data, error } = await supabase
      .from("moods")
      .select("mood")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!error && data.length > 0) {
      setLastMood(data[0].mood);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to WiseCrack!</Text>
      {lastMood && (
        <Text style={styles.moodText}>Your last mood: {lastMood}</Text>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  welcomeText: { fontSize: 20, fontWeight: "bold" },
  moodText: { fontSize: 16, marginTop: 10 },
});
