// Written by Yanxi
// Header page setup
"use client"

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 24px;
    border-bottom: 1px solid gray;
    background: white;
`;

const Title = styled.h1`
    font-size: 18px;
    font-weight: bold;
    color: black;
    text-align: center;
    margin-bottom: 24px;
`;

export default function Header() {
    return (
        <Wrapper>
            <Title>Productivity Dashboard</Title>
        </Wrapper>
    );
}