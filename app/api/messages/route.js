import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/db";
import Message from "@/app/models/messages";
import Conversation from "@/app/models/conversation";

export async function POST(req) {
  try {
    const { text, username, senderId, reciverId, conversationId } = await req.json();
    await connectMongoDB();

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!conversation || !conversationId) {
      try {
        conversation = await Conversation.create({
          participants: [senderId, reciverId],
        });
      } catch (error) {
        console.log(error);
      }
    }

    const message = await Message.create({
      text,
      senderId,
      username,
      reciverId,
      conversationId: conversation._id || conversationId,
    });

    await Conversation.findByIdAndUpdate(
      conversation._id,
      { $push: { messages: message._id } },
      { new: true }
    );

    return NextResponse.json({
      message: message,
      conversationId: conversation._id,
    }, { status: 201 });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json({ message: "error occurs" }, { status: 500 });
  }
}
