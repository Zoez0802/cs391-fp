"use client";

/**
 * NotesSection.
 * Author:Minjie (Zoe) Zuo
 * lets the user write short notes, save them,
 * see a list of saved notes, and delete them.
 */

import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import { Note } from "@/types/types"

export default function NotesSection() {
    const [draft, setDraft] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);

    //I used localStorage:a browser feature in Web API
    // Whenever the 'notes' state changes (user adds or deletes a note),
    // this effect automatically runs and stores the updated notes array
    // inside the browser's localStorage.
    useEffect(() => {
        try {
            const stored = localStorage.getItem("notes");
            if (stored !== null) {
                const parsed = JSON.parse(stored);

                if (Array.isArray(parsed)) {
                    const loaded: Note[] = [];
                    for (let i = 0; i < parsed.length; i++) {
                        const item = parsed[i];
                        //safety check
                        if (item && typeof item.text === "string" && typeof item.createdAt === "string" && typeof item.id === "string") {
                            loaded.push(item);
                        }
                    }
                    setNotes(loaded);
                }
            }
        } catch {
            console.error("Could not read notes from localStorage");
        }
    }, []);

    // whenever notes change, save them back to localStorage
    useEffect(() => {
        try {
            const encoded = JSON.stringify(notes); //use stringify because localstroage only save strings
            localStorage.setItem("notes", encoded);
        } catch {
            console.error("Could not save notes to localStorage");
        }
    }, [notes]);

    // add a new note
    function handleSaveNote() {
        if (draft === "") {
            setInfoMessage("Please write something before saving");
            return;
        }

        // simple id based on time + random
        const id = String(Date.now()) + "-" + String(Math.random());
        const nowString = new Date().toString();

        const newNote: Note = {
            id: id,
            text: draft,
            createdAt: nowString,
        };

        const updated: Note[] = [newNote];
        for (let i = 0; i < notes.length; i++) {
            updated.push(notes[i]);
        }

        setNotes(updated);
        setDraft("");
        setInfoMessage("Note saved!");
    }

    // delete / complete note by id
    function handleDeleteNote(id: string) {
        const updated: Note[] = [];
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id !== id) {
                updated.push(notes[i]);
            }
        }
        setNotes(updated);
        setInfoMessage("Note removed.");
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
                <div className="w-full lg:w-1/2"> {/*50% of the width*/}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault(); {/*Stops the browser from refreshing the whole page.*/}
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
                                {infoMessage ? infoMessage : notes.length === 0 ? "No notes yet. Your first note will appear on the right." : `You have ${notes.length} saved note${notes.length === 1 ? "" : "s"}.`}
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
