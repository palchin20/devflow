import User from '@/database/user.model';
import handleError from '@/lib/handlers/error';
import { NotFoundError } from '@/lib/http-error';
import connectDB from '@/lib/mongoose';
import { UserSchema } from '@/lib/validations';
import { APIErrorResponse } from '@/types/global';
import { NextResponse } from 'next/server';

// GET user by id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log('id: ', id);
  if (!id) throw new NotFoundError('User');

  try {
    await connectDB();

    const user = await User.findById(id);

    if (!user) throw new NotFoundError('User');

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse;
  }
}

// DELETE - user by id

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log('id: ', id);
  if (!id) throw new NotFoundError('User');

  try {
    await connectDB();

    const user = await User.findByIdAndDelete(id);

    if (!user) throw new NotFoundError('User');

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse;
  }
}

// PUT modify user by id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log('id: ', id);
  if (!id) throw new NotFoundError('User');

  try {
    await connectDB();

    const body = await request.json();
    const validatedData = UserSchema.partial().parse(body);

    // returns the updated document if new is set to true
    const updatedUser = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });

    if (!updatedUser) throw new NotFoundError('User');

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, 'api') as APIErrorResponse;
  }
}
