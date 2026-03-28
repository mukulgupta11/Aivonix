import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocalChatState {
  localModelId: string;
  setLocalModelId: (id: string) => void;
}

export const useLocalChat = create<LocalChatState>()(
  persist(
    (set) => ({
      localModelId: "",
      setLocalModelId: (id) => set({ localModelId: id }),
    }),
    {
      name: "local-chat",
    }
  )
);
