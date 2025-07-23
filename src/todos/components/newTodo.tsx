"use client";

import { useState } from "react";
import CreateTaskForm from "./createTodoForm";
import { IoAddOutline, IoTrashBinOutline } from "react-icons/io5";
import * as todosApi from '@/todos/helpers/todos';
import Modal from "./Modal";
import { useRouter } from "next/navigation";

interface Todo {
  title: string;
  description?: string;
  dueDate?: Date;
}

export default function NewTodo() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleCreateTask = async (taskData: {
    title: string;
    description?: string;
    dueDate?: Date;
  }) => {
    // Simular creación de tarea (aquí conectarías con tu API/base de datos)
    const newTodo: Todo = {
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
    };

    await todosApi.createTodo(newTodo);
    setShowModal(false);
    router.refresh();
  };

  const handleDeleteCompletedTasks = async () => {
    await todosApi.deleteCompletedTodos();
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {!showModal && (
        <button
          onClick={() => setShowModal(true)}
          className="
            flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md font-medium
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                transition-colors duration-200
              "
        >
          <IoAddOutline className="w-5 h-5" />
          Nueva Tarea
        </button>
      )}

      <button
        onClick={handleDeleteCompletedTasks}
        className="
          flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-md font-medium
              hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2
              transition-colors duration-200
            "
      >
        <IoTrashBinOutline className="w-5 h-5" />
        Eliminar Completados
      </button>

      {/* Formulario de creación */}
      {showModal && (
        <div className="mb-8">
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Crear Nueva Tarea">
            <CreateTaskForm
              onSubmit={handleCreateTask}
              onCancel={() => setShowModal(false)}
            />
          </Modal>
        </div>
      )}
    </div>
  );
}
