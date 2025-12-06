/*
* Code made by Chih-Kai Huang
* retr0@bu.edu
*/

"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Counter from "@/components/Counter";
import BestLap from "@/components/Bestlap";

const Wrapper = styled.section`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

const StatusText = styled.p`
    margin-bottom: 0.5rem;
    opacity: 0.8;
    color: cadetblue;
`;

const TimeText = styled.h1<{ $running: boolean; $paused: boolean }>`
    font-size: 2.5rem;
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
    color: cadetblue;
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
    color: cadetblue;

`;

const SmallInput = styled.input`
    width: 4rem;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-align: center;
    color: cadetblue;
`;

const HintText = styled.p`
    margin-top: 1rem;
    font-size: 0.9rem;
    opacity: 0.7;
    text-align: center;
    color: cadetblue;
`;

export default function Timer() {
    const [timeMs, setTimeMs] = useState(0);
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState<"up" | "down">("up");
    const [monthsInput, setMonthsInput] = useState("");
    const [daysInput, setDaysInput] = useState("");
    const [hoursInput, setHoursInput] = useState("");
    const [minutesInput, setMinutesInput] = useState("");
    const [baseCountdownMs, setBaseCountdownMs] = useState(0);

    const isZero = timeMs === 0;

    const start = () => setRunning(true);
    const pause = () => setRunning(false);
    const reset = () => {
        setRunning(false);
        setTimeMs(0);
        setBaseCountdownMs(0);
        setMode("up");
        setMonthsInput("");
        setDaysInput("");
        setHoursInput("");
        setMinutesInput("");
    };

    const handleMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMonthsInput(e.target.value);
    };

    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDaysInput(e.target.value);
    };

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHoursInput(e.target.value);
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinutesInput(e.target.value);
    };

    const applyCountdown = () => {
        const mo = Number(monthsInput) || 0;
        const d = Number(daysInput) || 0;
        const h = Number(hoursInput) || 0;
        const m = Number(minutesInput) || 0;

        // month = 30 days, day = 24 hours
        const totalMinutes = mo * 30 * 24 * 60 + d * 24 * 60 + h * 60 + m;
        if (totalMinutes <= 0) return;

        const totalMs = totalMinutes * 60000;

        // normalize back to Months:Days:Hrs:Mins
        const totalDays = Math.floor(totalMs / (3600000 * 24));
        const normMonths = Math.floor(totalDays / 30);
        const normDays = totalDays % 30;
        const totalHours = Math.floor(totalMs / 3600000);
        const normHours = totalHours % 24;
        const normMinutes = totalMinutes % 60;

        setMonthsInput(normMonths.toString());
        setDaysInput(normDays.toString());
        setHoursInput(normHours.toString());
        setMinutesInput(normMinutes.toString());

        setMode("down");
        setBaseCountdownMs(totalMs);
        setTimeMs(totalMs);
        setRunning(false); // wait for pressing Start
    };

    const displayMs = mode === "down" ? Math.max(timeMs, 0) : timeMs;

    // Convert ms → Months, Days, Hours, Minutes (month = 30 days)
    const totalMinutes = Math.floor(displayMs / 60000);
    const totalHours = Math.floor(displayMs / 3600000);
    const totalDays = Math.floor(displayMs / (3600000 * 24));
    const months = Math.floor(totalDays / 30)
        .toString()
        .padStart(2, "0");

    const days = Math.floor(totalDays % 30)
        .toString()
        .padStart(2, "0");

    const hours = Math.floor(totalHours % 24)
        .toString()
        .padStart(2, "0");

    const minutes = Math.floor(totalMinutes % 60)
        .toString()
        .padStart(2, "0");
    const seconds = Math.floor((displayMs % 60000) / 1000)
        .toString()
        .padStart(2, "0");

    const elapsedMs =
        mode === "down" && baseCountdownMs > 0
            ? Math.max(baseCountdownMs - timeMs, 0)
            : timeMs;

    const eTotalMinutes = Math.floor(elapsedMs / 60000);
    const eTotalHours = Math.floor(elapsedMs / 3600000);
    const eTotalDays = Math.floor(elapsedMs / (3600000 * 24));
    const eMonths = Math.floor(eTotalDays / 30)
        .toString()
        .padStart(2, "0");

    const eDays = Math.floor(eTotalDays % 30)
        .toString()
        .padStart(2, "0");

    const eHours = Math.floor(eTotalHours % 24)
        .toString()
        .padStart(2, "0");

    const eMinutes = Math.floor(eTotalMinutes % 60)
        .toString()
        .padStart(2, "0");
    const eSeconds = Math.floor((elapsedMs % 60000) / 1000)
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
                {months}:{days}:{hours}:{minutes}:{seconds}
            </TimeText>
            {mode === "down" && baseCountdownMs > 0 && (
                <SecondaryTimeText>
                    Stopwatch: {eMonths}:{eDays}:{eHours}:{eMinutes}:{eSeconds}
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
                    placeholder="Months"
                    value={monthsInput}
                    onChange={handleMonthsChange}
                />
                <SmallInput
                    type="number"
                    min="0"
                    placeholder="Days"
                    value={daysInput}
                    onChange={handleDaysChange}
                />
                <SmallInput
                    type="number"
                    min="0"
                    max="23"
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
                Tip: Use the <strong>Start</strong>, <strong>Pause</strong>, and <strong>Reset</strong> buttons to control the timer.
            </HintText>
        </Wrapper>
    );
}