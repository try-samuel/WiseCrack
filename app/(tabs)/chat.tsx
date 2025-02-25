import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { analyzeSentiment } from "@/lib/analyzeSentiment";
import { saveMood } from "@/lib/saveMood";

const ChatScreen = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey! What's on your mind today? 😊", sender: "bot" },
  ]);
  const [showMoodReminder, setShowMoodReminder] = useState(false);

  useEffect(() => {
    checkUserMood();
  }, []);

  const checkUserMood = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("moods")
      .select("mood")
      .order("created_at", { ascending: false })
      .limit(1);

    if (!error && (!data || data.length === 0)) {
      setShowMoodReminder(true);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setInputText("");
    Keyboard.dismiss();

    // Analyze sentiment and update mood
    const detectedMood = await analyzeSentiment(inputText);
    if (detectedMood) saveMood(detectedMood);
  };

  return (
    <View style={styles.container}>
      {showMoodReminder && (
        <View style={styles.moodReminder}>
          <Text style={styles.moodText}>
            Go to settings to set your current mood
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/settings")}
            style={styles.moodButton}
          >
            <Text style={styles.buttonText}>Go</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowMoodReminder(false)}>
            <MaterialCommunityIcons name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={[...messages].reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === "user" && styles.userMessageContainer,
            ]}
          >
            {item.sender === "bot" && (
              <MaterialCommunityIcons
                name="robot"
                size={24}
                color="#666"
                style={styles.botIcon}
              />
            )}
            <View
              style={[
                styles.messageBubble,
                item.sender === "user" ? styles.userBubble : styles.botBubble,
              ]}
            >
              <Text
                style={[
                  item.sender === "user" ? styles.userText : styles.botText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
        inverted
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your problem here..."
            placeholderTextColor="#999"
            value={inputText}
            onChangeText={setInputText}
            autoCapitalize="sentences"
            autoCorrect={true}
          />
          <TouchableOpacity onPress={sendMessage}>
            <MaterialCommunityIcons name="send" size={24} color="#3369FF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  moodReminder: {
    backgroundColor: "#eed202",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 10,
  },
  moodText: {
    fontSize: 14,
    color: "#000",
  },
  moodButton: {
    backgroundColor: "#3369FF",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  messageBubble: {
    padding: 20,
    borderRadius: 25,
    marginBottom: 8,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#3369FF",
    borderTopRightRadius: 0,
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#EEEEEE",
    borderBottomLeftRadius: 0,
  },
  userText: {
    color: "#FFFFFF",
  },
  botText: {
    color: "#000000",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
    gap: 20,
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    outline: "none",
    padding: 10,
    marginRight: 10,
  },
  botIcon: {
    marginRight: 8,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
});
