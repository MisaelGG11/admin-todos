"use client"

import type React from "react"

import { useState } from "react"
import { IoCalendarOutline, IoDocumentTextOutline, IoTextOutline } from "react-icons/io5"

interface CreateTaskModalFormProps {
  onSubmit: (taskData: {
    title: string
    description?: string
    dueDate?: Date
  }) => void
  onCancel: () => void
}

export default function CreateTaskModalForm({ onSubmit, onCancel }: CreateTaskModalFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido"
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "El título debe tener al menos 3 caracteres"
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (selectedDate < today) {
        newErrors.dueDate = "La fecha de vencimiento no puede ser anterior a hoy"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      }

      console.log("Datos de la tarea:", taskData)
      await onSubmit(taskData)

      // Resetear formulario después del envío exitoso
      setFormData({
        title: "",
        description: "",
        dueDate: "",
      })
      setErrors({})
    } catch (error) {
      console.error("Error al crear la tarea:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Campo Título */}
      <div>
        <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <IoTextOutline className="w-4 h-4" />
          Título *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${errors.title ? "border-red-300 bg-red-50" : "border-gray-300"}
          `}
          placeholder="Ingresa el título de la tarea"
          maxLength={100}
          autoFocus
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        <p className="mt-1 text-xs text-gray-500">{formData.title.length}/100 caracteres</p>
      </div>

      {/* Campo Descripción */}
      <div>
        <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <IoDocumentTextOutline className="w-4 h-4" />
          Descripción
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={4}
          className="
            w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            resize-vertical
          "
          placeholder="Describe los detalles de la tarea (opcional)"
          maxLength={500}
        />
        <p className="mt-1 text-xs text-gray-500">{formData.description.length}/500 caracteres</p>
      </div>

      {/* Campo Fecha de Vencimiento */}
      <div>
        <label htmlFor="dueDate" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <IoCalendarOutline className="w-4 h-4" />
          Fecha de Vencimiento
        </label>
        <input
          type="datetime-local"
          id="dueDate"
          value={formData.dueDate}
          onChange={(e) => handleInputChange("dueDate", e.target.value)}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm transition-colors
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${errors.dueDate ? "border-red-300 bg-red-50" : "border-gray-300"}
          `}
          min={new Date().toISOString().slice(0, 16)}
        />
        {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
        <p className="mt-1 text-xs text-gray-500">Opcional - Deja vacío si no tiene fecha límite</p>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            flex-1 bg-blue-600 text-white py-2 px-4 rounded-md font-medium
            hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          {isSubmitting ? "Creando..." : "Crear Tarea"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="
            px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium
            hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
          "
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
