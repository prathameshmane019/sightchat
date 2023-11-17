// app/api/user/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/db";
import User from './../../models/user';

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email } = await req.json();
    const user = await User.findOne({ "email": email });

    return NextResponse.json({ status: 201, user });  // Corrected the syntax
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
