import Account from '@/database/account.model';
import handleError from '@/lib/handlers/error';
import { ForbiddenError, ValidationError } from '@/lib/http-error';
import connectDB from '@/lib/mongoose';
import { AccountSchema } from '@/lib/validations';
import { APIErrorResponse } from '@/types/global';
import { NextResponse } from 'next/server';

// GET Get all Accounts
export async function GET() {
  try {
    await connectDB();
    const accounts = await Account.find();

    return NextResponse.json(
      { success: true, data: accounts },
      { status: 200 }
    );
  } catch (error) {
    handleError(error, 'api') as APIErrorResponse;
  }
}

// POST Create User
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    console.log('request body: ', body);

    const validatedData = AccountSchema.parse(body);

    // if (!validatedData.success) {
    //   throw new ValidationError(validatedData.error.flatten().fieldErrors);
    // }

    // const { email, username } = validatedData.data;

    const existingAccount = await Account.findOne({
      provider: validatedData.provider,
      providerAccountId: validatedData.providerAccountId,
    });

    if (existingAccount)
      throw new ForbiddenError(
        'An account with the same provider and id already exits.'
      );

    const newAccount = await Account.create(validatedData);

    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );
  } catch (error) {
    handleError(error, 'api') as APIErrorResponse;
  }
}
