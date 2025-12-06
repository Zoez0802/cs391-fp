// Written by Yanxi
// Modify by Minjie Zuo
// Header page
"use client"

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    background: linear-gradient(90deg, #a7f3d0, #93c5fd, #c4b5fd); //creates a smooth color transition.
    color: #f9fafb;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.25); // I used // "rgba(15, 23, 42, 0.25)" defines a color using Red, Green, Blue, and Alpha.
`;

const Title = styled.h1`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 26px;
    font-weight: 800;
    letter-spacing: 0.03em; // some space between letter
    margin: 0;
`;

const HeaderRight = styled.div`
    font-size: 14px;
    font-weight: 600;
    opacity: 0.95; //reduces the element’s visibility by 5%
`;

//symbols is a part of the Unicode emoji set
export default function Header() {
    return (
        <Wrapper>
            <Title>
                <span aria-hidden="true">📌</span>
                Productivity Dashboard
            </Title>
            <HeaderRight>
                "Make everyday productive 🌿"
            </HeaderRight>
        </Wrapper>
    );
}