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

type Props = { current?: 'home'|'notes'|'timer' };

export default function Nav({current='home'}:Props){
    return (
        <NavWrap>
            <NavLink href="/" $active = {current==="home"}>To-Do</NavLink>
            <NavLink href="/notes" $active = {current==="notes"}>To-Do</NavLink>
            <NavLink href="/timer" $active = {current==="timer"}>To-Do</NavLink>
        </NavWrap>
    )
}