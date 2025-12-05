// Written by Yanxi
// Next.js API route for tasks (GET, POST, PUT, DELETE)
// Since server side function (get data) and client side function (re-render) can't simultaneously happen on the same page, use route to solve the problem
import { NextResponse } from "next/server";
import getCollection, { TASKS_COLLECTION } from "../../../db";
import { ObjectId } from "mongodb";

//Fetches all tasks from the database
export async function GET() {
    const collection = await getCollection(TASKS_COLLECTION);
    const data = await collection.find().toArray();
    //mongodb's _id -> Task's id
    const tasks = data.map(p => ({
        id: p._id.toHexString(),
        title: p.title,
        done: p.done,
    }));
    return NextResponse.json(tasks);
}

//Adds a new task to the database
export async function POST(req: Request) {
    const task = await req.json();
    const collection = await getCollection(TASKS_COLLECTION);
    const result = await collection.insertOne(task);
    return NextResponse.json({ ...task, _id: result.insertedId });
}

//Updates an existing task by its ID
export async function PUT(req: Request) {
    const { id, title, done } = await req.json();
    const collection = await getCollection(TASKS_COLLECTION);
    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { title, done } }
    );
    return NextResponse.json({ id, title, done });
}

//Deletes a task by its ID
export async function DELETE(req: Request) {
    const { id } = await req.json();
    const collection = await getCollection(TASKS_COLLECTION);
    await collection.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
}
