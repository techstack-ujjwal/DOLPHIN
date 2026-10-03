# How to Setup After Pulling from GitHub

When you pull this code from GitHub, follow these steps to get everything working:

## Step 1: Install Dependencies

```bash
cd server
npm install
```

## Step 2: Setup Environment Variables

The `.env` file is NOT committed to git (for security). You need to create it:

```bash
cd server
cp .env.example .env
```

Then edit `.env` with your actual values:
- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_MODEL`: gpt-4o-mini (or your preferred model)
- `DATABASE_URL`: Your PostgreSQL connection string
- `PORT`: 5000 (or your preferred port)

## Step 3: Setup Database

Make sure PostgreSQL is running, then:

```bash
cd server
npx prisma migrate dev
```

This will create all necessary database tables.

## Step 4: Build the CLI

```bash
cd server
npm run build
```

## Step 5: Use the CLI

### Option A: Link globally (recommended)
```bash
npm link
DOLPHIN login
DOLPHIN wakeup
```

### Option B: Run directly
```bash
node src/cli/main.js login
node src/cli/main.js wakeup
```

## Step 6: Client Setup (Optional)

If you want to use the web interface:

```bash
cd client/my-app
npm install
npm run dev
```

Then open http://localhost:3000

## Important Notes

1. **Never commit `.env` files** - they contain sensitive information
2. **Node modules are not committed** - always run `npm install` after pulling
3. **Database migrations must be run** - the database schema is in `server/prisma/`
4. **OpenAI API key is required** - the CLI won't work without it

## Troubleshooting

### "DOLPHIN command not found"
- Make sure you ran `npm link` in the server directory
- Or use `node server/src/cli/main.js` instead

### Database connection errors
- Check that PostgreSQL is running
- Verify your `DATABASE_URL` in `.env` is correct
- Run `npx prisma migrate dev` to ensure tables exist

### OpenAI API errors
- Verify your `OPENAI_API_KEY` is valid
- Check that you have API credits available
- Ensure the key has the correct permissions

### Tool selection issues
- If multiselect doesn't work on Windows, the tool selection now uses individual prompts
- This is a known Windows terminal compatibility fix
