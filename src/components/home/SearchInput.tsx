import React from "react"
import { Input } from "../ui/input"
import { Edit, Search, Trash } from "lucide-react"

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

  const data = [
    {
      numero: "001",
      titulo: "Documento 1",
      setorEnvio: "Setor A",
      dataHoraEnvio: "2023-10-01 10:00",
      setorRecebimento: "Setor B",
      dataHoraRecebimento: "2023-10-01 10:30",
      anexo: "anexo1.pdf",
      acoes: "Visualizar",
    },
    {
      numero: "002",
      titulo: "Documento 2",
      setorEnvio: "Setor C",
      dataHoraEnvio: "2023-10-02 11:00",
      setorRecebimento: "Setor D",
      dataHoraRecebimento: "2023-10-02 11:30",
      anexo: "anexo2.pdf",
      acoes: "Visualizar",
    },
  ]

  return (
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
        {data.map((item) => (
          <tr key={item.numero}>
            <td className="border border-slate-200 p-2">{item.numero}</td>
            <td className="border border-slate-200 p-2">{item.titulo}</td>
            <td className="border border-slate-200 p-2">{item.setorEnvio}</td>
            <td className="border border-slate-200 p-2">
              {item.dataHoraEnvio}
            </td>
            <td className="border border-slate-200 p-2">
              {item.setorRecebimento}
            </td>
            <td className="border border-slate-200 p-2">
              {item.dataHoraRecebimento}
            </td>
            <td className="border border-slate-200 p-2">{item.anexo}</td>

            <td className="flex items-center justify-center gap-4 border border-slate-200 p-2">
              <Edit className="cursor-pointer text-blue-500" />
              <Trash className="cursor-pointer text-red-500" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableWithInputs
