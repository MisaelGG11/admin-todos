import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import * as yup from "yup";

export async function GET(request: NextRequest) {
  // Set pagination parameters
  const url = new URL(request.url);

  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "10", 10);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
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

const postSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().optional(),
  completed: yup.boolean().optional().default(false),
  dueDate: yup.string().datetime().optional(),
}).strict(true).noUnknown();

export async function POST(request: NextRequest) {
  try {
    const data =
      await postSchema.validate(await request.json(), {
        
      });

    console.log(data);

    const newTodo = await prisma.todo.create({
      data,
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ error }, { status: 400 });
    }
  }
}

export async function DELETE() {
  try {
    const deletedCount = await prisma.todo.deleteMany({
      where: { completed: true },
    });

    return NextResponse.json(
      { message: `${deletedCount.count} completed todos deleted` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
