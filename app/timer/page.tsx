"use client";

import Nav from "@/components/Nav";
import TimerWidget from "@/components/TimerWidget";

export default function TimerPage() {
    return(
        <div>
            <Nav current="timer" />
            <TimerWidget />
        </div>
    );
}
