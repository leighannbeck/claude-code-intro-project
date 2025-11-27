@echo off
echo ========================================
echo Pinochle Database Setup Script
echo ========================================
echo.

echo Step 1: Checking if PostgreSQL is installed...
psql --version
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ERROR: PostgreSQL is not installed or not in PATH
    echo Please install PostgreSQL first. See DATABASE_SETUP.md for instructions.
    echo Download from: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)

echo.
echo Step 2: Creating database...
echo Please enter your PostgreSQL password when prompted.
echo.

psql -U postgres -c "CREATE DATABASE pinochle_db;"
if %ERRORLEVEL% EQU 0 (
    echo Database created successfully!
) else (
    echo Database might already exist or there was an error.
)

echo.
echo Step 3: Running Prisma migrations...
call npx prisma migrate dev --name init

echo.
echo Step 4: Opening Prisma Studio to verify setup...
echo Press Ctrl+C to close Prisma Studio when done.
call npx prisma studio

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Your database is ready. You can now:
echo 1. Run 'npm run dev' to start the server
echo 2. Visit http://localhost:3000
echo 3. Create an account and start playing!
echo.
pause
