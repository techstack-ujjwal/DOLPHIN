# Setup Instructions

## After Cloning the Repository

1. Navigate to the project directory:
```bash
cd DOLPHIN
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
- Add your OpenAI API key
- Add your PostgreSQL database URL
- Configure other settings as needed

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Build the CLI:
```bash
npm run build
```

6. Link the CLI globally (optional):
```bash
npm link
```

Or use it directly:
```bash
node src/cli/main.js
```

## Client Setup (Optional)

If you want to use the web interface:

1. Install client dependencies:
```bash
cd ../client/my-app
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:3000

## Troubleshooting

### Database Connection Issues

Make sure PostgreSQL is running and your `DATABASE_URL` in `.env` is correct.

### OpenAI API Issues

Make sure your `OPENAI_API_KEY` is valid and has sufficient credits.

### CLI Not Found

If `DOLPHIN` command is not found after `npm link`, try:
```bash
cd server
node src/cli/main.js
```

Or add the server directory to your PATH.
