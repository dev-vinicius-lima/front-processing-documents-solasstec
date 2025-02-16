"use client"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FileInputComponent from "./FileInput"
import { Button } from "../ui/button"
import { IDocument } from "@/types/Document"
import useFormRegisterDocument from "@/hooks/useCreateDocument"

interface FormRegisterDocumentProps {
  onClose: () => void
  onNewDocument: (newDocument: IDocument) => void
}

const FormRegisterDocument: React.FC<FormRegisterDocumentProps> = ({
  onClose,
  onNewDocument,
}) => {
  const {
    formData,
    handleChange,
    handleFileChange,
    handleSubmit,
    departments,
  } = useFormRegisterDocument(onClose, onNewDocument)

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="flex flex-col mb-4 w-70% bg-slate-100 gap-4 shadow">
        <div className="flex justify-between gap-4">
          <Input
            type="text"
            placeholder="Tipo Documento"
            name="type"
            className="h-10"
            value={formData.type}
            onChange={handleChange}
          />
          <div className="flex w-1/2 bg-slate-100 h-10">
            <select
              className="bg-slate-100 w-full text-blue-800"
              name="departmentId"
              onChange={handleChange}
              value={formData.departmentId}
            >
              <option value="">Selecione seu setor</option>
              {departments.map((department) => (
                <option
                  className="bg-slate-100 w-full text-blue-800"
                  key={department.id}
                  value={department.id}
                >
                  {department.acronym}
                </option>
              ))}
            </select>
          </div>
          <div className="flex w-1/2 bg-slate-100 h-10">
            <select
              className="w-full px-4 outline-none"
              name="format"
              onChange={handleChange}
            >
              <option className="bg-slate-100 w-full" disabled>
                Formato do Documento
              </option>
              <option
                className="bg-slate-100 w-full text-blue-800"
                value="pdfFile"
              >
                PDF
              </option>
            </select>
          </div>
        </div>
        <Input
          type="text"
          placeholder="Título"
          className="h-10"
          name="title"
          onChange={handleChange}
          value={formData.title}
        />
        <Textarea
          placeholder="Descrição"
          className="h-28"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </div>
      <FileInputComponent onFileChange={handleFileChange} />
      <div className="flex justify-end mt-28 gap-4 mb-10">
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
        <Button
          type="submit"
          className="bg-cyan-600 w-1/4 h-10 hover:bg-cyan-800"
        >
          <p className="text-white font-bold">CADASTRAR</p>
        </Button>
      </div>
    </form>
  )
}

export default FormRegisterDocument
