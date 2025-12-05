import NotesSection from "@/components/NotesSection";
import Nav from "@/components/Nav";

export default function NotesPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Nav current="notes" />
            <NotesSection />
        </main>
    );
}
