import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config();

export const config = {
    get apiKey() {
        return process.env.OPENAI_API_KEY || "";
    },
    get model() {
        return process.env.OPENAI_MODEL || "gpt-4o";
    }
};

