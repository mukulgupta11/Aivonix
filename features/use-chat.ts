import { api } from "@/lib/hono/hono-rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useChatById = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["chat", id],
    queryFn: async () => {
      const response = await api.chat[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch chat");
      }
      const { data } = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as any;
    },
    enabled: enabled,
  });
};

export const useChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await api.chat.$get();
      if (!response.ok) throw new Error("Failed to fetch chat");
      const { data } = await response.json();
      return data;
    },
  });
};

export const useRenameChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      const response = await api.chat[":id"]["$patch"]({
        param: { id },
        json: { title },
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string })?.message ?? "Failed to rename chat"
        );
      }
      return response.json();
    },
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.invalidateQueries({ queryKey: ["chat", id] });
      toast.success("Chat renamed");
    },
    onError: (error: Error) => toast.error(error.message),
  });
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.chat[":id"]["$delete"]({
        param: { id },
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string })?.message ?? "Failed to delete chat"
        );
      }
      return response.json();
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      queryClient.removeQueries({ queryKey: ["chat", id] });
      toast.success("Chat deleted");
    },
    onError: (error: Error) => toast.error(error.message),
  });
};
