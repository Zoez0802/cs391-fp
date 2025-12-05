import Header from "@/components/Header";
import TodoSection from "@/components/TodoSection";
import Timer from "@/components/Timer";
import Nav from "@/components/Nav";

export default function Home() {
    return (
        <div>
            <Nav />
            <main
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "1.5rem",
                }}
            >
                <div style={{ flex: "1 1 320px", maxWidth: "420px" }}>
                    <TodoSection />
                </div>
                <div style={{ flex: "1 1 320px", maxWidth: "420px" }}>
                    <Timer />
                </div>
            </main>
        </div>
    );
}
