import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  // Set pagination parameters
  const url = new URL(request.url);
  
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);

  if ( isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return NextResponse.json(
      { error: "Invalid pagination parameters" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  const totalCount = await prisma.todo.count();
  const totalPages = Math.ceil(totalCount / limit);

  const response = {
    data: todos,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages,
    },
  };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const { title, completed } = await request.json();
  
  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const newTodo = await prisma.todo.create({
    data: { title, completed: completed || false, userId: 'hola' },
  });

  return NextResponse.json(newTodo, { status: 201 });
}