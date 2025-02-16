"use client"
import { useEffect, useState } from "react"
import { Paperclip, X } from "lucide-react"
import { IDocument } from "@/types/Document"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import useDepartments from "@/hooks/useDepartments"
import { toast } from "@/hooks/use-toast"

interface SendDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  document: IDocument
}

const SendDocumentModal = ({
  isOpen,
  onClose,
  document: documentCreate,
}: SendDocumentModalProps) => {
  const [sectorShipping, setSectorShipping] = useState(
    documentCreate.sectorShipping || ""
  )
  const { departments } = useDepartments()
  const [receivingSector, setReceivingSector] = useState("")
  const [description, setDescription] = useState(documentCreate.description)
  const [attachment, setAttachment] = useState<File | null>(null)

  useEffect(() => {
    setSectorShipping(documentCreate.sectorShipping || "")
    if (documentCreate.file) {
      setAttachment(null)
      setDescription(documentCreate.description)
    }
  }, [
    documentCreate.description,
    documentCreate.file,
    documentCreate.sectorShipping,
  ])

  const handleSubmit = async () => {
    if (!receivingSector) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o setor de recebimento",
        className: "bg-red-500 text-white",
      })
      return
    }

    console.log("Payload enviado:", {
      documentId: documentCreate.id,
      receivingDepartmentId: Number(receivingSector),
    })
    try {
      const response = await fetch("http://localhost:3333/documents/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documentId: Number(documentCreate.id),
          receivingDepartmentId: Number(receivingSector),
        }),
      })

      if (!response.ok) {
        const erroData = await response.json()
        toast({
          title: "Erro",
          description: erroData.message,
          className: "bg-red-500 text-white",
        })
      }

      toast({
        title: "Sucesso",
        description: `Documento enviado para o setor ${
          departments.find((dept) => dept.id.toString() === receivingSector)
            ?.acronym
        } com sucesso.`,
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      console.error("Erro:", error)
    }

    onClose()
  }

  const getLocalDateTime = () => {
    const now = new Date()
    const offset = now.getTimezoneOffset()
    const localDateTime = new Date(now.getTime() - offset * 60 * 1000)
    return localDateTime.toISOString().slice(0, 16)
  }

  if (!isOpen) return

  return (
    <div className={"bg-black bg-opacity-70 fixed inset-0 z-40 shadow"}>
      <div className="p-6 w-[65%] h-[85%] bg-white rounded-lg shadow-md flex flex-col justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50]">
        <div className="flex flex-col w-full h-full gap-4">
          <div className="flex justify-between w-full">
            <h2 className="text-2xl font-bold">Tramitação de documento</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
          <div className="flex mb-4 w-full gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Setor de Envio
              </label>
              <Input
                type="text"
                value={sectorShipping}
                className="w-full"
                readOnly
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Setor de Recebimento
              </label>
              <Select onValueChange={(value) => setReceivingSector(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={"Selecione um setor"} />
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem
                        key={department.id}
                        value={department.id.toString()}
                      >
                        {department.acronym}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Nº Documento
              </label>
              <Input
                type="text"
                value={documentCreate.id.toString()}
                className="w-full"
                readOnly
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input
                type="text"
                value={documentCreate.title}
                className="w-full"
                readOnly
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Tipo de Documento
              </label>
              <Input
                type="text"
                value={documentCreate.type}
                className="w-full"
                readOnly
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-medium mb-1">
                Data e Hora de Envio
              </label>
              <Input
                type="datetime-local"
                className="w-full bg-gray-100"
                value={getLocalDateTime()}
                readOnly
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-medium mb-1">
                Enviado por
              </label>
              <Input
                type="text"
                value="João da Silva"
                className="w-full"
                readOnly
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Anexo</label>
            <div className="flex items-center">
              <Paperclip className="mr-2" />
              <Input
                type="file"
                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                className="absolute opacity-0 bg-black cursor-pointer"
                onClick={() => document.querySelector('input[type="file"]')}
              />
              {attachment ? (
                <span className="text-sm">{attachment.name}</span>
              ) : (
                documentCreate.file && (
                  <span className="text-sm">{documentCreate.file}</span>
                )
              )}
            </div>
          </div>
          {/* Ações */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-1/6 text-red-600"
            >
              CANCELAR
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-800 w-1/6"
            >
              ENVIAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendDocumentModal
