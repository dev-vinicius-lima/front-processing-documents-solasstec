import React from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FileInputComponent from "./FileInput"
import { Button } from "../ui/button"

interface FormRegisterDocumentProps {
  onClose: () => void
}
const FormRegisterDocument: React.FC<FormRegisterDocumentProps> = ({
  onClose,
}) => {
  return (
    <div className="p-6">
      <form action="">
        <div className="flex flex-col mb-4 w-70% bg-slate-100 gap-4 shadow">
          <div className="flex justify-between gap-4">
            <Input type="text" placeholder="Nº Documento" className="h-10" />
            <div className="flex w-1/2 bg-slate-100 h-10">
              <select className="w-full px-4 outline-none">
                <option className="bg-slate-100 w-full" disabled>
                  Tipo Documento
                </option>
                <option className="bg-slate-100 w-full text-blue-800">
                  PDF
                </option>
              </select>
            </div>
          </div>
          <Input type="text" placeholder="Título" className="h-10" />
          <Textarea placeholder="Descrição" className="h-28" />
        </div>
        <FileInputComponent />
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
          <Button className="bg-cyan-600 w-1/4 h-10 hover:bg-cyan-800">
            <p className="text-white font-bold">CADASTRAR</p>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FormRegisterDocument
