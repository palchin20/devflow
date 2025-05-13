'use server';
import { ActionResponse, ErrorResponse } from '@/types/global';
import action from '../handlers/actions';
import { SignInSchema, SignUpSchema } from '../validations';
import handleError from '../handlers/error';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User, { IUserDoc } from '@/database/user.model';
import Account from '@/database/account.model';
import { signIn } from '@/auth';
import logger from '../logger';
import { error } from 'console';
import { NotFoundError, UnauthorizedError } from '../http-error';

export async function signUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignUpSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { name, username, email, password } = validationResult.params!;

  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(dbSession);
    if (existingUser) throw new Error('User with this email already exists.');

    const existingUsername = await User.findOne({ username }).session(
      dbSession
    );
    if (existingUsername) throw new Error('This username is already taken.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await User.create([{ username, name, email }], {
      dbSession,
    });
    const newAccount = await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: 'credentials',
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { dbSession }
    );

    await dbSession.commitTransaction();

    await signIn('credentials', { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    console.log('Error in signUpWithCredentials: ', error);
    await dbSession.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    dbSession.endSession();
  }
}

export async function signInWithCredentials(
  params: Pick<AuthCredentials, 'email' | 'password'>
): Promise<ActionResponse> {
  const validationResult = await action({ params, schema: SignInSchema });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { email, password } = validationResult.params!;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new NotFoundError('User');

    const existingAccount = await Account.findOne({
      provider: 'credentials',
      providerAccountId: email,
    });

    if (!existingAccount) throw new NotFoundError('Account');

    const passwordMatched = await bcrypt.compare(
      password,
      existingAccount.password
    );

    if (!passwordMatched) throw new Error('Passwords do not match.');

    await signIn('credentials', { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    console.log('Error in signUpWithCredentials: ', error);
    return handleError(error) as ErrorResponse;
  } finally {
  }
}
