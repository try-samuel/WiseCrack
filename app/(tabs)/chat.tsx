import React, { useState } from "react";
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

const ChatScreen = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey! What's on your mind today? 😊", sender: "bot" },
    { id: "2", text: "I'm having trouble with my computer.", sender: "user" },
    {
      id: "",
      text: "I'm sorry to hear that. What seems to be the problem?",
      sender: "bot",
    },
  ]);

  const sendMessage = () => {
    if (inputText.trim() === "") return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setInputText(""); // Clear input field
    Keyboard.dismiss();

    // Here we will later add AI response logic
  };

  return (
    <View style={styles.container}>
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
