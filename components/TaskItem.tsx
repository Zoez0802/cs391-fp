// Written by Yanxi
// TaskItem styling, client side's view

"use client"
// useRef to prevent re-render
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Task } from '../types/types';

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 6px;
    background: whitesmoke;
    margin-bottom: 8px;
`;

const Title = styled.span<{ $done?: boolean }>`
    flex: 1;
    color: ${(props) => (props.$done ? "gray" : "black")};
    text-decoration: ${( props ) => (props.$done ? "line-through" : "none")};
`;

const EditInput = styled.input`
    flex: 1;
    padding: 6px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: black;
    &:focus {
        outline: none;
        border-color: #2196f3;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 6px;
`;

const EditButton = styled.button`
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

const SaveButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background-color: #0b7dda;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background-color: #da190b;
  }
`;

type Props = {
    task: Task;
    onToggle: (id:string) => void;
    onDelete: (id:string) => void;
    onUpdate: (newTitle: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate}: Props) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(task.title);
    const inputRef = useRef<HTMLInputElement>(null);

    // Make an interesting cursor inside the text box when editing
    useEffect(() => {
        if (editing) inputRef.current?.focus();
    }, [editing]);

    // Function for save button
    const save = () => {
        //get rid of spaces leading and following
        if (value.trim() && value !== task.title) {
            onUpdate(value.trim());
        }
        setEditing(false);
    };

    return (
        <Item>
            {editing ? (
                <EditInput
                    ref={inputRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && save()}
                    onBlur={save} // save when losing focus
                />
            ) : (
                <Title $done={task.done} onClick={() => onToggle(task.id)}>
                    {task.title}
                </Title>
            )}

            <Buttons>
                {!editing && <EditButton onClick={() => setEditing(true)}>Edit</EditButton>}
                {editing && <SaveButton onClick={save}>Save</SaveButton>}
                <DeleteButton onClick={() => onDelete(task.id)}>Delete</DeleteButton>
            </Buttons>
        </Item>
    )
}