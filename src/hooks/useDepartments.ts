import { useState, useEffect } from "react"

interface Department {
  id: number
  acronym: string
  description: string
}

const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:3333/departments", {
          method: "GET",
        })
        if (!response.ok) {
          throw new Error("Erro ao buscar setores.")
        }
        const data = await response.json()
        setDepartments(data)
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido.")
      } finally {
        setLoading(false)
      }
    }

    fetchDepartments()
  }, [])

  return { departments, loading, error }
}

export default useDepartments
