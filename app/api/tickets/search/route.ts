import tickets from '@/app/database';
import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';

// route: search - /api/search?query=xyz
export async function GET(request: NextRequest) {
  console.log('SearchAPI called.');
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  if (!query) return NextResponse.json(tickets);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.name.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(filteredTickets);
}
