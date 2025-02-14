"use client"
import { Input } from "../ui/input"
import { Edit, FileDown, FileUp, Paperclip, Search, Trash } from "lucide-react"
import useDocuments from "@/hooks/useDocuments"
import { IDocument } from "@/types/Document"
import usePagination from "@/hooks/usePagination"
import useSearch from "@/hooks/useSearch"
import { useDocumentDeletion } from "@/hooks/useDocumentDeletion"
import { toast } from "@/hooks/use-toast"
import { useState } from "react"
import SendDocumentModal from "./SendDocumentModal"

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

const TableWithInputs = () => {
  const { documents, loading, error, setDocuments } = useDocuments()
  const { currentPage, totalPages, nextPage, prevPage } = usePagination(
    documents,
    5
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<IDocument | null>()
  const { deleteDocument } = useDocumentDeletion()
  const { refetch } = useDocuments()

  const handleSendClick = (document: IDocument) => {
    setSelectedDocument(document)
    setIsModalOpen(true)
  }
  const handleDelete = async (documentId: number) => {
    try {
      await deleteDocument(String(documentId))
      setDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.id !== documentId)
      )

      await refetch()

      if (filteredData.length === 1 && currentPage > 1) {
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
    <>
      <table className="min-w-full w-full mt-6 mb-2 shadow-md border border-slate-200 rounded-lg overflow-hidden text-sm">
        <thead className="bg-slate-100">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="text-slate-600 border border-slate-200 p-3 text-left"
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
            <td colSpan={10} className="text-center p-4">
              Nenhum documento encontrado...
            </td>
          )}
          {currentDocuments.map((item: IDocument) => (
            <tr key={item.id}>
              <td className="border border-slate-200 p-2">{item.id}</td>
              <td className="border border-slate-200 p-2">{item.title}</td>
              <td className="border border-slate-200 p-2">
                {item.sectorShipping}
              </td>
              <td className="border border-slate-200 p-2">
                {item.dateTimeSubmission}
              </td>
              <td className="border border-slate-200 p-2">
                {item.ReceivingSector}
              </td>
              <td className="border border-slate-200 p-2">
                {item.dateTimeReceived}
              </td>
              <td className="border border-slate-200 p-2">
                <Paperclip
                  size={30}
                  strokeWidth={1}
                  className="cursor-pointer mx-auto"
                />
              </td>

              <td className="flex items-center justify-center gap-4 border border-slate-200 p-2">
                <FileDown color="#01f9c7" className="cursor-pointer" />
                <FileUp
                  color="#05f901"
                  className="cursor-pointer"
                  onClick={() => handleSendClick(item)}
                />
                <Edit className="cursor-pointer text-blue-500" />
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

      <div className="flex justify-between mt-4">
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
    </>
  )
}

export default TableWithInputs
