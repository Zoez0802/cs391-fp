import Nav from "@/components/Nav";
import TodoSection from "@/components/TodoSection";

export default function Home() {
    return (
        <div>
            <Nav current="home" />
            <TodoSection />
        </div>
    );
}
