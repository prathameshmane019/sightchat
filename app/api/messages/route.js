import { NextResponse } from "next/server";
import { connectToDatabase, saveMessage } from "@/app/controllers/messageController";

export async function POST(req) {
try {
  const message = await req.json();
  console.log(message);
  await connectToDatabase()
  const newMessage = {
    text: "Hello world",
    senderId: "123",  
    username: "user123",
  };
  await saveMessage(newMessage)
  
  
  return NextResponse.json({ message: message }, { status: 201 });

} catch (error) {
  return NextResponse.json({ message: "error occures" }, { status:500 });
  
}
  
}