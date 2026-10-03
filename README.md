# DOLPHIN AI

An AI-powered CLI tool with multiple modes: Chat, Tool Calling, and Agentic Mode for generating complete applications.

## Features

- **Chat Mode**: Simple AI chat interface
- **Tool Calling Mode**: AI with access to tools (Google Search, Code Execution, URL Context)
- **Agentic Mode**: Generate complete applications from descriptions

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## Installation

1. Clone the repository:
```bash
git clone https://github.com/techstack-ujjwal/DOLPHIN.git
cd DOLPHIN
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies (if using the web interface):
```bash
cd ../client/my-app
npm install
```

## Setup

### Server Setup

1. Copy the environment example file:
```bash
cd server
cp .env.example .env
```

2. Edit `.env` with your actual values:
```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
DATABASE_URL=your_database_url_here
PORT=5000
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Start the server:
```bash
npm start
```

### Client Setup (Optional)

If you want to use the web interface:

1. Start the Next.js development server:
```bash
cd client/my-app
npm run dev
```

2. Open http://localhost:3000 in your browser

## Usage

### CLI Commands

#### Login
```bash
DOLPHIN login
```

#### Wake up (Start AI interaction)
```bash
DOLPHIN wakeup
```

This will present you with three options:
- **Chat**: Simple chat with AI
- **Tool Calling**: Chat with AI tools (Google Search, Code Execution, URL Context)
- **Agentic Mode**: Generate complete applications from descriptions

### Agentic Mode Examples

In Agentic Mode, you can describe an application and it will generate all necessary files:

- "Build a todo app with React and Tailwind"
- "Create a REST API with Express and MongoDB"
- "Make a weather app using OpenWeatherMap API"
- "A stopwatch in HTML, CSS, and JavaScript"

## Project Structure

```
DOLPHIN/
├── client/              # Next.js web application
│   └── my-app/
├── server/              # Node.js CLI server
│   ├── src/
│   │   ├── cli/        # CLI commands
│   │   ├── config/     # Configuration files
│   │   ├── lib/        # Utilities
│   │   └── service/    # Business logic
│   ├── prisma/         # Database schema
│   └── .env.example    # Environment template
└── README.md
```

## Environment Variables

Copy `server/.env.example` to `server/.env` and configure:

- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_MODEL`: OpenAI model to use (default: gpt-4o-mini)
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 5000)

## Troubleshooting

### Git Push Issues

If you encounter git push issues with secrets:

1. Make sure `.env` is in `.gitignore`
2. Remove any committed `.env` files:
```bash
git rm --cached server/.env
git commit -m "Remove .env from git"
```

### Tool Selection Issues

If tool selection doesn't work on Windows, the tool selection now uses individual prompts instead of multiselect for better compatibility.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
