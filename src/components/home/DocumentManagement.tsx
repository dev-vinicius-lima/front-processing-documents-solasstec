import React from "react"
import TableWithInputs from "./SearchInput"
import ButtonRegisterDocuments from "./ButtonRegisterDocuments"

const Main = () => {
  return (
    <div className="w-[98%] h-[95%] bg-white mx-auto rounded shadow-sm">
      <div className="flex flex-col px-3">
        <h1 className="text-xl mt-7 font-bold">GERENCIAMENTO DE DOCUMENTOS</h1>
        <div className="bg-slate-200 w-[60%] mt-4">
          <h2 className="text-lg p-3 text-cyan-600">Documentos</h2>
        </div>
        <ButtonRegisterDocuments />
        <TableWithInputs />
      </div>
    </div>
  )
}

export default Main
