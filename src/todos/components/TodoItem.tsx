'use client';

import { Todo } from "@/generated/prisma"
import { useState } from "react";
import { IoCalendar, IoTime, IoCheckmarkCircle, IoEllipseOutline } from "react-icons/io5"

interface Props {
  todo: Todo
  toggleTodo: (id: string, complete: boolean) => Promise<Todo|void>
}

export function TodoItem({ todo, toggleTodo }: Props) {
  const [loading, setLoading] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatDateShort = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  const isOverdue = todo.dueDate && !todo.completed && new Date() > todo.dueDate
  const isDueSoon =
    todo.dueDate && !todo.completed && new Date() < todo.dueDate && todo.dueDate.getTime() - new Date().getTime() < 24 * 60 * 60 * 1000 // 24 horas


  const runTask = async (id: string, completed: boolean) => {
    setLoading(true);
    await toggleTodo(id, completed);
    setLoading(false);
  }

  return (
    <div
      className={`
      relative rounded-lg border-2 shadow-sm hover:shadow-md transition-all duration-200 p-6
      ${todo.completed ? "border-green-200 bg-green-50" : "border-gray-200"}
      ${isOverdue ? "border-red-300 bg-red-50" : ""}
      ${isDueSoon ? "border-yellow-300 bg-yellow-50" : ""}
      ${!todo.completed && !isOverdue && !isDueSoon ? "bg-white" : ""}
    `}
    >
      {/* Header con título y estado */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          {
            loading ? (
              <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              todo.completed ? (
                <IoCheckmarkCircle className="w-6 h-6 text-green-600 flex-shrink-0" onClick={() => runTask(todo.id, false)} />
              ) : (
                <IoEllipseOutline className="w-6 h-6 text-gray-400 flex-shrink-0" onClick={() => runTask(todo.id, true)} />
              )
            )
          }
          <h3
            className={`
            text-lg font-semibold leading-tight
            ${todo.completed ? "text-green-800 line-through" : "text-gray-900"}
          `}
          >
            {todo.title}
          </h3>
        </div>

        {/* Badge de estado */}
        <span
          className={`
          px-2 py-1 text-xs font-medium rounded-full
          ${
            todo.completed
              ? "bg-green-100 text-green-800"
              : isOverdue
                ? "bg-red-100 text-red-800"
                : isDueSoon
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
          }
        `}
        >
          {todo.completed ? "Completada" : isOverdue ? "Vencida" : isDueSoon ? "Próxima" : "Pendiente"}
        </span>
      </div>

      {/* Descripción */}
      {todo.description && (
        <p
          className={`
          text-sm mb-4 leading-relaxed
          ${todo.completed ? "text-green-700" : "text-gray-600"}
        `}
        >
          {todo.description}
        </p>
      )}

      {/* Fecha de vencimiento */}
      {todo.dueDate && (
        <div
          className={`
          flex items-center gap-2 mb-4 p-2 rounded-md
          ${isOverdue ? "bg-red-100" : isDueSoon ? "bg-yellow-100" : "bg-gray-100"}
        `}
        >
          <IoCalendar
            className={`
            w-4 h-4
            ${isOverdue ? "text-red-600" : isDueSoon ? "text-yellow-600" : "text-gray-600"}
          `}
          />
          <span
            className={`
            text-sm font-medium
            ${isOverdue ? "text-red-800" : isDueSoon ? "text-yellow-800" : "text-gray-700"}
          `}
          >
            Vence: {formatDateShort(todo.dueDate)}
          </span>
        </div>
      )}

      {/* Footer con metadatos */}
      <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-1">
          <IoTime className="w-3 h-3" />
          <span>Creada: {formatDate(todo.createdAt)}</span>
        </div>
        {todo.updatedAt.getTime() !== todo.createdAt.getTime() && (
          <div className="flex items-center gap-1">
            <span>Actualizada: {formatDate(todo.updatedAt)}</span>
          </div>
        )}
      </div>

      {/* ID para debugging (opcional, se puede quitar en producción) */}
      <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity">
        <span className="text-xs text-gray-400 font-mono bg-gray-100 px-1 py-0.5 rounded">{todo.id.slice(-8)}</span>
      </div>
    </div>
  )
}
