"use client";

/**
 * NotesSection.
 * Author: Minjie (Zoe) Zuo
 * lets the user write short notes, save them,
 * see a list of saved notes, and delete them.
 *
 * fixed: uses the same Mongo-backed API approach as the to-do list,
 */

import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

type Note = {
    id: string;
    text: string;
    createdAt: string;
};

export default function NotesSection() {
    const [draft, setDraft] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);

    // Load notes from the backend (similar to TodoSection fetching /api/tasks)
    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await fetch("/api/notes");
                if (!res.ok) {
                    console.error("Failed to load notes");
                    return;
                }
                const data: Note[] = await res.json();
                setNotes(data);
            } catch (error) {
                console.error("Could not load notes", error);
            }
        }

        fetchNotes();
    }, []);

    // add a new note
    async function handleSaveNote() {
        if (draft === "") {
            setInfoMessage("Please write something before saving");
            return;
        }

        //backend will return the real saved note (with id)
        const newNote: Note = {
            id: "",
            text: draft,
            createdAt: new Date().toString(),
        };

        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                body: JSON.stringify(newNote),
            });

            if (!res.ok) {
                console.error("Failed to save note");
                setInfoMessage("Could not save note. Please try again.");
                return;
            }

            const savedNote: Note = await res.json();

            // keep newest note at the top
            setNotes([savedNote, ...notes]);

            setDraft("");
            setInfoMessage("Note saved!");
        } catch (error) {
            console.error("Error saving note", error);
            setInfoMessage("Could not save note. Please try again.");
        }
    }

    // delete / complete note by id
    async function handleDeleteNote(id: string) {
        try {
            const res = await fetch("/api/notes", {
                method: "DELETE",
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                console.error("Failed to delete note");
                setInfoMessage("Could not delete note. Please try again.");
                return;
            }

            const updated: Note[] = [];
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].id !== id) {
                    updated.push(notes[i]);
                }
            }

            setNotes(updated);
            setInfoMessage("Note removed.");
        } catch (error) {
            console.error("Error deleting note", error);
            setInfoMessage("Could not delete note. Please try again.");
        }
    }

    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-10">
            {/* title */}
            <div className="mb-6">
                <h2 className="text-4xl font-bold text-slate-900">Notes</h2>
                <p className="text-lg text-slate-600 mt-2">
                    Write down quick ideas, reminders, or anything you want.
                </p>
            </div>

            {/* lg:flex-row: give it a two-column layout */}
            <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* LEFT – input form */}
                <div className="w-full lg:w-1/2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            // same behavior as before, now backed by Mongo
                            handleSaveNote();
                        }}
                        className="space-y-3"
                    >
                        <label
                            htmlFor="note-textarea"
                            className="block text-sm font-medium text-slate-600"
                        >
                            New note
                        </label>

                        <textarea
                            id="note-textarea"
                            className="w-full h-[80px] rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-40"
                            placeholder="Write something…"
                            value={draft}
                            onChange={(event) => {
                                setDraft(event.target.value);
                                setInfoMessage(null);
                            }}
                        />

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                {infoMessage
                                    ? infoMessage
                                    : notes.length === 0
                                        ? "No notes yet. Your first note will appear on the right."
                                        : `You have ${notes.length} saved note${
                                            notes.length === 1 ? "" : "s"
                                        }.`}
                            </p>

                            <button
                                type="submit"
                                disabled={draft === ""}
                                className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-blue-500 text-white text-xs font-medium shadow-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                Save Note
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT – list of saved notes */}
                <div className="w-full lg:w-1/2 overflow-visible">
                    <h3 className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                        Saved Notes
                    </h3>

                    {notes.length === 0 ? (
                        <p className="text-xs text-slate-400">
                            Your notes will appear here as little sticky notes.
                        </p>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {notes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onDelete={() => handleDeleteNote(note.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
