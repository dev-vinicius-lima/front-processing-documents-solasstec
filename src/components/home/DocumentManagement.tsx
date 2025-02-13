import React from "react"
import { Button } from "../ui/button"

import { Plus } from "lucide-react"
import TableWithInputs from "./SearchInput"

const Main = () => {
  return (
    <div className="w-[95%] h-[95%] bg-white mx-auto rounded shadow-sm">
      <div className="flex flex-col px-3">
        <h1 className="text-xl mt-7 font-bold">GERENCIAMENTO DE DOCUMENTOS</h1>
        <div className="bg-slate-200 w-[60%] mt-4">
          <h2 className="text-lg p-3 text-cyan-600">Documentos</h2>
        </div>
        <Button className="mt-4 bg-cyan-600 w-[15%] h-8 hover:bg-cyan-800">
          <Plus size={48} strokeWidth={3} />
          <p className="text-white font-bold">CADASTRAR</p>
        </Button>
        <TableWithInputs />
      </div>
    </div>
  )
}

export default Main
