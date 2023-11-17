import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/db";
import Message from "@/app/models/messages";
export async function POST(req) {
try {
  const {text,username,senderId,reciverId} = await req.json();
  await connectMongoDB();

  const message = await Message.create({text,senderId,username,reciverId});
  console.log(message);
  return NextResponse.json({ message: message }, { status: 201 });

} catch (error) {
  return NextResponse.json({ message: "error occures" }, { status:500 });
  
}
}