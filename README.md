# Bro Scores ⚽

*Bro, what's the score?* — a fast, no-login companion for the **2026 FIFA World Cup**.
All 104 matches in your timezone, live scores, calendar, the full knockout bracket, player
stats, and goal alerts for the teams you follow. Neo-brutalist design. Works offline for
fixtures; live data needs no setup.

Part of the **Bro** family (alongside *Bro Splits*).

---

## 📲 Download (Android)

**[⬇ Download the latest APK](https://github.com/khavjhav/bro-scores/releases/latest/download/BroScores.apk)**

That link always points to the newest release. To install:

1. Open it on your Android phone.
2. Allow *"install from unknown sources"* if prompted.
3. Open **Bro Scores** and you're set — it'll prompt you in-app whenever a new version ships.

> Already installed? The app checks for updates on launch and offers a one-tap update.

## 🍎 iPhone / iPad (PWA)

No App Store needed — open the web app and add it to your home screen:

**[Open Bro Scores](https://khavjhav.github.io/bro-scores/)** → Share → **Add to Home Screen**.

It runs full-screen like a normal app. (iOS limitation: home-screen web apps can't do
background goal push — scores still update live while the app is open.)

---

## ✨ Features

- **Matches** — Fixtures / Results / Following, with a live match pinned to the top.
- **Calendar** — month grid; tap any day for its matches and results.
- **Tables** — live group standings (all 12 groups) + the knockout bracket, R32 → Final.
- **Stats** — Golden Boot race and assists leaders, filterable by group.
- **Match detail** — Timeline (goals, cards, subs), Lineups, and a team-stats panel; auto-refreshes live.
- **Follow teams** — pulsing highlight everywhere, a reminder 30 min before kickoff, and a buzz on every goal.
- **Anonymous feedback** — send bugs/ideas straight from the app, no login.

Live data comes from ESPN's public endpoints. Nothing to host, no API key.

---

## 🛠️ Build it yourself

```bash
npm install
npm run dev                 # web preview at localhost:5173

# Android APK
npm run build && npx cap sync android
cd android && ./gradlew assembleDebug   # → app/build/outputs/apk/debug/

# iOS (needs a Mac + Xcode)
npm run build && npx cap sync ios && npx cap open ios
```

Stack: React + Vite + Capacitor 6. App icons/splash via `@capacitor/assets`.

---

## 🔁 Releasing an update (maintainer notes)

1. Bump `versionCode` (and `versionName`) in `android/app/build.gradle`.
2. `npm run build && npx cap sync android`, then `gradlew assembleDebug`.
3. Create a GitHub release tagged `vX.Y.Z`, attach the APK named **`BroScores.apk`**.
4. Update **`version.json`** on `main` (`versionCode`, `versionName`, `notes`, `mandatory`).

Old users are prompted automatically on next launch. Keep signing consistent (debug keystore
across debug builds) so updates install over the previous version.

> Note: uses the "World Cup" name and ESPN's unofficial data for personal/hobby use.
