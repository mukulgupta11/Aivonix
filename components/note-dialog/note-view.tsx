"use client";
import React, { useEffect, useRef, useState } from "react";
import { useNote, useUpdateNote, useDeleteNote } from "@/features/use-note";
import { RiLoader5Fill } from "@remixicon/react";
import { AutosizeTextarea, AutosizeTextAreaRef } from "../ui/autosize-textarea";
import { Button } from "../ui/button";
import { suggestNoteTitleFromContent } from "@/app/actions/action";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const isDefaultNoteTitle = (t: string) => {
  const s = t.trim();
  if (!s) return true;
  return /^untitled(\s*note)?\.{0,3}$/i.test(s);
};

const NoteView = ({ noteId }: { noteId: string }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [suggesting, setSuggesting] = useState(false);

  const titleTextareaRef = useRef<AutosizeTextAreaRef | null>(null);
  const contentTextareaRef = useRef<AutosizeTextAreaRef | null>(null);

  const { data, isPending: isLoading } = useNote(noteId);
  const { mutate, isPending } = useUpdateNote();
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();

  const note = data?.data;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    if (!isLoading) {
      const titleTextAreaEle = titleTextareaRef.current;
      if (titleTextAreaEle) {
        titleTextAreaEle.textArea.style.minHeight = "auto !important";
        titleTextAreaEle.textArea.style.maxHeight = "auto !important";
        titleTextAreaEle.textArea.focus();
      }
    }
  }, [isLoading]);

  const handleSuggestTitle = async () => {
    if (!content.trim()) {
      toast.error("Add some content first");
      return;
    }
    setSuggesting(true);
    try {
      const suggested = await suggestNoteTitleFromContent(content);
      if (suggested) {
        setTitle(suggested);
        toast.success("Title suggested — edit or save when ready");
      } else {
        toast.error("Could not suggest a title");
      }
    } finally {
      setSuggesting(false);
    }
  };

  const handleUpdate = async () => {
    if (!noteId) return;
    let nextTitle = title.trim();
    if (isDefaultNoteTitle(nextTitle) && content.trim().length >= 12) {
      const suggested = await suggestNoteTitleFromContent(content);
      if (suggested) nextTitle = suggested;
    }
    if (!nextTitle) nextTitle = "Untitled";

    mutate({
      id: noteId,
      json: {
        title: nextTitle,
        content: content,
      },
    });
    setTitle(nextTitle);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      contentTextareaRef.current?.textArea.focus();
    }
  };

  const confirmDelete = () => {
    deleteNote(noteId, {
      onSuccess: () => setDeleteOpen(false),
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[20vh]">
        <RiLoader5Fill className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  const canSave = Boolean(noteId && (title.trim() || content.trim()));

  return (
    <div className="relative w-full h-full p-6">
      <div className="w-full pl-2 mb-3">
        <div className="border-b">
          <AutosizeTextarea
            ref={titleTextareaRef}
            value={title}
            onKeyDown={handleTitleKeyDown}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled note..."
            className="w-full resize-none !border-none
          outline-none bg-transparent font-bold
          placeholder:text-muted-foreground/40 text-4xl leading-tight
          overflow-hidden !px-0 focus-visible:!ring-0
          focus-visible:!ring-offset-0
          "
          />
        </div>
      </div>

      <div className="w-full pl-2">
        <AutosizeTextarea
          ref={contentTextareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="w-full resize-none !border-none
          outline-none bg-transparent
          placeholder:text-muted-foreground/40 text-base leading-relaxed
           !px-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 !min-h-[65vh]"
        />
      </div>

      <div className="sticky bottom-0 py-2 flex flex-wrap items-center justify-end gap-2 z-50 bg-background">
        <Button
          type="button"
          variant="outline"
          onClick={handleSuggestTitle}
          disabled={suggesting || !content.trim()}
          className="rounded-full cursor-pointer"
        >
          {suggesting && (
            <RiLoader5Fill className="!w-4 !h-4 animate-spin mr-2" />
          )}
          Suggest title
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-full text-destructive border-destructive/40 hover:bg-destructive/10"
          onClick={() => setDeleteOpen(true)}
        >
          Delete note
        </Button>
        <Button
          onClick={handleUpdate}
          disabled={isPending || !canSave}
          className="rounded-full !px-10 !text-lg cursor-pointer disabled:opacity-75"
          size="lg"
        >
          {isPending && <RiLoader5Fill className="!w-7 !h-7 animate-spin" />}
          Save changes
        </Button>
      </div>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this note?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This permanently deletes the note. This cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setDeleteOpen(false)}>
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
    </div>
  );
};

export default NoteView;
