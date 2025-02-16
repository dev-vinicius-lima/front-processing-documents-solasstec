import { useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import useDocuments from "@/hooks/useDocuments"
import useDepartments from "@/hooks/useDepartments"
import { IDocument } from "@/types/Document"
import type { FormData } from "@/types/FormData"

const useFormRegisterDocument = (
  onClose: () => void,
  onNewDocument: (newDocument: IDocument) => void
) => {
  const [formData, setFormData] = useState<FormData>({
    type: "",
    title: "",
    description: "",
    file: null as File | null,
    departmentId: "",
    sectorShipping: "",
  })

  const { departments } = useDepartments()
  const { refetch } = useDocuments()

  useEffect(() => {
    const department = departments.find(
      (d) => d.id === Number(formData.departmentId)
    )
    if (department) {
      setFormData((prev) => ({
        ...prev,
        sectorShipping: department.acronym,
      }))
    }
  }, [formData.departmentId, departments])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, file }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const department = departments.find(
      (d) => d.id === Number(formData.departmentId)
    )
    const updatedSectorShipping = department ? department.acronym : ""

    const { type, title, description, file, departmentId } = formData

    if (!type || !title || !description) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Preencha todos os campos.",
        className: "bg-red-500 text-white",
      })
      return
    }

    const formPayload = new FormData()
    formPayload.append("type", type)
    formPayload.append("title", title)
    formPayload.append("description", description)
    formPayload.append("departmentId", String(Number(departmentId)))
    formPayload.append("sectorShipping", updatedSectorShipping)
    if (file && file.type === "application/pdf") {
      formPayload.append("pdfFile", file)
    } else {
      toast({
        title: "Erro ao enviar formulário",
        description: "Selecione um arquivo PDF.",
        className: "bg-red-500 text-white",
      })
      return
    }

    try {
      const response = await fetch("http://localhost:3333/documents", {
        method: "POST",
        body: formPayload,
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(`Erro ao enviar formulário: ${errorResponse.message}`)
      }

      const newDocument = await response.json()
      toast({
        title: "Sucesso!",
        description: "Documento cadastrado com sucesso.",
        duration: 3000,
      })
      onNewDocument(newDocument)

      await refetch()
      onClose()
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description:
          error instanceof Error ? error.message : "Erro desconhecido.",
        className: "bg-red-500 text-white",
      })
    }
  }

  return {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    departments,
  }
}

export default useFormRegisterDocument
