// hooks/useReceiveDocument.ts
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

const useReceiveDocument = () => {
  const [loading, setLoading] = useState(false)

  const receiveDocument = async (documentId: number) => {
    setLoading(true)
    try {
      const response = await fetch("http://localhost:3333/documents/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ documentId }),
      })

      if (!response.ok) {
        throw new Error("Erro ao receber o documento")
      }

      toast({
        title: "Documento recebido com sucesso",
        description: "O documento foi recebido com sucesso.",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error("Erro ao receber documento:", error)
      toast({
        title: "Erro",
        description: "Não foi possível receber o documento.",
        className: "bg-red-500 text-white",
      })
    } finally {
      setLoading(false)
    }
  }

  return { receiveDocument, loading }
}

export default useReceiveDocument
