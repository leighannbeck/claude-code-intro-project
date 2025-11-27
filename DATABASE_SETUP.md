# PostgreSQL Database Setup Guide

This guide will walk you through setting up PostgreSQL for your Pinochle Online platform.

## Option 1: Install PostgreSQL Locally (Recommended for Development)

### Step 1: Download PostgreSQL

1. Go to https://www.postgresql.org/download/windows/
2. Click "Download the installer"
3. Download the latest version (PostgreSQL 16 or later)
4. Run the installer

### Step 2: Installation Steps

1. **Run the installer** as Administrator
2. **Installation Directory**: Use default `C:\Program Files\PostgreSQL\16`
3. **Select Components**: Keep all selected (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools)
4. **Data Directory**: Use default
5. **Password**: Set a password for the `postgres` superuser
   - **IMPORTANT**: Remember this password! You'll need it later.
   - Suggested: Use something simple for development like `postgres123`
6. **Port**: Keep default `5432`
7. **Locale**: Use default
8. Click "Next" through the rest and finish installation

### Step 3: Verify Installation

1. Open Command Prompt or PowerShell
2. Run: `psql --version`
3. You should see something like: `psql (PostgreSQL) 16.x`

If the command is not found, you may need to add PostgreSQL to your PATH:
1. Search for "Environment Variables" in Windows
2. Edit "Path" in System Variables
3. Add: `C:\Program Files\PostgreSQL\16\bin`
4. Restart your terminal

### Step 4: Create the Database

Open Command Prompt or PowerShell and run:

```bash
# Connect to PostgreSQL
psql -U postgres

# You'll be prompted for the password you set during installation

# Once connected, create the database
CREATE DATABASE pinochle_db;

# Verify it was created
\l

# Exit psql
\q
```

Alternatively, use **pgAdmin 4** (GUI tool installed with PostgreSQL):
1. Open pgAdmin 4
2. Connect to your local server (use password from installation)
3. Right-click "Databases" → "Create" → "Database"
4. Name: `pinochle_db`
5. Click "Save"

### Step 5: Update Environment Variables

Your `.env` file should already have this, but verify:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/pinochle_db?schema=public"
```

Replace `YOUR_PASSWORD` with the password you set during installation.

### Step 6: Run Database Migrations

In your project directory, run:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all the necessary tables
- Set up the schema
- Generate the Prisma Client

### Step 7: Verify Setup

Check that tables were created:

```bash
npx prisma studio
```

This opens a GUI where you can see your database tables.

---

## Option 2: Use a Cloud PostgreSQL Service (Easier Setup)

If you prefer not to install PostgreSQL locally, you can use a free cloud service:

### Supabase (Recommended - Free Tier)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project:
   - Name: `pinochle-online`
   - Database Password: Set a strong password
   - Region: Choose closest to you
5. Wait for project to be provisioned (~2 minutes)
6. Go to "Settings" → "Database"
7. Copy the "Connection string" under "Connection pooling"
8. Update your `.env` file:

```env
DATABASE_URL="your-connection-string-here"
```

9. Run migrations:

```bash
npx prisma migrate dev --name init
```

### Neon (Alternative - Free Tier)

1. Go to https://neon.tech
2. Sign up with GitHub or email
3. Create a new project
4. Copy the connection string
5. Update `.env` file
6. Run migrations

---

## Testing Your Database Connection

After setup, test the connection:

```bash
# Test Prisma connection
npx prisma db pull

# Open Prisma Studio to browse data
npx prisma studio
```

If successful, you should see:
- ✅ Database connection established
- ✅ Tables created (users, game_rooms, games, etc.)

---

## Common Issues

### Issue: "Can't reach database server"
- **Solution**: Make sure PostgreSQL service is running
  - Windows: Open Services → Find "postgresql-x64-16" → Start it
  - Or restart your computer

### Issue: "Password authentication failed"
- **Solution**: Check your `.env` file has the correct password
- Reset password if needed using pgAdmin

### Issue: "Port 5432 already in use"
- **Solution**: Another instance of PostgreSQL is running
- Stop it or use a different port

### Issue: Migration fails
- **Solution**:
  ```bash
  # Reset migrations
  npx prisma migrate reset

  # Then run again
  npx prisma migrate dev --name init
  ```

---

## Next Steps

Once your database is set up:

1. ✅ Start the development server: `npm run dev`
2. ✅ Visit http://localhost:3000
3. ✅ Create an account at `/auth/signup`
4. ✅ Start playing Pinochle!

---

## Database Management Tools

- **pgAdmin 4**: GUI tool (installed with PostgreSQL)
- **Prisma Studio**: `npx prisma studio` - Modern GUI for your data
- **TablePlus**: https://tableplus.com - Popular third-party tool
- **DBeaver**: https://dbeaver.io - Free and open-source

---

## Need Help?

If you encounter any issues:
1. Check the error message carefully
2. Verify PostgreSQL is running
3. Check your `.env` file
4. Try restarting PostgreSQL service
5. Check Prisma docs: https://www.prisma.io/docs
