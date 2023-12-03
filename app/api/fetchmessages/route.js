import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/db";
import Message from "@/app/models/messages";
import Conversation from "@/app/models/conversation";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { senderId, reciverId } = await req.json();


    let conversation = await Conversation.findOne({
      participants: { $all:[reciverId,senderId] },
    });
    const conversationId = conversation?._id;
    const messages = await Message.find({ conversationId });
    return NextResponse.json({ messages,conversationId });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
