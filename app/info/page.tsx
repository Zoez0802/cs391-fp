//Created by Minjie (Zoe) Zuo
"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function InfoPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50 to-pink-50">
            <Nav current="info" />

            {/* Centered info card */}
            <section className="max-w-3xl mx-auto mt-10 mb-16 px-6 py-8 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-slate-200">
                <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span aria-hidden="true">ℹ️</span>
                    Project Overview
                </h1>

                <p className="mt-3 text-slate-700 text-sm">
                    This dashboard is our CS391 final project. We wanted something simple but useful:
                    a single page where you can manage tasks, jot down quick notes, and use a timer
                    to stay on track.
                </p>

                <h2 className="mt-6 text-xl font-semibold text-slate-900">
                    Approach & technologies
                </h2>
                <ul className="mt-2 space-y-2 text-slate-700 text-sm list-disc list-inside">
                    <li>
                        <strong>Full-stack Next.js + MongoDB:</strong> we used Next.js App Router with
                        API routes (<code className="bg-slate-100 px-1 rounded">/api/tasks</code> and{" "}
                        <code className="bg-slate-100 px-1 rounded">/api/notes</code>) that talk to a shared
                        MongoDB database. The UI and backend live in the same project.
                    </li>

                    <li>
                        <strong>Commented code:</strong> we added global comments and inline comments in
                        each component to explain what we are doing and who is responsible for which part,
                        as required in the spec.
                    </li>
                    <li>
                        <strong>Consistent, colorful design:</strong> we cleaned up the layout so the
                        dashboard feels like one product: soft gradient header, card-style widgets, and
                        sticky-note visuals that look like real notes on a desk.
                    </li>
                </ul>

                <h2 className="mt-6 text-xl font-semibold text-slate-900">
                    Components
                </h2>
                <ul className="mt-2 space-y-2 text-slate-700 text-sm list-disc list-inside">
                    <li>
                        <strong>To-Do List:</strong> task manager backed by MongoDB, with add / complete / delete
                        logic and styled-components for the widget layout.
                    </li>
                    <li>
                        <strong>Notes:</strong> sticky-note style quick notes, also stored in MongoDB,
                        with a playful UI (tilt, colors, lined-paper effect) but still matching the overall theme.
                    </li>
                    <li>
                        <strong>Timer / Stopwatch:</strong> a timer to support focused work sessions,
                        styled as a separate widget on the right side of the dashboard.
                    </li>
                </ul>

            </section>
            <Footer />
        </main>
    );
}
