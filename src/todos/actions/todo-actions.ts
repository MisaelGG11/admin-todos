'use server';

import prisma from '@/lib/prisma';
import { Todo } from '@/generated/prisma';
import { revalidatePath } from 'next/cache';


export const sleep = async( seconds: number = 0 ) => {

  return new Promise( resolve => {
    setTimeout(() => {
      resolve(true);
    },  seconds * 1000 );
  });

}

export const toggleTodo = async( id: string, completed: boolean ): Promise<Todo> => {
  
  await sleep(5);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if ( !todo ) {
    throw `Todo con id ${ id } no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed }
  });

  revalidatePath('/dashboard/server-todos');
  return updatedTodo;

}


export const addTodo = async( todoData: {
  title: string;
  description?: string;
  dueDate?: Date;
}) => {
  
  try {

    const todo = await prisma.todo.create({ data: todoData })
    revalidatePath('/dashboard/server-todos');
    
    return todo;
    
  } catch (error) {
    return {
      message: 'Error creando todo'
    }
  }

}


export const deleteCompleted = async():Promise<void> => {

  await prisma.todo.deleteMany({ where: { completed: true } });
  revalidatePath('/dashboard/server-todos');
  
}