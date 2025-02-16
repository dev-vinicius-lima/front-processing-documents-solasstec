"use client"
import { Input } from "../ui/input"
import { FileDown, FileUp, Paperclip, Search, Trash } from "lucide-react"
import useDocuments from "@/hooks/useDocuments"
import { IDocument } from "@/types/Document"
import usePagination from "@/hooks/usePagination"
import useSearch from "@/hooks/useSearch"
import { useDocumentDeletion } from "@/hooks/useDocumentDeletion"
import { toast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import SendDocumentModal from "./SendDocumentModal"
import ReceiveDocumentModal from "./ReceiveDocumentModal"
import useDownloadFile from "@/hooks/useDownloadFile"

const InputWithIcon = ({
  type,
  placeholder,
  className,
  onChange,
}: {
  type: string
  placeholder: string
  className: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <div className="flex items-center border border-slate-300 rounded-md shadow-sm">
      <Search className="ml-2 text-gray-500" />
      <Input
        type={type}
        placeholder={placeholder}
        className={`w-full h-10 px-2 outline-none ${className}`}
        onChange={onChange}
      />
    </div>
  )
}

const TableWithInputs = ({
  documents,
  setDocuments,
}: {
  documents: IDocument[]
  setDocuments: React.Dispatch<React.SetStateAction<IDocument[]>>
}) => {
  const { loading, error } = useDocuments()
  const { currentPage, totalPages, nextPage, prevPage } = usePagination(
    documents,
    5
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReceiveModalOpen, setIsReceiveModalOpen] = useState(false)

  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>()
  const { deleteDocument } = useDocumentDeletion()
  const { refetch } = useDocuments()
  const { downloadFile } = useDownloadFile()

  useEffect(() => {
    refetch()
  }, [documents])

  const handleSendClick = async (document: IDocument) => {
    if (document.isSend && !document.isReceived) return

    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.id === document.id
          ? { ...doc, isSend: true, isReceived: false }
          : doc
      )
    )

    setSelectedDocument(document)
    setIsModalOpen(true)
    await refetch()
  }

  const handleReceiveClick = async (document: IDocument) => {
    const currentSector = document.sectorShipping
    if (document.isReceived) {
      toast({
        title: "Erro",
        description: "Este documento já foi recebido.",
        className: "bg-red-500 text-white",
      })
      return
    }
    if (currentSector === document.ReceivingSector) {
      toast({
        title: "Erro",
        description:
          "Você não pode receber um documento que ainda não foi enviado.",
        className: "bg-red-500 text-white",
      })
      return
    }

    if (document.sectorShipping === document.ReceivingSector) {
      toast({
        title: "Erro",
        description: "O setor que enviou o documento não pode recebê-lo.",
        className: "bg-red-500 text-white",
      })
      return
    }

    setDocuments((prevDocuments) =>
      prevDocuments.map((doc) =>
        doc.id === document.id
          ? { ...doc, isReceived: true, isSend: false }
          : doc
      )
    )
    setIsReceiveModalOpen(true)
    setSelectedDocument(document)
  }

  const handleDelete = async (documentId: number) => {
    try {
      await deleteDocument(String(documentId))
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== documentId)
      )
      await refetch()

      if (filteredData.length === 0 && currentPage > 1) {
        prevPage()
      }

      toast({
        title: "Documento deletado com sucesso",
        description: "O documento foi deletado com sucesso.",
        className: "bg-green-500 text-white",
      })
    } catch (err) {
      console.error("Erro ao deletar:", err)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { searchTerms, updateSearchTerm, filteredData } = useSearch(documents)

  const HEADER_TO_FIELD_MAP: Record<string, keyof typeof searchTerms> = {
    "nº documento": "id",
    título: "title",
    "setor envio": "sectorShipping",
    "data hora - envio": "dateTimeSubmission",
    "setor recebimento": "ReceivingSector",
    "data hora - recebimento": "dateTimeReceived",
    Anexo: "Anexo",
    Ações: "Ações",
  }

  const headers = Object.keys(HEADER_TO_FIELD_MAP)
  const currentDocuments = filteredData.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <table className="min-w-full h-auto mt-4 mb-2 shadow-md border border-slate-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="text-slate-600 border border-slate-200 p-2 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
          <tr>
            {headers.map((header) => (
              <td className="border border-slate-200 p-2" key={header}>
                <InputWithIcon
                  type="text"
                  placeholder="Buscar..."
                  className="w-full h-10 px-2 outline-none"
                  onChange={(e) =>
                    updateSearchTerm(
                      HEADER_TO_FIELD_MAP[header.toLowerCase()],
                      e.target.value
                    )
                  }
                />
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {!currentDocuments.length && (
            <tr className="text-center p-4">
              <td colSpan={8}>Nenhum documento encontrado...</td>
            </tr>
          )}
          {currentDocuments.map((item: IDocument) => (
            <tr key={item.id} className="border border-slate-200">
              <td className="border border-slate-200 p-2">{item.id}</td>
              <td className="border border-slate-200 p-2">{item.title}</td>
              <td className="border border-slate-200 p-2">
                {item.sectorShipping}
              </td>
              <td className="border border-slate-200 p-2">
                {item.dateTimeSubmission
                  ? new Date(item.dateTimeSubmission).toLocaleString("pt-BR")
                  : "N/A"}
              </td>
              <td className="border border-slate-200 p-2">
                {item.ReceivingSector}
              </td>
              <td className="border border-slate-200 p-2">
                {item.dateTimeReceived
                  ? new Date(item.dateTimeReceived).toLocaleString("pt-BR")
                  : "N/A"}
              </td>
              <td className="border border-slate-200 p-2">
                <Paperclip
                  size={30}
                  strokeWidth={1}
                  className="cursor-pointer mx-auto"
                  onClick={() => {
                    if (item.file) {
                      downloadFile(item.file)
                    } else {
                      toast({
                        title: "Erro",
                        description: "Não existe arquivo em anexo.",
                        className: "bg-red-500 text-white",
                      })
                    }
                  }}
                />
              </td>

              <td className="flex items-center justify-center gap-4 border border-slate-200 p-2">
                <FileDown
                  className="cursor-pointer text-green-600 hover:text-green-800"
                  onClick={() => {
                    if (
                      item.isSend &&
                      !item.isReceived &&
                      item.sectorShipping !== item.ReceivingSector
                    ) {
                      handleReceiveClick(item)
                    }
                  }}
                  style={{
                    opacity:
                      item.isSend &&
                      !item.isReceived &&
                      item.sectorShipping !== item.ReceivingSector
                        ? 1
                        : 0.5,
                    cursor:
                      item.isSend &&
                      !item.isReceived &&
                      item.sectorShipping !== item.ReceivingSector
                        ? "pointer"
                        : "not-allowed",
                  }}
                />
                <FileUp
                  className="cursor-pointer text-cyan-600 hover:text-cyan-800"
                  onClick={() => {
                    if (!item.isSend || item.isReceived) {
                      handleSendClick(item)
                    }
                  }}
                  style={{
                    opacity: !item.isSend || item.isReceived ? 1 : 0.5,
                    cursor:
                      !item.isSend || item.isReceived
                        ? "pointer"
                        : "not-allowed",
                  }}
                />
                <Trash
                  className="cursor-pointer text-red-500"
                  onClick={() => handleDelete?.(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <SendDocumentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        document={selectedDocument || ({} as IDocument)}
      />

      <ReceiveDocumentModal
        isOpen={isReceiveModalOpen}
        onClose={() => setIsReceiveModalOpen(false)}
        document={selectedDocument || ({} as IDocument)}
        setDocuments={setDocuments}
      />

      <div className="flex justify-between my-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-cyan-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages || !filteredData.length}
          className="bg-cyan-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  )
}

export default TableWithInputs
