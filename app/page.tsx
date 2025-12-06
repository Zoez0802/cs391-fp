// Written by Yanxi and Minjie(Zoe) Zuo
// Combine all three elements together
import TodoSection from "@/components/TodoSection";
import NotesSection from "@/components/NotesSection";
import Nav from "@/components/Nav";
import Timer from "@/components/Timer";
import Footer from "@/components/Footer";

export default function DashboardPage() {
    return(
        <main className="min-h-screen bg-slate-50">
            <Nav current="home" />
            <div className="max-w-6xl mx-auto px-4">
                {/*grid-cols-1 md:grid-cols-2 is to make layout more responsive on different size of screens*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                    <div className="space-y-6">
                        <TodoSection />
                    </div>
                    <div className="space-y-6">
                        <NotesSection />
                        <Timer />
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
