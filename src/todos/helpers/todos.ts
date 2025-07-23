import { Todo } from "@/generated/prisma";

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const updateTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  // TODO:
  // await sleep(2);

  const body = { completed };

  const todo = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log({ todo });

  return todo;
};

export const createTodo = async (todoData: {
  title: string;
  description?: string;
  dueDate?: Date;
}): Promise<Todo> => {
  const body = todoData;

  const todo = await fetch("/api/todos", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log({ todo });

  return todo;
};

export const deleteCompletedTodos = async (): Promise<boolean> => {
  await fetch("/api/todos", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  return true;
};
