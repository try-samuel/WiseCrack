import { OPENAI_API_KEY } from "@env";

export const analyzeSentiment = async (message: string) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that detects emotions in text. Reply with one of these moods only: happy, neutral, sad, angry, tired.",
          },
          {
            role: "user",
            content: `Analyze this message and return the mood only: "${message}"`,
          },
        ],
        temperature: 0,
      }),
    });

    const data = await response.json();

    // Check if response is ok and has the expected structure
    if (!response.ok) {
      console.error("API response not ok:", data);
      return "neutral";
    }

    if (!data.choices?.[0]?.message?.content) {
      console.error("Unexpected API response structure:", data);
      return "neutral";
    }

    const mood = data.choices[0].message.content.trim().toLowerCase();

    if (["happy", "neutral", "sad", "angry", "tired"].includes(mood)) {
      return mood;
    } else {
      return "neutral"; // Default fallback mood
    }
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "neutral";
  }
};
