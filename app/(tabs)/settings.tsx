import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const moods = ["😊", "😐", "😢", "😡", "😴"]; // Example moods

const SettingsScreen = () => {
  const router = useRouter();
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
    else setSelectedMood(mood);
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
  const handleLogout = async () => {
    Alert.alert(
      "Are you sure you want to logout?",
      "You will need to log in again to access your account.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) Alert.alert("Error", error.message);
            else router.replace("/(auth)");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
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

      <View style={styles.footer}>
        <View style={styles.separator} />
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="white" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  moodContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginBottom: 10,
  },
  moodButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ddd",
  },
  moodText: {
    fontSize: 24,
  },
  currentMood: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    width: "100%",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
