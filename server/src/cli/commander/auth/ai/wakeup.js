import chalk from "chalk";
import { Command } from "commander";
import yoctoSpinner from "yocto-spinner";
import { getStoredToken } from "../../auth/auth/login.js";
import prisma from "../../../../lib/db.js";
import { select, isCancel, cancel } from "@clack/prompts";
import { startChat } from "../../../chat/chat-with-ai.js";
import { startToolChat } from "../../../chat/chat-with-ai-tool.js";
import { startAgentChat } from "../../../chat/chat-with-aiagent.js";

const wakeUpAction = async () => {
  const token = await getStoredToken();

  if (!token?.access_token) {
    console.log(chalk.red("Not authenticated. Please run 'DOLPHIN login' first."));
    return;
  }

  const spinner = yoctoSpinner({ text: "Fetching User Information..." });
  spinner.start();

  const user = await prisma.user.findFirst({
    where: {
      sessions: {
        some: { token: token.access_token },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  spinner.stop();

  if (!user) {
    console.log(chalk.red("User not found."));
    return;
  }

  console.log(chalk.green(`\nWelcome back, ${user.name}!\n`));

  const choice = await select({
    message: "Select an option:",
    options: [
      {
        value: "chat",
        label: "Chat",
        hint: "Simple chat with AI",
      },
      {
        value: "tool",
        label: "Tool Calling",
        hint: "Chat with AI tools",
      },
      {
        value: "agent",
        label: "Agentic Mode",
        hint: "Generate complete applications",
      },
    ],
  });

  if (isCancel(choice)) {
    cancel("Operation cancelled");
    return;
  }

  switch (choice) {
    case "chat":
      await startChat("chat");
      break;
    case "tool":
      await startToolChat();
      break;
    case "agent":
      await startAgentChat();
      break;
  }
};

export const wakeUp = new Command("wakeup")
  .description("Wake up the AI")
  .action(wakeUpAction);