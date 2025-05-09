import User from '@/database/user.model';
import handleError from '@/lib/handlers/error';
import { ValidationError } from '@/lib/http-error';
import connectDB from '@/lib/mongoose';
import { UserSchema } from '@/lib/validations';
import { APIErrorResponse } from '@/types/global';
import { NextResponse } from 'next/server';

// GET Get all Users
export async function GET() {
  try {
    await connectDB();
    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    handleError(error, 'api') as APIErrorResponse;
  }
}

// POST Create User
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const validatedData = UserSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, username } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw Error('User already exits.');

    const existingUsername = await User.findOne({ username });
    if (existingUsername) throw Error('Username is already taken.');

    const newUser = await User.create(validatedData.data);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    handleError(error, 'api') as APIErrorResponse;
  }
}
