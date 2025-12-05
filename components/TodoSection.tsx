// Written by Yanxi
// Main page for to-do list
"use client"

import { useState, useEffect } from "react";
import styled from "styled-components";
import TaskItem from "./TaskItem";
import { Task } from '../types/types';

const Wrapper = styled.div`
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 16px;
`;
const AddRow = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
`;

const Input = styled.input`
    flex: 1;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid whitesmoke;
`;

export default function TodoSection(){
    //load tasks (prevent hydration mismatches)
    const [tasks, setTasks] = useState<Task[]>([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        async function fetchTasks() {
            const res = await fetch("/api/tasks");
            const data: Task[] = await res.json();
            setTasks(data);
        }
        fetchTasks();
    }, []);

    const addTask = async () => {
        if(input.trim() === "") return;

        const newTask: Task = {
            title: input.trim(),
            done: false,
            id: ""
        };
        const res = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(newTask),
        });
        const savedTask: Task = await res.json();
        setTasks([...tasks, savedTask]);
        setInput("");
    }

    // Change done or not done status and remain other fields the same using copy
    const toggle = async (task: Task) => {
        const updated = { ...task, done: !task.done };
        await fetch("/api/tasks/", {
            method: "PUT",
            body: JSON.stringify({...updated, id: task.id}),
        });
        setTasks(tasks.map(i => (i.id === task.id ? updated : i)));
    };

    // Delete a task by comparing the id
    const remove = async (task: Task) => {
        await fetch("/api/tasks/", {
            method: "DELETE",
            body: JSON.stringify({ id: task.id }),
        });
        setTasks(tasks.filter(i => i.id !== task.id));
    }

    const update = async (task: Task, newTitle: string) => {
        const updated = { ...task, title: newTitle };
        await fetch("/api/tasks", {
            method: "PUT",
            body: JSON.stringify({ id: task.id, title: newTitle, done: task.done }),
        });
        setTasks(tasks.map(i => (i.id === task.id ? updated : i)));
    };


    return(
        <Wrapper>
            <h2>To-Do List</h2>
            <AddRow>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={addTask}>Add</button>
            </AddRow>

            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => toggle(task)}
                    onDelete={() => remove(task)}
                    onUpdate={(newTitle) => update(task, newTitle)}
                />

            ))}
        </Wrapper>
    )
}