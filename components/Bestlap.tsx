/*
* Code made by Chih-Kai Huang
* retr0@bu.edu
*/

"use client";

import React from "react";
import styled from "styled-components";

interface BestLapProps {
    show: boolean;
    countdownMs: number;
    stopwatchMs: number;
    afterDone: boolean;
}

const BestLapText = styled.p<{ $afterDone: boolean }>`
    margin-top: 0.5rem;
    font-size: 1.1rem;
    color: ${({ $afterDone }) => ($afterDone ? "cadetblue" : "purple")};
`;

export default function BestLap({ show, countdownMs, stopwatchMs, afterDone }: BestLapProps) {
    if (!show) return null;

    const diffMs = Math.abs(countdownMs - stopwatchMs);

    const hours = Math.floor(diffMs / 3600000)
        .toString()
        .padStart(2, "0");

    const minutes = Math.floor((diffMs % 3600000) / 60000)
        .toString()
        .padStart(2, "0");

    const seconds = Math.floor((diffMs % 60000) / 1000)
        .toString()
        .padStart(2, "0");

    const milliseconds = Math.floor((diffMs % 1000) / 10)
        .toString()
        .padStart(2, "0");

    return (
        <BestLapText $afterDone={afterDone}>
            Interval: {afterDone ? "+" : ""}{hours}:{minutes}:{seconds}:{milliseconds}
        </BestLapText>
    );
}
