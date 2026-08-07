# Muslim Companion App

A comprehensive Muslim companion mobile app built with React Native + Expo.

## Features

- 🕌 **Prayer Times** — Accurate prayer times using AlAdhan API + adhan-js fallback for offline use
- 🧭 **Qibla Direction** — Compass bearing to Mecca from any location worldwide
- 📖 **Quran** — Browse and read the Quran with French translations
- 📍 **Geolocation** — GPS auto-detection or manual city selection
- 🔔 **Notifications** — Configurable adhan notifications per prayer
- 🌙 **Dark Mode** — Full light/dark mode support
- 🌍 **Multi-language** — French, Arabic, English

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile Framework | React Native + Expo |
| Navigation | Expo Router |
| Backend / Auth | Supabase |
| Database | PostgreSQL (via Supabase) |
| State Management | Zustand |
| Prayer Calculations | adhan-js + AlAdhan API |
| Location | expo-location |
| Notifications | expo-notifications |
| Styling | NativeWind (TailwindCSS) |
| Language | TypeScript |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app on your phone (for development)

### Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start the development server
npm start
```

### Environment Variables

See [.env.example](.env.example) for required variables.
See [SETUP.md](SETUP.md) for Supabase configuration.

## Project Structure

```
muslim-companion-app/
├── app/                   # Expo Router screens
│   ├── (tabs)/            # Tab navigation
│   ├── auth/              # Auth screens
│   └── splash.tsx         # Splash/loading screen
├── src/
│   ├── services/          # API and data services
│   ├── hooks/             # React hooks
│   ├── components/        # Reusable UI components
│   ├── constants/         # Static data and config
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Helper functions
│   ├── state/             # Zustand global state
│   └── config/            # App configuration
└── assets/                # Images, fonts, icons
```

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed architecture documentation.

## Build & Deploy

See [EAS Build](https://docs.expo.dev/build/introduction/) for creating production builds:

```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## License

MIT
