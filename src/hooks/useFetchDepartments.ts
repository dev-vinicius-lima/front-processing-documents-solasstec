import { useEffect, useState, useCallback } from "react"

interface Department {
  id: number
  acronym: string
  description: string
}

export const useFetchDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDepartments = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("http://localhost:3333/departments", {
        method: "GET",
      })
      if (!response.ok) {
        throw new Error("Failed to fetch departments")
      }
      const data = await response.json()
      setDepartments(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  return { departments, loading, error, refetch: fetchDepartments }
}
