/* eslint-disable @typescript-eslint/no-explicit-any */
import { customProvider } from "ai";
import { google } from "@ai-sdk/google";
import { chatModels, DEVELOPMENT_CHAT_MODEL } from "./models";

const NODE_ENV = process.env.NODE_ENV!;

export const isProduction = NODE_ENV === "production";

const createLanguageModels = (isProduction: boolean) => {
  const models: Record<string, any> = {};
  
  chatModels.forEach((model) => {
    if (model.id.startsWith("google/")) {
      models[model.id] = google(model.id.replace("google/", ""));
    }
  });

  models[DEVELOPMENT_CHAT_MODEL] = google(DEVELOPMENT_CHAT_MODEL);

  // Use the same model for title generation
  models["title-model"] = google(DEVELOPMENT_CHAT_MODEL);

  return models;
};

export const myProvider = customProvider({
  languageModels: createLanguageModels(isProduction),
});
