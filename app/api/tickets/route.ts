import tickets from '@/app/database';
import logger from '@/lib/logger';
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';

// route: get all - /api/tickets
export async function GET() {
  logger.info('Get Tickets Called');
  return NextResponse.json(tickets);
}

// route: add new - /api/tickets
export async function POST(request: Request) {
  const ticket = await request.json();
  console.log(ticket);

  tickets.push({ id: tickets.length + 1, ...ticket });

  return NextResponse.json(tickets);
}
