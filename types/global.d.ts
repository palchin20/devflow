import { NextResponse } from 'next/server';

interface Question {
  _id: string;
  title: string;
  description: string;
  author: Author;
  createdAt: Date;
  tags: Tag[];
  upvotes: number;
  answers: number;
  views: number;
}

interface Author {
  _id: string;
  name: string;
  avatar: string;
}

interface Tag {
  _id: string;
  name: string;
}

interface FetchOptions extends RequestInit {
  timeout?: number;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };

type ErrorResponse = ActionResponse<T> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;

type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;
