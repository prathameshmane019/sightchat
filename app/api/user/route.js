// app/api/user/route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/lib/db";
import User from './../../models/user';

export const GET = async (req, response) => {
  try {
    // Connect to the database
    await connectMongoDB();
    // Fetch all users from the database
    const users = await User.find();
    // Return the list of users in the response
    return NextResponse.json({users})
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json("error occures" , { status:500 });
  
  }
};
