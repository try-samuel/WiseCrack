import { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/(auth)");
      }
      setUser(data?.user ?? null);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return null; // Wait for user check

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color || "black"} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color={color || "black"} />
          ),
        }}
      />
    </Tabs>
  );
}
