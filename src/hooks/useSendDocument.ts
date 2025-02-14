import { IDocument } from "@/types/Document"
import { useEffect, useState } from "react"

const useSendDocument = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>(
    null
  )

  const sendDocument = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/documents/${selectedDocument?.id}`,
        {
          method: "POST",
        }
      )
      if (!response.ok) {
        throw new Error("Erro ao buscar documentos")
      }
      const data = await response.json()
      console.log("Documentos recebidos:", data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (selectedDocument) {
      setIsModalOpen(true)
    } else {
      setIsModalOpen(false)
    }
  }, [selectedDocument])

  return {
    isModalOpen,
    setIsModalOpen,
    selectedDocument,
    setSelectedDocument,
    sendDocument,
  }
}

export default useSendDocument
