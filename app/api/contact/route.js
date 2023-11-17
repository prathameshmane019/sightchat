// app/api/user/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/db";
import User from './../../models/user';


export async function POST(req) {
  try {
    await connectMongoDB();
    const { id } = await req.json();
    const user = await User.findOne({ "_id":id });
    return NextResponse.json({ user:user });
  } catch (error) {
    console.log(error);
  }
}
