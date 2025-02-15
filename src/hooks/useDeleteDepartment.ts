import { useState } from "react"

export const useDeleteDepartment = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteDepartment = async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3333/departments/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao deletar departamento")
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

  return { deleteDepartment, loading, error }
}
