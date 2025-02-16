"use client"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { Plus, X } from "lucide-react"
import FormRegisterDocument from "./FormRegisterDocument"
import { IDocument } from "@/types/Document"

interface ButtonRegisterDocumentsProps {
  onNewDocument: (newDocument: IDocument) => void
}
const ButtonRegisterDocuments: React.FC<ButtonRegisterDocumentsProps> = ({
  onNewDocument,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => {
    setIsOpenModal(true)
  }

  return (
    <div>
      <Button
        className="mt-4 bg-cyan-600 w-[15%] max-sm:w-[30%] h-8 hover:bg-cyan-800"
        onClick={() => {
          openModal()
        }}
      >
        <Plus size={48} strokeWidth={3} />
        <p className="text-white font-bold">CADASTRAR</p>
      </Button>

      {isOpenModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-1/2 h-[85%] rounded shadow-sm gap-4">
            <div className="flex justify-end p-4 border-b">
              <div className="flex justify-between w-full">
                <h2 className="text-2xl font-bold">Novo documento</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsOpenModal(false)}
                >
                  <X />
                </button>
              </div>
            </div>
            <FormRegisterDocument
              onClose={() => setIsOpenModal(false)}
              onNewDocument={onNewDocument}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ButtonRegisterDocuments
