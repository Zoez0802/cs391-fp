// Written by Yanxi
// Navigation page setup
"use client"

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavWrap = styled.nav`
    display: flex;
    gap: 12px;
    padding: 12px 24px;
    background: white;
    border-bottom: 1px solid gray;
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
    padding: 8px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: ${({ $active }) => ($active ? "white" : "black")};
    background: ${({ $active }) => ($active ? "#0070f3" : "transparent")};
`;

type Props = { current?: 'home'|'notes'|'timer'|'todolist' };

export default function Nav({current='home'}:Props){
    return (
        <NavWrap>
            <NavLink href="/" $active = {current==="home"}>Dashboard</NavLink>
            <NavLink href="/notes" $active = {current==="notes"}>Notes</NavLink>
            <NavLink href="/timer" $active = {current==="timer"}>Timer</NavLink>
            <NavLink href={"/todolist"} $active = {current==="todolist"}>To-do List</NavLink>
        </NavWrap>
    )
}