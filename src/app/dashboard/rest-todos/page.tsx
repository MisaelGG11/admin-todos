import { TodosGrid } from "@/todos/components/TodosGrid";
import prisma from "@/lib/prisma";
import NewTodo from "@/todos/components/newTodo";

export const dynamic = "force-dynamic"; // Force dynamic rendering for server actions
export const revalidate = 0; // Disable revalidation for this page

export const metadata = {
  title: "REST Todos",
  description: "Page to display REST Todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { title: "asc" } });
  return (
    <div className="px-6 pt-6">
      <div className="flex justify-between flex-wrap mb-4">
        <h1 className="text-2xl font-bold">REST Todos</h1>

        <NewTodo />

      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}
