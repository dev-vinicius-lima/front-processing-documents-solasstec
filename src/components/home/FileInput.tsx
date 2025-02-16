"use client"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip } from "lucide-react"

interface FileInputProps {
  buttonText?: string
  onFileChange: (file: File | null) => void
}

const FileInputComponent = ({
  buttonText = "Anexo",
  onFileChange,
}: FileInputProps) => {
  const [selectedFile, setSelectedFile] = useState<string>("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    onFileChange(file || null)
    setSelectedFile(file ? file.name : "")
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    fileInputRef.current?.click()
  }

  return (
    <div className="relative w-1/2 bg-slate-100">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        onClick={(e) => e.stopPropagation()}
        className="hidden"
      />

      <Button
        onClick={handleClick}
        variant="outline"
        className="flex items-center gap-2 mt-4 w-1/2 h-10 font-bold"
      >
        {buttonText}
        <Paperclip />
      </Button>

      {selectedFile && (
        <div className="mt-2 text-sm text-gray-600">
          Arquivo selecionado: {selectedFile}
        </div>
      )}
    </div>
  )
}

export default FileInputComponent
