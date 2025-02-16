"use client"
import TableWithInputs from "./SearchInput"
import ButtonRegisterDocuments from "./ButtonRegisterDocuments"
import { IDocument } from "@/types/Document"
import useDocuments from "@/hooks/useDocuments"

const Main = () => {
  const { documents, loading, error, setDocuments } = useDocuments()

  const handleNewDocument = (newDocument: IDocument) => {
    setDocuments((prevDocuments) => [...prevDocuments, newDocument])
  }

  if (loading) return <div>Carregando...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="w-[98%] h-auto bg-white mx-auto rounded shadow-sm">
      <div className="flex flex-col px-3">
        <h1 className="text-xl mt-4 font-bold">GERENCIAMENTO DE DOCUMENTOS</h1>
        <div className="bg-slate-200 w-[60%] mt-4">
          <h2 className="text-lg p-2 text-cyan-600">Documentos</h2>
        </div>
        <ButtonRegisterDocuments onNewDocument={handleNewDocument} />
        <TableWithInputs documents={documents} setDocuments={setDocuments} />
      </div>
    </div>
  )
}

export default Main
