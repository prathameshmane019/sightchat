// app/api/user/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/db";
import User from './../../models/user';

export async function POST(req) {
  try {
    await connectMongoDB();
    const { id } = await req.json();
    
    // Find user by ID
    const user = await User.findOne({ "_id": id });

   
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.error("Internal Server Error");
  }
}
