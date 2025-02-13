"use client"
import { IDocument } from "@/types/Document"
import { useEffect, useState } from "react"

const useDocuments = () => {
  const [documents, setDocuments] = useState<IDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:3333/documents")
        if (!response.ok) {
          throw new Error("Erro ao buscar documentos")
        }
        const data = await response.json()
        console.log(data)
        setDocuments(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Unknown error")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  return { documents, loading, error }
}

export default useDocuments
