"use client"

import { useState } from "react"
import { Pencil, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Header from "../Header"
import { useCreateDepartment } from "@/hooks/useCreateDepartment"
import { useFetchDepartments } from "@/hooks/useFetchDepartments"
import { toast } from "@/hooks/use-toast"
import { useDeleteDepartment } from "@/hooks/useDeleteDepartment"

interface Department {
  id: number
  acronym: string
  description: string
}

export default function DepartmentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newDepartment, setNewDepartment] = useState({
    acronym: "",
    description: "",
  })
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  )

  const { departments, refetch: refetchDepartments } = useFetchDepartments()
  const { createDepartment, loading, error } = useCreateDepartment()
  const { deleteDepartment } = useDeleteDepartment()

  const handleCreate = async () => {
    if (newDepartment.acronym && newDepartment.description) {
      const createdDepartment = await createDepartment(newDepartment)
      if (createdDepartment) {
        setNewDepartment({ acronym: "", description: "" })
        setIsModalOpen(false)
        toast({
          title: "Sucesso",
          description: "Departamento criado com sucesso!",
          className: "bg-green-500 text-white",
        })
      }
      refetchDepartments()
    }
  }

  const handleEdit = (department: Department) => {
    setEditingDepartment(department)
  }

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza de que deseja deletar este departamento?")) {
      await deleteDepartment(id)
      toast({
        title: "Sucesso",
        description: "Departamento deletado com sucesso!",
        className: "bg-green-500 text-white",
      })
      refetchDepartments()
    }
  }
  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <Header />

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Lista de Departamentos</h2>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#4B87E2] hover:bg-[#2C4B9C]">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Departamento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Criar Novo Departamento</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label>Sigla Do Departamento</label>
                    <Input
                      placeholder="Insira a sigla do departamento (por exemplo, RH, TI)"
                      value={newDepartment.acronym.toUpperCase()}
                      onChange={(e) =>
                        setNewDepartment({
                          ...newDepartment,
                          acronym: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label>Descrição do Departamento</label>
                    <Textarea
                      placeholder="Insira uma descrição do departamento..."
                      value={newDepartment.description}
                      onChange={(e) =>
                        setNewDepartment({
                          ...newDepartment,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setNewDepartment({ acronym: "", description: "" })
                      }
                    >
                      Limpar Formulário
                    </Button>
                    <Button
                      className="bg-[#4B87E2] hover:bg-[#2C4B9C]"
                      onClick={handleCreate}
                      disabled={loading}
                    >
                      {loading ? "Criando..." : "Criar Departamento"}
                    </Button>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}{" "}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sigla</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="w-[100px]">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">
                    {department.acronym}
                  </TableCell>
                  <TableCell>{department.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Departamento</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label>Sigla Do Departamento</label>
                              <Input
                                defaultValue={department.acronym}
                                onChange={(e) =>
                                  setEditingDepartment({
                                    ...department,
                                    acronym: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <label>Descrição do Departamento</label>
                              <Textarea
                                defaultValue={department.description}
                                onChange={(e) =>
                                  setEditingDepartment({
                                    ...department,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="flex justify-end gap-4">
                              <Button
                                className="bg-[#4B87E2] hover:bg-[#2C4B9C]"
                                onClick={() =>
                                  editingDepartment &&
                                  handleEdit(editingDepartment)
                                }
                              >
                                Salvar Alterações
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                        onClick={() => {
                          handleDelete(department.id)
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
