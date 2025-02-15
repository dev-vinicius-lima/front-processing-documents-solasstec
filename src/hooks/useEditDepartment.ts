import { useState } from "react"

export const useEditDepartment = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editDepartment = async (
    id: number,
    updatedData: { acronym: string; description: string }
  ) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3333/departments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      })

      if (!response.ok) {
        throw new Error("Erro ao editar departamento")
      }

      return await response.json()
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

  return { editDepartment, loading, error }
}
