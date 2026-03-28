/* eslint-disable @typescript-eslint/no-explicit-any */
import { customProvider } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { google } from "@ai-sdk/google";
import { chatModels, DEVELOPMENT_CHAT_MODEL } from "./models";

const NODE_ENV = process.env.NODE_ENV!;

export const isProduction = NODE_ENV === "production";

/**
 * Vercel AI Gateway (multi-provider). Requires `AI_GATEWAY_API_KEY` or Vercel OIDC in prod.
 * If unset, all chat models are served via Google Gemini — set `GOOGLE_GENERATIVE_AI_API_KEY`
 * (e.g. on Render without Vercel).
 */
function useAiGateway(): boolean {
  return Boolean(process.env.AI_GATEWAY_API_KEY?.trim());
}

/** `google/gemini-2.5-flash` → `gemini-2.5-flash`; other UI ids fall back to dev Gemini. */
function toGoogleChatModelId(gatewayStyleId: string): string {
  if (gatewayStyleId.startsWith("google/")) {
    return gatewayStyleId.slice("google/".length);
  }
  return DEVELOPMENT_CHAT_MODEL;
}

const createLanguageModels = () => {
  const models: Record<string, any> = {};
  const gatewayMode = useAiGateway();

  for (const model of chatModels) {
    models[model.id] = gatewayMode
      ? gateway.languageModel(model.id)
      : google.languageModel(toGoogleChatModelId(model.id));
  }

  models[DEVELOPMENT_CHAT_MODEL] = google.languageModel(DEVELOPMENT_CHAT_MODEL);

  models["title-model"] = gatewayMode
    ? gateway.languageModel("google/gemini-2.0-flash")
    : google.languageModel("gemini-2.0-flash");

  return models;
};

export const myProvider = customProvider({
  languageModels: createLanguageModels(),
});
