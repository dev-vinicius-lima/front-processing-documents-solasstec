// hooks/useCreateDepartment.ts
import { useState } from "react"

interface Department {
  acronym: string
  description: string
}

export const useCreateDepartment = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createDepartment = async (department: Department) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:3333/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(department),
      })

      if (!response.ok) {
        throw new Error("Erro ao criar departamento")
      }

      const data = await response.json()
      return data
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Erro desconhecido")
      }
    } finally {
      setLoading(false)
    }
  }

  return { createDepartment, loading, error }
}
