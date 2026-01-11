# Rank My Professor Game

Parody game of Rate My Professor. Made for SB Hacks XII.
Play Here: https://rankmyprofessor.pages.dev/

## Features

- **Three Game Modes:**
  - **Guess the Rating - Arcade**: Guess a professor's rating within 0.5 points. Game ends if you're wrong!
  - **Guess the Rating - Best Out of 10**: Answer 10 questions and earn points based on accuracy
  - **Higher or Lower**: Compare two professors and guess which one has the higher rating

- **Difficulty Levels:**
  - **Normal**: Standard gameplay
  - **Hard**: Increased challenge (varies by mode)

- **Leaderboard System**: Track your high scores across different game modes and difficulties

- **Score Tracking**: Earn points based on accuracy and compete for the top spots

- **Modern UI**: Clean, responsive interface with smooth animations and sound effects

## Technologies Used

- **Frontend:**
  - React 19
  - Vite
  - CSS Variables for theming

- **Backend:**
  - Cloudflare Workers
  - Cloudflare D1 (SQLite database for leaderboard)

- **Development:**
  - ESLint for code quality
  - JSON Server for local development

## Prerequisites

- Node.js 18+ and npm
- For production deployment: Cloudflare account with D1 database

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Rank-My-Professor/ucsb-rmp-game
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the professor data:**
   - Ensure `professors.json` exists in the `public/` directory
   - The file should contain professor data in the expected format

4. **For local development (optional):**
   - Start JSON server for local API testing:
     ```bash
     npm run db
     ```

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
ucsb-rmp-game/
├── src/
│   ├── components/          # React components
│   │   ├── StartScreen.jsx
│   │   ├── ModeSelect.jsx
│   │   ├── GuessMode.jsx
│   │   ├── HigherLowerMode.jsx
│   │   ├── GameOverModal.jsx
│   │   ├── ConfirmationModal.jsx
│   │   └── Leaderboard.jsx
│   ├── data/
│   │   └── professors.js    # Professor data utilities
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   ├── index.css            # Global styles and CSS variables
│   └── App.css
├── functions/
│   └── api/                 # Cloudflare Workers API endpoints
│       ├── submit.js        # Score submission endpoint
│       └── leaderboard.js   # Leaderboard retrieval endpoint
├── d1/
│   └── migrations/          # Database migrations
│       ├── 0001_init.sql
│       └── 0002_add_difficulty.sql
├── public/
│   └── professors.json      # Professor data
├── wrangler.toml            # Cloudflare Workers configuration
└── package.json
```

## How to Play

1. **Start the Game:**
   - Enter your name on the start screen
   - Click "Start Game"

2. **Select a Game Mode:**
   - Choose from "Guess the Rating" (Arcade or Best Out of 10) or "Higher or Lower"
   - Select your preferred difficulty level

3. **Play:**
   - **Guess the Rating**: Enter your guess for the professor's average rating (0.0-5.0)
   - **Higher or Lower**: Compare two professors and choose which has the higher rating

4. **Score Points:**
   - Points are awarded based on accuracy
   - Your score is automatically submitted to the leaderboard when the game ends

5. **View Leaderboard:**
   - Check your ranking on the leaderboard page
   - Filter by game mode and difficulty

## Deployment

The project is configured for deployment on:

- **GitHub Pages**: Automatic deployment via GitHub Actions (see `.github/workflows/deploy.yml`)
- **Cloudflare Workers**: Backend API endpoints with D1 database for leaderboard storage

### Deployment Steps

1. **Deploy Frontend (GitHub Pages):**
   - Push to the `main` branch
   - GitHub Actions will automatically build and deploy to GitHub Pages

2. **Deploy Backend (Cloudflare Workers):**
   - Ensure `wrangler.toml` is configured with your D1 database
   - Deploy using Wrangler CLI:
     ```bash
     npx wrangler deploy
     ```

## License

This project is private and for educational/personal use.

---

**Note**: This game uses real professor data from UC Santa Barbara. Ratings are based on actual data and are used for educational/entertainment purposes only.
