import React, { useEffect, useState } from "react";
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
  RiFileTextLine,
  RiLoader5Fill,
  RiMore2Line,
} from "@remixicon/react";
import {
  useCreateNote,
  useDeleteNote,
  useNotes,
  useUpdateNote,
} from "@/features/use-note";
import LoaderOverlay from "../loader-overlay";
import useNoteId from "@/hooks/use-note-id";
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

const NavNotes = () => {
  const { noteId, setNoteId } = useNoteId();
  const { data, isPending } = useNotes();
  const { mutate, isPending: isLoading } = useCreateNote();
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();
  const { mutate: updateNote, isPending: isRenaming } = useUpdateNote();

  const notes = data?.data ?? [];
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [renameTarget, setRenameTarget] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [renameDraft, setRenameDraft] = useState("");

  useEffect(() => {
    if (renameTarget) setRenameDraft(renameTarget.title);
  }, [renameTarget]);

  const onCreate = () => {
    mutate({
      title: "Untitled",
      content: "",
    });
  };

  const onClick = (id: string) => {
    setNoteId(id);
  };

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    deleteNote(pendingDeleteId, {
      onSuccess: () => setPendingDeleteId(null),
    });
  };

  const submitRename = () => {
    if (!renameTarget || !renameDraft.trim()) return;
    updateNote(
      {
        id: renameTarget.id,
        json: { title: renameDraft.trim() },
      },
      { onSuccess: () => setRenameTarget(null) }
    );
  };

  return (
    <>
      <LoaderOverlay text="Creating note..." show={isLoading} />
      <SidebarGroup>
        <SidebarGroupLabel>
          <h5>Notes</h5>
          <SidebarGroupAction
            className="mt-[1.5px] flex items-center size-5.5 rounded-md bg-primary/20 border cursor-pointer"
            onClick={onCreate}
          >
            <RiAddLine className="!size-5" />
            <span className="sr-only">Add Notes</span>
          </SidebarGroupAction>
        </SidebarGroupLabel>
        <SidebarGroupContent className="w-full h-auto min-h-32 max-h-[360px] overflow-y-auto">
          <SidebarMenu>
            {notes?.length === 0 ? (
              <div>No Notes</div>
            ) : isPending ? (
              <div className="flex items-center justify-center">
                <RiLoader5Fill className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              notes?.map((note) => {
                const isActive = note.id === noteId;
                return (
                  <SidebarMenuItem key={note.id} className="group/menu-item">
                    <div className="flex w-full items-center gap-0.5">
                      <SidebarMenuButton
                        className="flex flex-1 items-center min-w-0"
                        isActive={isActive}
                        onClick={() => onClick(note.id)}
                      >
                        <span className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                          <RiFileTextLine className="w-4 h-4 text-primary" />
                        </span>
                        <h5 className="flex-1 truncate text-left">{note.title}</h5>
                      </SidebarMenuButton>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground hover:bg-sidebar-accent data-[state=open]:bg-sidebar-accent data-[state=open]:text-foreground"
                            aria-label="Note options"
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
                              setRenameTarget({ id: note.id, title: note.title })
                            }
                          >
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={() => setPendingDeleteId(note.id)}
                          >
                            Delete note
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
            <DialogTitle>Rename note</DialogTitle>
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
            <DialogTitle>Delete this note?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This permanently deletes the note. This cannot be undone.
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

export default NavNotes;
