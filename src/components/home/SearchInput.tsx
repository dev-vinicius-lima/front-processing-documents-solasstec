"use client"
import { Input } from "../ui/input"
import { Edit, Paperclip, Search, Trash } from "lucide-react"
import useDocuments from "@/hooks/useDocuments"
import { IDocument } from "@/types/Document"
import usePagination from "@/hooks/usePagination"

const InputWithIcon = ({
  type,
  placeholder,
  className,
}: {
  type: string
  placeholder: string
  className: string
}) => {
  return (
    <div className="flex items-center border border-slate-300 rounded-md shadow-sm">
      <Search className="ml-2 text-gray-500" />
      <Input
        type={type}
        placeholder={placeholder}
        className={`w-full h-10 px-2 outline-none ${className}`}
      />
    </div>
  )
}

const TableWithInputs = () => {
  const { documents, loading, error } = useDocuments()
  const { currentData, currentPage, totalPages, nextPage, prevPage } =
    usePagination(documents, 5)

  const headers = [
    "Nº Documento",
    "Título",
    "Setor Envio",
    "Data Hora - Envio",
    "Setor Recebimento",
    "Data Hora - Recebimento",
    "Anexo",
    "Ações",
  ]

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
                />
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item: IDocument) => (
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
                <Edit className="cursor-pointer text-blue-500" />
                <Trash className="cursor-pointer text-red-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          disabled={currentPage === totalPages}
          className="bg-cyan-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </>
  )
}

export default TableWithInputs
