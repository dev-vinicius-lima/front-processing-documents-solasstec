"use client"
import React, { useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FileInputComponent from "./FileInput"
import { Button } from "../ui/button"
import { toast } from "@/hooks/use-toast"
import useDocuments from "@/hooks/useDocuments"

interface FormRegisterDocumentProps {
  onClose: () => void
}

const FormRegisterDocument: React.FC<FormRegisterDocumentProps> = ({
  onClose,
}) => {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    file: null as File | null,
  })
  const { refetch } = useDocuments()

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

    const { type, title, description, file } = formData

    if (!type || !title || !description) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Preencha todos os campos.",
        className: "bg-red-500 text-white",
      })
      return
    }

    toast({
      title: "Enviando formulário...",
      description: "Por favor, aguarde.",
    })

    const formPayload = new FormData()
    formPayload.append("type", type)
    formPayload.append("title", title)
    formPayload.append("description", description)
    if (file?.name && file.type === "application/pdf") {
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
        throw new Error("Erro ao enviar o formulário.")
      }

      toast({
        title: "Sucesso!",
        description: "Documento cadastrado com sucesso.",
        duration: 3000,
      })
      await refetch()
      if (typeof onClose === "function") {
        onClose()
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Ocorreu um erro ao enviar o formulário. " + error,
        className: "bg-red-500 text-white",
      })
    }
  }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4 w-70% bg-slate-100 gap-4 shadow">
          <div className="flex justify-between gap-4">
            <Input
              type="text"
              placeholder="Tipo Documento"
              name="type"
              className="h-10"
              value={formData.type}
              onChange={handleChange}
            />
            <div className="flex w-1/2 bg-slate-100 h-10">
              <select
                className="w-full px-4 outline-none"
                name="format"
                onChange={handleChange}
              >
                <option className="bg-slate-100 w-full" disabled>
                  Formato do Documento
                </option>
                <option
                  className="bg-slate-100 w-full text-blue-800"
                  value="pdfFile"
                >
                  PDF
                </option>
              </select>
            </div>
          </div>
          <Input
            type="text"
            placeholder="Título"
            className="h-10"
            name="title"
            onChange={handleChange}
            value={formData.title}
          />
          <Textarea
            placeholder="Descrição"
            className="h-28"
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <FileInputComponent onFileChange={handleFileChange} />
        <div className="flex justify-end mt-28 gap-4">
          <Button
            className="border border-cyan-600 bg-white w-1/4 h-10 hover:bg-cyan-800 text-slate-800"
            onClick={() => {
              if (confirm("Tem certeza que deseja cancelar?")) {
                onClose()
              }
            }}
          >
            <p className="font-bold">CANCELAR</p>
          </Button>
          <Button
            type="submit"
            className="bg-cyan-600 w-1/4 h-10 hover:bg-cyan-800"
          >
            <p className="text-white font-bold">CADASTRAR</p>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FormRegisterDocument
