import { generateText, type UIMessage } from "ai";
import { myProvider } from "@/lib/ai/providers";

const TITLE_SYSTEM_FIRST =
  "You write very short titles for a chat app (max 80 characters).\n" +
  "- Summarize the user's first message / intent.\n" +
  "- No quotes, no colons at the end.\n" +
  "- Use plain language; title case or sentence case is fine.";

const TITLE_SYSTEM_CONVERSATION =
  "You write very short titles for a chat thread (max 80 characters).\n" +
  "- Summarize the overall topic from the whole conversation so far.\n" +
  "- Do not use prefixes like 'Chat about' or 'Discussion of'.\n" +
  "- No quotes, no colons at the end.";

const TITLE_SYSTEM_NOTE =
  "You write a short note title (max 80 characters) from the note body.\n" +
  "- Capture the main topic.\n" +
  "- No quotes; no trailing colon.";

export async function generateChatTitleFromFirstMessage(
  message: UIMessage
): Promise<string> {
  try {
    const { text } = await generateText({
      model: myProvider.languageModel("title-model"),
      system: TITLE_SYSTEM_FIRST,
      prompt: JSON.stringify(message),
    });
    const t = text.trim();
    return t.slice(0, 200) || "New chat";
  } catch {
    console.log("Title generation (first message) failed");
    return "New chat";
  }
}

export async function generateChatTitleFromConversation(
  messages: UIMessage[]
): Promise<string | null> {
  if (messages.length === 0) return null;
  try {
    const slice = messages.length > 32 ? messages.slice(-32) : messages;
    const { text } = await generateText({
      model: myProvider.languageModel("title-model"),
      system: TITLE_SYSTEM_CONVERSATION,
      prompt: JSON.stringify(slice),
    });
    const t = text.trim();
    return t.slice(0, 200) || null;
  } catch {
    console.log("Title generation (conversation) failed");
    return null;
  }
}

export async function generateNoteTitleFromContent(
  content: string
): Promise<string | null> {
  const trimmed = content.trim();
  if (trimmed.length < 8) return null;
  try {
    const { text } = await generateText({
      model: myProvider.languageModel("title-model"),
      system: TITLE_SYSTEM_NOTE,
      prompt: trimmed.slice(0, 8000),
    });
    const t = text.trim();
    return t.slice(0, 200) || null;
  } catch {
    console.log("Title generation (note) failed");
    return null;
  }
}
