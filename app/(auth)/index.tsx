import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Welcome to WiseCrack
      </Text>
      <Button title="Sign Up" onPress={() => router.push("/signup")} />
      <Button title="Login" onPress={() => router.push("/login")} />
    </View>
  );
}
