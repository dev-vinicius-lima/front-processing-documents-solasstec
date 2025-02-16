import { useState } from "react"

interface UseDocumentDeletion {
  loading: boolean
  error: string | null
  deleteDocument: (documentId: string) => Promise<void>
}

export function useDocumentDeletion(): UseDocumentDeletion {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function deleteDocument(documentId: string): Promise<void> {
    setLoading(true)
    setError(null)

    try {
      await fetch(`http://localhost:3333/documents/${documentId}`, {
        method: "DELETE",
      })
      await new Promise((resolve) => setTimeout(resolve, 100))
    } catch (err) {
      console.error("Erro ao deletar documento:", err)
      setError("Não foi possível deletar o documento")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    deleteDocument,
  }
}
