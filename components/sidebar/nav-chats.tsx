import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  RiAddLine,
  RiChatAiLine,
  RiLoader5Fill,
  RiMore2Line,
} from "@remixicon/react";
import { useChats, useDeleteChat, useRenameChat } from "@/features/use-chat";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const NavChats = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending } = useChats();
  const { mutate: deleteChat, isPending: isDeleting } = useDeleteChat();
  const { mutate: renameChat, isPending: isRenaming } = useRenameChat();
  const chats = data ?? [];

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [renameTarget, setRenameTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [renameDraft, setRenameDraft] = useState("");

  useEffect(() => {
    if (renameTarget) setRenameDraft(renameTarget.title);
  }, [renameTarget]);

  const onNewChat = () => {
    router.push("/chat");
  };

  const onChatClick = (id: string) => {
    router.push(`/chat/${id}`);
  };

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    const id = pendingDeleteId;
    deleteChat(id, {
      onSuccess: () => {
        setPendingDeleteId(null);
        if (pathname === `/chat/${id}`) {
          router.push("/chat");
        }
      },
    });
  };

  const submitRename = () => {
    if (!renameTarget || !renameDraft.trim()) return;
    renameChat(
      { id: renameTarget.id, title: renameDraft.trim() },
      { onSuccess: () => setRenameTarget(null) }
    );
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>
          <h5>Chat history</h5>
          <SidebarGroupAction
            className="mt-[1.5px] flex items-center size-5.5 rounded-md bg-primary/20 border cursor-pointer"
            onClick={onNewChat}
          >
            <RiAddLine className="!size-5" />
            <span className="sr-only">New chat</span>
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <SidebarGroupContent className="w-full h-auto min-h-24 max-h-[280px] overflow-y-auto">
          <SidebarMenu>
            {isPending ? (
              <div className="flex items-center justify-center py-4">
                <RiLoader5Fill className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : chats.length === 0 ? (
              <div className="text-sm text-muted-foreground px-2 py-1">
                No chats yet
              </div>
            ) : (
              chats.map((chat: { id: string; title: string; createdAt: string }) => {
                const isActive = pathname === `/chat/${chat.id}`;
                return (
                  <SidebarMenuItem key={chat.id} className="group/menu-item">
                    <div className="flex w-full items-start gap-0.5">
                      <SidebarMenuButton
                        className="flex flex-1 items-start gap-2 h-auto min-h-10 py-2 min-w-0"
                        isActive={isActive}
                        onClick={() => onChatClick(chat.id)}
                      >
                        <span className="w-8 h-8 shrink-0 bg-secondary rounded-lg flex items-center justify-center">
                          <RiChatAiLine className="w-4 h-4 text-primary" />
                        </span>
                        <span className="flex-1 min-w-0 text-left">
                          <span className="block truncate font-medium text-sm leading-tight">
                            {chat.title}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-0.5">
                            {format(new Date(chat.createdAt), "MMM d, yyyy")}
                          </span>
                        </span>
                      </SidebarMenuButton>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0 mt-1 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent data-[state=open]:text-foreground"
                            aria-label="Chat options"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            <RiMore2Line className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          side="bottom"
                          sideOffset={4}
                          className="w-44"
                        >
                          <DropdownMenuItem
                            onSelect={() =>
                              setRenameTarget({ id: chat.id, title: chat.title })
                            }
                          >
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={() => setPendingDeleteId(chat.id)}
                          >
                            Delete chat
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </SidebarMenuItem>
                );
              })
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <Dialog
        open={Boolean(renameTarget)}
        onOpenChange={(open) => !open && setRenameTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename chat</DialogTitle>
          </DialogHeader>
          <Input
            value={renameDraft}
            onChange={(e) => setRenameDraft(e.target.value)}
            placeholder="Title"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitRename();
              }
            }}
          />
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setRenameTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={isRenaming || !renameDraft.trim()}
              onClick={submitRename}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(pendingDeleteId)}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this chat?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This removes the conversation and all messages. This cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setPendingDeleteId(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NavChats;
