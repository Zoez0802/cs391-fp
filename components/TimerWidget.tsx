/*
* Code made by Chih-Kai Huang
* retr0@bu.edu
*/

"use client";

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Timer from "@/components/Timer";

const WidgetFrame = styled.div`
    position: fixed;
    z-index: 50;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    padding: 8px;
    resize: both;        /* 👈 user can resize from the corner */
    overflow: auto;
    display: flex;
    flex-direction: column;
`;

const DragBar = styled.div`
    width: 100%;
    padding: 4px 8px;
    cursor: grab;
    font-size: 0.85rem;
    font-weight: 600;
    color: #555;
    border-bottom: 1px solid #eee;
    user-select: none;
`;

const TimerShell = styled.div<{ $compact: boolean }>`
    ${({ $compact }) =>
        $compact &&
        `
        /* Hide EVERYTHING */
        & > * {
            display: none !important;
        }
        /* Show ONLY the main time text (Timer's h1) */
        & h1 {
            display: block !important;
        }
    `}
`;

export default function TimerWidget() {
    // starting position of the widget
    const [pos, setPos] = useState({ x: 300, y: 300 });
    const [compact, setCompact] = useState(false);
    const [dragging, setDragging] = useState(false);
    const dragOffsetRef = useRef<{ offsetX: number; offsetY: number } | null>(
        null
    );

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (!dragOffsetRef.current) return;

            setPos({
                x: e.clientX - dragOffsetRef.current.offsetX,
                y: e.clientY - dragOffsetRef.current.offsetY,
            });
        };

        const handleUp = () => {
            setDragging(false);
            dragOffsetRef.current = null;
        };

        if (dragging) {
            window.addEventListener("mousemove", handleMove);
            window.addEventListener("mouseup", handleUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
    }, [dragging]);

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
        setDragging(true);
        dragOffsetRef.current = {
            offsetX: e.clientX - pos.x,
            offsetY: e.clientY - pos.y,
        };
    };

    return (
        <WidgetFrame
            style={{
                left: pos.x,
                top: pos.y,
            }}
        >
            <DragBar
                onMouseDown={handleDragStart}
                style={{
                    cursor: dragging ? "grabbing" : "grab",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <span>Timer</span>
                <button
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => setCompact((prev) => !prev)}
                    style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                    }}
                >
                    {compact ? "▢" : "▢–"}
                </button>
            </DragBar>
            <TimerShell $compact={compact}>
                <Timer />
            </TimerShell>
        </WidgetFrame>
    );
}