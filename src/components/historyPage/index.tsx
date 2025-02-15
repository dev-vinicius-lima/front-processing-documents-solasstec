"use client"
import { format } from "date-fns"
import { Download, FileText, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import useDepartments from "@/hooks/useDepartments"

interface DocumentMovement {
  fileName: string
  id: number
  type: string
  title: string
  description: string
  file: string
  createdAt: string
  isReceived: boolean
  status: string
  history: Array<{
    id: number
    action: string
    date: string
    sendingDepartment: string
    receivingDepartment: string
  }>
}

export default function DocumentMovementHistory() {
  const [documents, setDocuments] = useState<DocumentMovement[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const documentsPerPage = 5
  const [documentId, setDocumentId] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const { departments, loading, error } = useDepartments()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch("http://localhost:3333/documents/history")
        const data = await response.json()
        setDocuments(data)
      } catch (error) {
        console.error("Erro ao buscar documentos:", error)
      }
    }

    fetchDocuments()
  }, [])

  const handleDownload = (fileName: string) => {
    const link = document.createElement("a")
    link.href = `http://localhost:3333/documents/download/${fileName}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesId = documentId ? doc.id.toString() === documentId : true

    const matchesDepartment =
      selectedDepartment && doc.history.length > 0
        ? doc.history.some((h) =>
            departments.some(
              (dept) =>
                dept.acronym === selectedDepartment &&
                h.receivingDepartment === dept.description
            )
          )
        : true

    const matchesDate = selectedDate
      ? format(new Date(doc.createdAt), "yyyy-MM-dd") === selectedDate
      : true

    return matchesId && matchesDepartment && matchesDate
  })

  const indexOfLastDocument = currentPage * documentsPerPage
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage
  const currentDocuments = filteredDocuments.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  )

  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage)

  return (
    <div className="w-full bg-slate-200">
      <div className="py-8 w-full h-[calc(100vh-64px)] flex justify-center items-center">
        <div className="bg-white h-[95%] rounded-lg shadow-lg w-[80%]">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold p-3 border-b-2 border-[#4B87E2] pb-1">
                Histórico de tramitações de documentos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Document ID"
                  className="pl-8"
                  value={documentId}
                  onChange={(e) => setDocumentId(e.target.value)}
                />
              </div>
              <Select
                onValueChange={setSelectedDepartment}
                value={selectedDepartment || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar Departamento" />
                </SelectTrigger>
                <SelectContent>
                  {loading && (
                    <SelectItem value="loading" disabled>
                      Carregando...
                    </SelectItem>
                  )}
                  {error && (
                    <SelectItem value="error" disabled>
                      {error}
                    </SelectItem>
                  )}
                  {!loading &&
                    !error &&
                    departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.acronym}>
                        {dept.description}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <Button
                onClick={() => setSelectedDepartment("")}
                variant="outline"
                className="ml-2 w-[25%]"
              >
                Limpar Filtro
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Setor Envio</TableHead>
                    <TableHead>Data de envio</TableHead>
                    <TableHead>Setor Recebimento</TableHead>
                    <TableHead>Data Recebimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        {doc.id.toString().padStart(3, "0")}
                      </TableCell>
                      <TableCell>{doc.title}</TableCell>
                      <TableCell>
                        {Array.isArray(doc.history) &&
                        doc.history.length > 0 ? (
                          <>{doc.history[0].sendingDepartment}</>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell>
                        {format(new Date(doc.createdAt), "dd/MM/yyyy - HH:mm")}
                      </TableCell>
                      <TableCell>
                        {doc.history
                          .map((h) => h.receivingDepartment)
                          .join(", ") || "N/A"}
                      </TableCell>
                      <TableCell>
                        {doc.history.length > 0
                          ? format(
                              new Date(doc.history[0].date),
                              "dd/MM/yyyy - HH:mm"
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            doc.status === "Received"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">View details</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              handleDownload(doc.file)
                            }}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Mostrando {indexOfFirstDocument + 1} a{" "}
                {Math.min(indexOfLastDocument, filteredDocuments.length)} de{" "}
                {filteredDocuments.length} entradas
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
