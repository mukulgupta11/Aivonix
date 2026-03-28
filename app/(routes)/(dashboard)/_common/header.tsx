"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiAddLine, RiMore2Line } from "@remixicon/react";
import { useRouter } from "next/navigation";
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
import { useDeleteChat, useRenameChat } from "@/features/use-chat";

type Props = {
  title?: string;
  showActions?: boolean;
  /** When set, header shows chat rename / delete. */
  chatId?: string;
};

const Header = ({ title, showActions = false, chatId }: Props) => {
  const router = useRouter();
  const { open, isMobile } = useSidebar();
  const { mutate: renameChat, isPending: isRenaming } = useRenameChat();
  const { mutate: deleteChat, isPending: isDeleting } = useDeleteChat();

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [renameValue, setRenameValue] = useState(title ?? "");

  useEffect(() => {
    if (renameOpen) setRenameValue(title ?? "");
  }, [renameOpen, title]);

  const onNewChat = () => {
    router.push("/chat");
  };

  const submitRename = () => {
    if (!chatId || !renameValue.trim()) return;
    renameChat(
      { id: chatId, title: renameValue.trim() },
      { onSuccess: () => setRenameOpen(false) }
    );
  };

  const confirmDelete = () => {
    if (!chatId) return;
    deleteChat(chatId, {
      onSuccess: () => {
        setDeleteOpen(false);
        router.push("/chat");
      },
    });
  };

  const chatMenu =
    showActions && chatId ? (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 rounded-md"
              aria-label="Chat options"
            >
              <RiMore2Line className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onSelect={() => setRenameOpen(true)}>
              Rename chat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => setDeleteOpen(true)}
            >
              Delete chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename chat</DialogTitle>
            </DialogHeader>
            <Input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
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
                onClick={() => setRenameOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isRenaming || !renameValue.trim()}
                onClick={submitRename}
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
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
                onClick={() => setDeleteOpen(false)}
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
    ) : null;

  return (
    <header
      className="fixed top-0 inset-0 z-[9] h-[40px]
      flex items-center px-2  md:px-8 py-1 bg-background/20 backdrop-blur-sm"
    >
      {(!open || isMobile) && <SidebarTrigger className="h-10" />}

      {!showActions && title && (
        <div
          className={cn(
            "pt-5",
            open && "w-full !max-w-full lg:p-[10px_0_0_250px]"
          )}
        >
          <h2 className="text-xl lg:text-2xl font-semibold">{title}</h2>
        </div>
      )}

      {showActions && (
        <div
          className={cn(
            "w-full flex items-center justify-between gap-2",
            open && "w-full !max-w-full lg:!p-[0_0_0_250px]"
          )}
        >
          <h2 className="min-w-0 truncate text-base font-semibold md:text-lg">
            {title}
          </h2>
          <div className="flex items-center gap-1 shrink-0">
            {chatMenu}
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer !bg-muted/10"
              onClick={onNewChat}
            >
              <RiAddLine className="w-8 h-8" />
              New Chat
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
