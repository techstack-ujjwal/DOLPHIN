import { openai } from '@ai-sdk/openai';
import { streamText, generateObject } from 'ai';
import { config } from "../../config/gpt.config.js";
import chalk from "chalk";
export class OpenAIService {

    constructor() {
        // Defer API key validation to sendMessage to avoid import-time crashes
        this.model = null;
    }

    _ensureModel() {
        if (!this.model) {
            if (!config.apiKey) {
                throw new Error("OpenAI API key is required");
            }
            this.model = openai(config.model, {
                apiKey: config.apiKey
            });
        }
    }

    async sendMessage(message, onChunk, tools = undefined, onToolCall = null) {
        this._ensureModel();

        try {
            const streamOptions = {
                model: this.model,
                messages: message
            }
            if (tools && Object.keys(tools).length > 0) {
                streamOptions.tools = tools;
                streamOptions.maxSteps = 5 //5 tool call max
            }

            const result = streamText(streamOptions);

            let fullResponse = '';

            for await (const chunk of result.textStream) {
                fullResponse += chunk;
                if (onChunk) {
                    onChunk(chunk);
                }
            }

            const fullResult = await result;

            const toolCalls = [];
            const toolResults = [];
            if (fullResult.steps && Array.isArray(fullResult.steps)) {
                for (const step of fullResult.steps) {
                    if (step.toolCalls && step.toolCalls.length > 0) {
                        for (const toolCall of step.toolCalls) {
                            toolCalls.push(toolCall);
                            if (onToolCall) {
                                onToolCall(toolCall);
                            }
                        }
                    }

                    // Collect tool results
                    if (step.toolResults && step.toolResults.length > 0) {
                        toolResults.push(...step.toolResults);
                    }
                }
            }

            return {
                content: fullResponse,
                finishReason: fullResult.finishReason,
                usage: fullResult.usage,
                toolResults: toolResults
            }
        } catch (error) {
            console.error(chalk.red("Error generating AI response:"), error.message);
            throw error;
        }

    }


    async getMessages(messages, tools = undefined) {
        let fullResponse = '';
        const result = await this.sendMessage(messages, (chunk) => {
            fullResponse += chunk;
        });

        return result.content;
    }
      async generateStructured(schema, prompt) {
        this._ensureModel();
        try {
          const result = await generateObject({
            model: this.model,
            schema: schema,
            prompt: prompt,
          });

          return result.object;
        } catch (error) {
          console.error(chalk.red("AI Structured Generation Error:"), error.message);
          throw error;
        }
      }
}






