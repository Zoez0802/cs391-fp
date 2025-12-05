import NotesSection from "@/components/NotesSection";
import Nav from "@/components/Nav";
import TimerWidget from "@/components/TimerWidget";

export default function NotesPage() {
    return (
        <main className="min-h-screen bg-slate-50 relative">
            <Nav current="notes" />
            <NotesSection />

            {/* Floating, draggable + resizable timer widget */}
            <TimerWidget />
        </main>
    );
}