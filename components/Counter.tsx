/*
* Code made by Chih-Kai Huang
* retr0@bu.edu
*/


"use client";

import { useEffect } from "react";

interface CounterProps {
    running: boolean;
    direction: "up" | "down"; // stopwatch or countdown
    onTick: (deltaMs: number) => void;
}

export default function Counter({ running, direction, onTick }: CounterProps) {

    useEffect(() => {
        if (!running) return;

        const id = setInterval(() => {
            const step = direction === "up" ? 10 : -10;  // +10ms or -10ms
            onTick(step);
        }, 10);

        return () => clearInterval(id);

    }, [running, direction, onTick]);

    return null;
}