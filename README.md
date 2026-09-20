# TYPO

A kinetic typing speed game built with React 19, Tailwind CSS v4, and Motion. Test your typing skills across three difficulty levels with AI-generated content and real-time WPM and accuracy tracking.

## Features

- **3 difficulty levels** with distinct typing requirements:
  - **Easy** — lowercase only, no punctuation, short everyday words
  - **Medium** — uppercase + simple punctuation (`, . '`)
  - **Hard** — uppercase + complex punctuation (`! ? ; : — " '`)
- **LLM-generated content** — each game fetches 10 fresh sentences per level from Groq (`openai/gpt-oss-120b`) with a strict JSON-schema response; falls back to 30 built-in quotes per level in `src/data/quotes.js` when the key is missing, the request fails, or generation exceeds the 3-second loading window (in-flight requests are deduped and aborted)
- **200-word sequences** built by concatenating random quotes and truncating to exactly 200 words
- **Real-time WPM & accuracy** — WPM = `(correctChars / 5) / minutes`, accuracy = `correctChars / totalTyped × 100`; the clock starts on your **first keystroke**, ticks every 50 ms, and ends the game automatically at 999 s
- **Score history** — last 6 results per difficulty recorded on every finished game, including quits. Note: they are kept in memory for the session and are not currently surfaced in the UI.
- **Latest-stats marquee** — seamless viewport-sized CSS marquee showing `0 WPM / 0% / 0.0s` before any game, then the latest finished game's WPM / accuracy / time after each game. State is session-only (resets to 0 on reload) and latched in `App.jsx` so it survives screen unmounts and auto-updates after every subsequent game.
- **Animated UI** — loading screen, spring-animated completion modal (WPM, accuracy, seconds, difficulty + Play Again / Back to Home), word-by-word highlighting (correct / struck-through / current), live stats, and progress bar
- **Keyboard-first** — `Enter` starts, `Escape` quits (quitting before the first keystroke exits without recording a result); modal also closes on backdrop click
- **Mobile-aware** — auto-focused input with autocapitalize/autocorrect/spellcheck off, `dvh` sizing, compact landscape layout, `prefers-reduced-motion` support

## Tech Stack

| Tool                                              | Purpose                                                      |
| ------------------------------------------------- | ------------------------------------------------------------ |
| [Vite 8](https://vite.dev/)                       | Build tool & dev server                                      |
| [React 19](https://react.dev/)                    | UI framework                                                 |
| [Tailwind CSS v4](https://tailwindcss.com/)       | Utility-first styling (`@tailwindcss/vite`, `@theme` tokens) |
| [Motion 12](https://motion.dev/) (`motion/react`) | Animations & transitions                                     |
| [Groq](https://groq.com/) (`openai/gpt-oss-120b`) | LLM-generated typing sentences                               |
| [ESLint 10](https://eslint.org/)                  | Linting (React Hooks + React Refresh rules)                  |

## Getting Started

Prerequisites: Node.js 20.19+ or 22.12+ (per Vite 8), npm, and optionally a [Groq API key](https://console.groq.com/) — the game works without one via the built-in quote fallback.

```bash
# Install dependencies
npm install

# Configure the optional LLM key
cp .env.example .env   # then set VITE_GROQ_API_KEY

# Start dev server
npm run dev

# Lint
npm run lint

# Build for production
npm run build
```

## Configuration

| Variable            | Required | Purpose                                                                                                                                                                                         |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_GROQ_API_KEY` | No       | Groq key used by `src/utils/groq.js` to generate 10 sentences per difficulty (temperature 0.8, strict JSON-schema output). Without it, every game uses the static pool in `src/data/quotes.js`. |

> **Security note:** `VITE_`-prefixed variables are inlined into the client bundle at build time, so this key is visible to anyone who opens the deployed application. Never commit `.env`, scope the key and rotate it if exposed; the robust long-term fix is proxying generation through a backend/server route instead of calling Groq from the browser.

## Design

Kinetic Typography aesthetic — brutalist dark theme (`#09090B` bg, `#FAFAFA` fg) with acid-yellow accent (`#DFE104`), aggressive uppercase Space Grotesk type, seamless marquee, sharp corners, noise-texture overlay, and Motion-driven transitions.

## How It Works

1. **Landing** — Pick a difficulty or press `Enter` to start (default: Medium)
2. **Loading** — `useTypingGame` races the Groq request against a 3 s minimum; slow/failed generations fall back to the static quote pool
3. **Type** — 200 words appear; the clock starts on your first keystroke; type each word and press `Space` to advance
4. **Track** — WPM, accuracy, and elapsed time update in real time; progress bar and current word stay in view
5. **Finish** — Complete all words, time out at 999 s, or press `Escape`; review stats in the modal (quits are recorded as `cancelled`)
6. **Repeat** — Play again on the same difficulty or return home; the marquee keeps showing the latest game stats and updates after every game
