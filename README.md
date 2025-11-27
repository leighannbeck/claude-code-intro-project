# Pinochle Online

A modern web platform for playing Pinochle card game online with real-time multiplayer support. Learn the rules, play with friends, and track your statistics.

## Features

- **Real-time Multiplayer**: Play 4-player and 6-player team Pinochle variants
- **User Authentication**: Secure sign-up and login with NextAuth
- **Game Rooms**: Create private rooms or join public games
- **Statistics Tracking**: View your game history and performance stats
- **Comprehensive Rules**: Learn the game with detailed guides and tutorials
- **Responsive Design**: Play on desktop, tablet, or mobile devices

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with JWT
- **State Management**: Zustand
- **Real-time**: Socket.io (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd claude-code-intro-project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/pinochle_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NODE_ENV="development"
```

5. Set up the database:
```bash
# Create the database (if using local PostgreSQL)
createdb pinochle_db

# Run Prisma migrations
npx prisma migrate dev --name init

# Generate Prisma Client
npx prisma generate
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── api/         # API routes
│   └── page.tsx     # Home page
├── components/       # React components
│   ├── auth/        # Authentication components
│   ├── game/        # Game-related components
│   ├── layout/      # Layout components (Navbar, Footer)
│   └── ui/          # Reusable UI components
├── game/            # Game logic and engine
├── lib/             # Utility libraries (Prisma, Auth)
├── stores/          # Zustand state stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Create and apply database migrations

## Database Schema

The application uses the following main database models:

- **User**: User accounts and profiles
- **GameRoom**: Multiplayer game rooms
- **GamePlayer**: Players in a game room
- **Game**: Completed games
- **GameMove**: Individual game moves
- **UserStats**: Player statistics per variant

## Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup with Next.js 14+, TypeScript, Tailwind CSS
- [x] Database schema and Prisma configuration (Prisma 7)
- [x] Basic UI layout (Navbar, Footer, SessionProvider)
- [x] Authentication system (sign-in and sign-up pages)
- [x] NextAuth.js configuration with credentials provider
- [x] User registration API with bcrypt password hashing

### Phase 2: Game Logic ✅
- [x] Complete Pinochle game engine with functional, immutable state design
- [x] Card deck creation and shuffling (Fisher-Yates algorithm)
- [x] Dealing system for 4-player and 6-player variants
- [x] Bidding logic with validation
- [x] Meld recognition (all 15 types including double melds)
- [x] Trick-taking rules with comprehensive validation
- [x] Scoring system (meld points, trick points, going set)
- [x] Tested with complete game simulation script

### Phase 3: Content Pages ✅
- [x] Comprehensive rules page with meld scoring tables
- [x] How-to-play beginner guide with step-by-step instructions
- [x] About page with game history and platform mission
- [x] Contact page with form and FAQ

### Phase 4: Real-time Multiplayer (Next)
- [ ] Socket.io integration
- [ ] Game room functionality
- [ ] Real-time game state synchronization
- [ ] Lobby system for finding/creating games

### Phase 5: Game UI
- [ ] Interactive game board
- [ ] Card components and animations
- [ ] Bidding interface
- [ ] Meld display
- [ ] Trick-taking visualization

### Phase 6: User Features
- [ ] User profiles and avatars
- [ ] Game statistics dashboard
- [ ] Game history and replays
- [ ] Leaderboards

### Phase 7: Polish & Optimization
- [ ] Mobile optimization and responsive design improvements
- [ ] Performance improvements
- [ ] Accessibility enhancements
- [ ] Tutorial system for new players

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See LICENSE file for details.
