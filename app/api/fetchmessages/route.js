// app/api/user/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/db";
import Message from "@/app/models/messages";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { senderId,reciverId } = await req.json();
    const messages = await Message.find({ "reciverId": reciverId,"reciverId":reciverId });

    return NextResponse.json( messages );  // Corrected the syntax
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
