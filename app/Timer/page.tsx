"use client";

import Nav from "@/components/Nav";
import Timer from "@/components/Timer";

export default function TimerPage() {
    return(
        <div>
            <Nav current="timer" />
            <Timer />
        </div>
    );
}