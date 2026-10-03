#!/usr/bin/env node

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";

import { login, logout, whoami } from "./commander/auth/auth/login.js";
import { wakeUp } from "./commander/auth/ai/wakeup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory first, then fallback to cwd
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

function showBanner() {
  console.log(
    chalk.cyan(
      figlet.textSync("DOLPHIN", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  console.log(chalk.bold.blue("🐬 Dolphin CLI - AI-Powered Assistant & Auth Suite"));
  console.log();
}

async function main() {
  const program = new Command("dolphin");

  program
    .name("DOLPHIN")
    .version("1.0.0")
    .description("Dolphin CLI - A powerful command line interface tool");

  // Direct chat command
  const chatCommand = new Command("chat")
    .description("Start interactive chat session with Dolphin AI")
    .action(async () => {
      const { startChat } = await import("./chat/chat-with-ai.js");
      await startChat("chat");
    });

  // Register commands
  program.addCommand(login);
  program.addCommand(logout);
  program.addCommand(whoami);
  program.addCommand(wakeUp);
  program.addCommand(chatCommand);

  // If no subcommand is provided, show banner and help
  if (process.argv.length <= 2) {
    showBanner();
    program.outputHelp();
    process.exit(0);
  }

  // Handle unknown commands gracefully
  program.on("command:*", (operands) => {
    console.error(chalk.red(`\n❌ Unknown command: '${operands[0]}'`));
    console.log(chalk.yellow("Run 'DOLPHIN --help' to see all available commands.\n"));
    process.exit(1);
  });

  await program.parseAsync(process.argv);
}

main().catch((err) => {
  console.error(chalk.red("An error occurred while running the CLI:"), err.message || err);
  process.exit(1);
});
