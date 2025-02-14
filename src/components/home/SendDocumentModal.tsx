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

interface SendDocumentModalProps {
  isOpen: boolean
  onClose: () => void
  document: IDocument
}

const SendDocumentModal = ({
  isOpen,
  onClose,
  document,
}: SendDocumentModalProps) => {
  const [sectorShipping, setSectorShipping] = useState(
    document.sectorShipping || ""
  )
  const [receivingSector, setReceivingSector] = useState("")
  const [description, setDescription] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)

  useEffect(() => {
    setSectorShipping(document.sectorShipping || "")
  }, [document.sectorShipping])

  const handleSubmit = () => {
    console.log("Documento enviado:", {
      sectorShipping,
      receivingSector,
      description,
      attachment,
    })

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
            <h2 className="text-2xl font-bold">Tramiação de documento</h2>
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
                  <SelectValue placeholder={receivingSector} />
                  <SelectContent>
                    <SelectItem value="setor1">Setor 1</SelectItem>
                    <SelectItem value="setor2">Setor 2</SelectItem>
                    <SelectItem value="setor3">Setor 3</SelectItem>
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
                value={document.id.toString()}
                className="w-full"
                readOnly
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Título</label>
              <Input
                type="text"
                value={document.title}
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
                value={document.type}
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
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setAttachment(e.target.files[0])
                  }
                }}
                className="w-full"
              />
            </div>
          </div>
          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} variant="outline">
              CANCELAR
            </Button>
            <Button onClick={handleSubmit}>ENVIAR</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendDocumentModal
