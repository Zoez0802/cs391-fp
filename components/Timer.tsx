/*
* Code made by Chih-Kai Huang
* retr0@bu.edu
*/

"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Counter from "@/components/Counter";
import BestLap from "@/components/Bestlap";

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

const StatusText = styled.p`
    margin-bottom: 0.5rem;
    opacity: 0.8;
`;

const TimeText = styled.h1<{ $running: boolean; $paused: boolean }>`
    font-size: 3rem;
    margin-bottom: 2rem;
    color: ${({ $running, $paused }) => ($paused ? "red" : $running ? "green" : "black")};`;

const SecondaryTimeText = styled.p`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
`;

const Button = styled.button`
    background-color: black;
    padding: 0.5rem 1.25rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

const ModeRow = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const SmallInput = styled.input`
    width: 4rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-align: center;
`;

const HintText = styled.p`
    margin-top: 1rem;
    font-size: 0.9rem;
    opacity: 0.7;
    text-align: center;
`;

export default function Timer() {
    const [timeMs, setTimeMs] = useState(0);
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState<"up" | "down">("up");
    const [hoursInput, setHoursInput] = useState("");
    const [minutesInput, setMinutesInput] = useState("");
    const [secondsInput, setSecondsInput] = useState("");
    const [baseCountdownMs, setBaseCountdownMs] = useState(0);

    const isZero = timeMs === 0;

    // Keyboard shortcuts: Space = start/pause, R = reset
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                e.preventDefault();
                setRunning((prev) => !prev);
            }

            if (e.key.toLowerCase() === "r") {
                setRunning(false);
                setTimeMs(0);
                setBaseCountdownMs(0);
                setMode("up");
                setHoursInput("");
                setMinutesInput("");
                setSecondsInput("");
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const start = () => setRunning(true);
    const pause = () => setRunning(false);
    const reset = () => {
        setRunning(false);
        setTimeMs(0);
        setBaseCountdownMs(0);
        setMode("up");
        setHoursInput("");
        setMinutesInput("");
        setSecondsInput("");
    };

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHoursInput(e.target.value);
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinutesInput(e.target.value);
    };

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondsInput(e.target.value);
    };

    const applyCountdown = () => {
        const h = Number(hoursInput) || 0;
        const m = Number(minutesInput) || 0;
        const s = Number(secondsInput) || 0;

        const totalSeconds = h * 3600 + m * 60 + s;
        if (totalSeconds <= 0) return;

        // normalize into H:M:S
        const normHours = Math.floor(totalSeconds / 3600);
        const remaining = totalSeconds % 3600;
        const normMinutes = Math.floor(remaining / 60);
        const normSeconds = remaining % 60;

        // update inputs to reflect normalized values
        setHoursInput(normHours.toString());
        setMinutesInput(normMinutes.toString());
        setSecondsInput(normSeconds.toString());

        const totalMs = totalSeconds * 1000;

        setMode("down");
        setBaseCountdownMs(totalMs);
        setTimeMs(totalMs);
        setRunning(false); // wait for pressing Start
    };

    const displayMs = mode === "down" ? Math.max(timeMs, 0) : timeMs;

    const hours = Math.floor(displayMs / 3600000)
        .toString()
        .padStart(2, "0");

    const minutes = Math.floor((displayMs % 3600000) / 60000)
        .toString()
        .padStart(2, "0");

    const seconds = Math.floor((displayMs % 60000) / 1000)
        .toString()
        .padStart(2, "0");

    const milliseconds = Math.floor((displayMs % 1000) / 10)
        .toString()
        .padStart(2, "0");

    const elapsedMs =
        mode === "down" && baseCountdownMs > 0
            ? Math.max(baseCountdownMs - timeMs, 0)
            : timeMs;

    const elapsedHours = Math.floor(elapsedMs / 3600000)
        .toString()
        .padStart(2, "0");

    const elapsedMinutes = Math.floor((elapsedMs % 3600000) / 60000)
        .toString()
        .padStart(2, "0");

    const elapsedSeconds = Math.floor((elapsedMs % 60000) / 1000)
        .toString()
        .padStart(2, "0");

    const elapsedMilliseconds = Math.floor((elapsedMs % 1000) / 10)
        .toString()
        .padStart(2, "0");

    const countdownFinished = mode === "down" && timeMs <= 0;

    const status = running
        ? "Running..."
        : isZero
            ? "Ready"
            : "Paused";

    return (
        <Wrapper>
            <StatusText>{status}</StatusText>

            <TimeText
                $running={running}
                $paused={countdownFinished || (!running && !isZero)}
            >
                {mode === "down" && baseCountdownMs > 0 ? "Countdown: " : "Stopwatch: "}
                {hours}:{minutes}:{seconds}:{milliseconds}
            </TimeText>
            {mode === "down" && baseCountdownMs > 0 && (
                <SecondaryTimeText>
                    Stopwatch: {elapsedHours}:{elapsedMinutes}:{elapsedSeconds}:{elapsedMilliseconds}
                </SecondaryTimeText>
            )}

            <BestLap
                show={!running && mode === "down" && baseCountdownMs > 0}
                countdownMs={baseCountdownMs}
                stopwatchMs={elapsedMs}
                afterDone={timeMs <= 0}
            />

            <ButtonRow>
                <Button onClick={start} disabled={running}>
                    Start
                </Button>
                <Button onClick={pause} disabled={!running}>
                    Pause
                </Button>
                <Button onClick={reset} disabled={isZero}>
                    Reset
                </Button>
            </ButtonRow>

            <ModeRow>
                <span>{mode === "up" ? "Stopwatch" : "Countdown"}</span>
                <SmallInput
                    type="number"
                    min="0"
                    placeholder="Hrs"
                    value={hoursInput}
                    onChange={handleHoursChange}
                />
                <SmallInput
                    type="number"
                    min="0"
                    max="59"
                    placeholder="Mins"
                    value={minutesInput}
                    onChange={handleMinutesChange}
                />
                <SmallInput
                    type="number"
                    min="0"
                    max="59"
                    placeholder="Secs"
                    value={secondsInput}
                    onChange={handleSecondsChange}
                />
                <Button onClick={applyCountdown} disabled={running}>
                    Set Countdown
                </Button>
            </ModeRow>

            <Counter
                running={running}
                direction={mode}
                onTick={(deltaMs: number) => {
                    setTimeMs((prev) => {
                        const next = prev + deltaMs;
                        if (mode === "down") {
                            return next;
                        }
                        return Math.max(next, 0);
                    });
                }}
            />

            <HintText>
                Tip: Press <strong>Space</strong> to start/pause,{" "}
                <strong>R</strong> to reset.
            </HintText>
        </Wrapper>
    );
}