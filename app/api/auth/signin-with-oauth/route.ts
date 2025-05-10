import Account from '@/database/account.model';
import User from '@/database/user.model';
import handleError from '@/lib/handlers/error';
import { ValidationError } from '@/lib/http-error';
import connectDB from '@/lib/mongoose';
import { SignInWithOAuthSchema } from '@/lib/validations';
import { APIErrorResponse } from '@/types/global';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import slugify from 'slugify';

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();

  await connectDB();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = SignInWithOAuthSchema.safeParse({
      provider,
      providerAccountId,
      user,
    });

    if (!validatedData.success) {
      console.log('Validation failed in SignInWithOAuthSchema');
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { name, email, username, image } = user;

    const slugifiedUserName = slugify(username, {
      lower: true,
      strict: true,
      trim: true,
    });

    let existingUser = await User.findOne({ email }).session(session);

    if (!existingUser) {
      console.log(
        'User not found. Now creating User: ',
        `email: ${email}, username: ${username}, name: ${name}, image: ${image}`
      );
      [existingUser] = await User.create(
        [
          {
            email: email,
            username: slugifiedUserName,
            name: name,
            image,
          },
        ],
        { session }
      );
    } else {
      console.log('User found: ', `name: ${name}, image: ${image}`);
      const updatedData: { name?: string; image?: string } = {};

      if (existingUser.name !== name) updatedData.name = name;
      if (existingUser.image !== image) updatedData.image = image;

      //if any data was updated
      if (Object.keys(updatedData).length > 0) {
        console.log(
          'At least one of email or image did not match. Now updating User: ',
          `name: ${name}, image: ${image}`
        );
        await User.updateOne(
          { _id: existingUser._id },
          { $set: updatedData }
        ).session(session);
      }
    }

    const existingAccount = await Account.findOne({
      userId: existingUser._id,
      provider: existingUser.provider,
      providerAccountId: existingUser.providerAccountId,
    }).session(session);

    if (!existingAccount) {
      console.log(
        'Account not found. Now creating account: ',
        `userId: ${existingUser._id}, name: ${name}, image: ${image}, provider: ${provider}, providerAccountId: ${providerAccountId}`
      );
      await Account.create(
        [
          {
            userId: existingUser._id,
            name,
            image,
            provider,
            providerAccountId,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    await session.abortTransaction();
    handleError(error, 'api') as APIErrorResponse;
  } finally {
    session.endSession();
  }
}
