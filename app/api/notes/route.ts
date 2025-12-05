// Written by Minjie (Zoe) Zuo
// Next.js API route for notes (GET, POST, DELETE)
// Uses the exact same MongoDB-based structure as the tasks API.

import { NextResponse } from "next/server";
import getCollection, { NOTES_COLLECTION } from "../../../db";
import { ObjectId } from "mongodb";

// GET -> return all notes
export async function GET() {
    const collection = await getCollection(NOTES_COLLECTION);
    const docs = await collection.find().toArray();

    const notes = docs.map((doc) => ({
        id: doc._id.toString(),
        text: doc.text,
        createdAt: doc.createdAt,
    }));

    return NextResponse.json(notes);
}

// POST -> create a new note
export async function POST(req: Request) {
    const body = await req.json();

    // Only the text is needed; createdAt is generated on server
    const text = body.text;
    const createdAt = new Date().toString();

    const collection = await getCollection(NOTES_COLLECTION);
    const result = await collection.insertOne({ text, createdAt });

    return NextResponse.json({
        id: result.insertedId.toString(),
        text,
        createdAt,
    });
}

// DELETE -> remove a note by ID
export async function DELETE(req: Request) {
    const { id } = await req.json();

    const collection = await getCollection(NOTES_COLLECTION);
    await collection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
}
