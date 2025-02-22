# WiseCrack - Your AI-Powered Mood Booster

WiseCrack is a React Native app that helps users navigate their emotions by providing **AI-powered advice** and **mood tracking**. Whenever a user shares a problem, the app offers a **helpful response** followed by a **lighthearted joke** to improve their mood. Additionally, users can **track their moods over time** using Supabase.

---

## Features

**AI-Powered Solutions** - Get helpful advice tailored to your situation  
**Mood-Based Jokes** - Lighten the mood with a joke after receiving advice  
**Mood Tracking** - Save your moods and view past entries  
**Authentication** - Secure user login with Supabase Auth  
**Clean UI with Expo Router** - Smooth navigation using file-based routing  

---

## Tech Stack

- **React Native** (with Expo) - Frontend framework  
- **Supabase** - Backend for authentication & mood tracking  
- **OpenAI GPT-3.5** (or compatible AI service) - Provides AI-generated advice & jokes  
- **Expo Router** - Simplified navigation  

---

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/wisecrack.git
cd wisecrack
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```sh
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
```

### 4️⃣ Run the App
```sh
npx expo start
```

---

## Usage

### 🏠 Home Page
- See your last saved mood  
- Navigate to **Chat** or **Settings**

### 💬 Chat Page
- Enter your **problem or situation**
- AI provides **helpful advice**
- AI follows up with a **joke** 😆

### ⚙️ Settings Page
- **Track Your Mood** by selecting how you feel  
- Save moods to **Supabase** securely  

---

## Supabase Setup (Mood Tracking)

1️⃣ **Enable Authentication** (Go to Supabase Dashboard → Authentication → Enable Email Auth)  
2️⃣ **Create `moods` Table** with:
   - `id` (UUID, primary key)
   - `mood` (TEXT)
   - `user_id` (UUID, default: `auth.uid()`)
   - `created_at` (TIMESTAMP, default: `now()`)  
3️⃣ **Enable Row-Level Security (RLS)**  
4️⃣ **Add Policies**:
   - **SELECT:** `auth.uid() = user_id`
   - **INSERT:** `auth.uid() = user_id`

---

## Future Enhancements

🚀 Dark Mode Support  
🚀 AI-Generated Mood Insights  
🚀 More Personalization (Mood-Based Joke Preferences)  

---

## Contributing
Feel free to fork the repo and submit pull requests or wispher to me the email on my profile

