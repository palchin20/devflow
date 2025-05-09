import { z } from 'zod';

export const SignInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please provide a valid email.'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(50, 'Password cannot exceed 50 characters.'),
});

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(30, 'Username cannot exceed 30 characters.')
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores.',
    }),

  name: z
    .string()
    .min(1, 'Name is required.')
    .max(50, 'Name cannot exceed 50 characters.')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces.'),

  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please provide a valid email address.'),

  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(100, 'Password cannot exceed 100 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character.'
    ),
});

export const AskQuestionSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required.')
    .max(100, 'Title cannot exceed 100 characters.'),
  content: z.string().min(1, 'Body is required.'),
  tags: z
    .array(
      z
        .string()
        .min(1, 'Tag is required.')
        .max(30, 'Tag cannot exceed 30 characters.')
    )
    .min(1, 'At least one tag is required.')
    .max(3, 'Cannot add more than 3 tags.'),
});

export const UserSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  username: z.string().min(3, 'User name must be at least 3 characters long.'),
  email: z.string().email('Invalid email address.'),
  bio: z.string().optional(),
  image: z.string().url('Invalid image URL.').optional(),
  geography: z.string().optional(),
  portfolio: z.string().url('Invalid website URL.').optional(),
  reputation: z.number().int('Reputation is an integer').default(0),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, 'UserID is required.'),
  name: z.string().min(3, 'User name must be at least 3 characters long.'),
  image: z.string().email('Invalid image url.').optional(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long.')
    .max(100, 'Password cannot exceed 100 characters.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
      /[^a-zA-Z0-9]/,
      'Password must contain at least one special character.'
    )
    .optional(),
  provider: z.string().min(1, 'Provider name is required.'),
  providerAccountId: z.string().min(1, 'Provider account ID is required.'),
});
