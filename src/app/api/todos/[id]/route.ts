import prisma from "@/lib/prisma";
import { Todo } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server"

import * as yup from "yup";

interface Segments{
  params: {
    id: string
  }
}

const parametersSchema = yup.object({
  id: yup.string().required().uuid("Invalid ID format"),
});


const getTodo = async( id: string ):Promise<Todo | null> => {

  const { id: validatedId } = await parametersSchema.validate({ id });

  const todo = await prisma.todo.findFirst({ where: { id: validatedId } });

  return todo;
}

export async function GET(request: NextRequest, segments: Segments) {

  const { id } = segments.params;

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

const putSchema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
  dueDate: yup.date().optional(),
}).strict(true).noUnknown();

export async function PUT(request: NextRequest, segments: Segments) {
  const { id } = segments.params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { error: `Todo with ID ${id} not found` },
      { status: 404 }
    );
  }

  const data = await putSchema.validate(await request.json(), {
    strict: true,
    stripUnknown: true,
  });

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data,
  });

  return NextResponse.json(updatedTodo);
}