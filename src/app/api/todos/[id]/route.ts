import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server"

interface Segments{
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, segments: Segments) {

  const { id } = segments.params
  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }

  const todo = await prisma.todo.findUnique({
    where: { id },
  });

  if (!todo) {
    return NextResponse.json(
      { error: `Todo with ID ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
} 

export async function PUT(request: NextRequest, segments: Segments) {
  const { id } = segments.params;
  const { title, completed } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "ID is required" },
      { status: 400 }
    );
  }

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { title, completed },
  });

  return NextResponse.json(updatedTodo);
}