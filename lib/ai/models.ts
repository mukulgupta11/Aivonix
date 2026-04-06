export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: ChatModel[] = [
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash Lite",
    description: "Google's fast lightweight reasoning model",
  },
];

export const DEFAULT_MODEL_ID = chatModels[0].id;
/** Google AI model id for local dev (must match @ai-sdk/google — no `models/` prefix). */
export const DEVELOPMENT_CHAT_MODEL = "gemini-2.5-flash";

export const MODEL_OPTIONS = chatModels.map((m) => ({
  value: m.id,
  label: m.name,
}));
