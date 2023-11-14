import { connectMongoDB } from './../../lib/db';
import User from '../../models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    // Extract user data from the request body
    const { name, email, phone, password } = await req.json();

    // Log the received user data (for debugging purposes)
    console.log('Received user data:', { name, email, phone, password });

    // await saveUser({name,email,phone,password})

    console.log('Password:', password);
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectMongoDB()
    await User.create({ name, email, phone, password: hashedPassword });
    console.log('User registered successfully.');

    // Send a JSON response indicating success
    return NextResponse.json({ message: 'User registered.' }, { status: 201 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error during user registration:', error);

    // Send a JSON response indicating an error
    return NextResponse.json(
      { message: 'An error occurred while registering the user.' },
      { status: 500 }
    );
  }
}
