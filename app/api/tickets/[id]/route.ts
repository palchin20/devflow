import tickets from '@/app/database';
import { stat } from 'fs';
import { NextResponse } from 'next/server';

// route: get specific record - /api/tickets/id
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log('GET called with id: ', id);

  const ticket = tickets.find((t) => t.id === parseInt(id));

  return NextResponse.json(ticket);
}

// route: modify specific record - /api/tickets/id
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { name, status, type } = await request.json();

  const ticket = tickets.find((t) => t.id === parseInt(id));

  if (!ticket)
    return NextResponse.json(new Error('Ticket not found.'), { status: 404 });
  else {
    if (name) ticket.name = name;
    if (type) ticket.type = type;
    if (status) ticket.status = status;
  }

  return NextResponse.json(ticket);
}

// route: delete specific record - /api/tickets/id
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const ticketIndex = tickets.findIndex((t) => t.id === parseInt(id));
  if (ticketIndex === -1)
    return NextResponse.json(new Error('Ticket not found.'), { status: 404 });
  else {
    tickets.splice(ticketIndex, 1);
  }
  return NextResponse.json(tickets);
}
