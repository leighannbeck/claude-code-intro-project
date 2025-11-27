# Pinochle Online - Quick Start Guide 🎴

Welcome! Your Pinochle platform is ready to go. Follow these steps to get started.

## Current Status ✅

Your project has:
- ✅ Complete Pinochle game engine (bidding, melding, trick-taking)
- ✅ Real-time multiplayer with Socket.io
- ✅ Beautiful game UI with card components
- ✅ User authentication system
- ✅ Game lobby and room system
- ✅ Content pages (rules, how-to-play, about, contact)

## What You Need to Do

### 1. Install PostgreSQL (One-Time Setup)

**Option A: Local Installation (Recommended for beginners)**
1. Download from: https://www.postgresql.org/download/windows/
2. Install PostgreSQL 16 (keep all default settings)
3. **Remember the password** you set for the `postgres` user!

**Option B: Use Cloud Database (No installation needed)**
- Supabase: https://supabase.com (free tier)
- Neon: https://neon.tech (free tier)

📖 **Detailed instructions**: See `DATABASE_SETUP.md`

### 2. Update Your Password

Edit the `.env` file and replace `YOUR_PASSWORD`:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/pinochle_db?schema=public"
```

### 3. Set Up the Database

**Easy Way** (Windows):
```bash
# Double-click this file
setup-database.bat
```

**Manual Way**:
```bash
# Create database
psql -U postgres -c "CREATE DATABASE pinochle_db;"

# Run migrations
npx prisma migrate dev --name init

# Verify (opens a GUI)
npx prisma studio
```

### 4. Start Playing!

```bash
# Start the server
npm run dev

# Server will run at http://localhost:3000
```

Then:
1. Go to http://localhost:3000
2. Click "Sign Up" and create an account
3. Click "Play Now" in the navbar
4. Create a room or join an existing one
5. Get 3 friends to join (or open 4 browser windows!)
6. Everyone clicks "Ready Up"
7. Room creator clicks "Start Game"
8. Play Pinochle! 🎉

## Testing Multiplayer Locally

To test with yourself:

1. Open http://localhost:3000 in your browser
2. Sign in with one account
3. Open **Incognito/Private window**
4. Sign up with a different account
5. Repeat 2 more times (4 players total)
6. All join the same room code
7. Start the game!

## Features You Can Use Right Now

### Lobby System
- Create 4-player or 6-player rooms
- Join by room code
- See available rooms
- Real-time player updates

### Game Play
- **Bidding**: Bid or pass in real-time
- **Trump Selection**: Winner declares trump
- **Melding**: Automatic meld detection and scoring
- **Trick-Taking**: Play cards with full rule enforcement
- **Scoring**: Real-time score updates

### UI Features
- Beautiful card graphics
- Team-based color coding
- Turn indicators
- Valid card highlighting
- Score progress bars
- Player status display

## Project Structure

```
src/
├── app/
│   ├── auth/           # Sign in/up pages
│   ├── play/
│   │   ├── lobby/      # Game lobby
│   │   └── room/       # Game room & board
│   ├── rules/          # Game rules page
│   └── how-to-play/    # Tutorial page
├── components/
│   ├── game/           # Card, GameBoard, etc.
│   └── layout/         # Navbar, Footer
├── game/               # Game engine logic
├── lib/
│   ├── socket/         # Socket.io handlers
│   └── prisma.ts       # Database client
├── stores/             # Zustand state management
└── types/              # TypeScript types
```

## Common Commands

```bash
# Start development server
npm run dev

# View database in GUI
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### "Can't reach database server"
- Make sure PostgreSQL is running
- Check your password in `.env`
- Verify database name is `pinochle_db`

### "Port 3000 already in use"
- Close other dev servers
- Or change port in `server.ts`

### Game not updating
- Refresh the page
- Check browser console for errors
- Make sure Socket.io is connected

### Cards not clickable
- Only valid cards are clickable during your turn
- Make sure it's the trick-taking phase
- Check if it's your turn

## What's Next?

Your platform is feature-complete! Optional enhancements:

- 🎨 Add animations and sound effects
- 📱 Mobile responsive improvements
- 🤖 AI opponents for single-player
- 📊 Enhanced statistics dashboard
- 🏆 Leaderboards
- 💬 In-game chat
- 🔔 Turn notifications

## Need Help?

- Check `DATABASE_SETUP.md` for database issues
- Check `README.md` for project overview
- Game rules explained in `src/game/README.md`
- Socket.io docs: https://socket.io/docs/
- Prisma docs: https://www.prisma.io/docs

---

**Enjoy playing Pinochle! 🎴**

Built with Next.js, TypeScript, Socket.io, Prisma, and PostgreSQL.
