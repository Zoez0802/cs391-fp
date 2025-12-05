// Written by Yanxi
// Combine all three elements together
import TodoSection from "@/components/TodoSection";
import NotesSection from "@/components/NotesSection";
import Timer from "@/components/Timer";
import Nav from "@/components/Nav";

export default function DashboardPage() {
    return(
        <main className={"min-h-screen bg-gray-100 p-6"}>
            <Nav current="home" />
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
                <div className={"space-y-6"}>
                    <TodoSection />
                </div>
                <div className={"space-y-6"}>
                    <NotesSection />
                    <Timer />
                </div>
            </div>
        </main>
    );
}
