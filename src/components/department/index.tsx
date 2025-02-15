"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import Header from "../home/Header"
import { useCreateDepartment } from "@/hooks/useCreateDepartment"

export default function DepartmentForm() {
  const [acronym, setAcronym] = useState("")
  const [description, setDescription] = useState("")
  const { createDepartment } = useCreateDepartment()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const department = {
      acronym,
      description,
    }

    const result = await createDepartment(department)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        className: "bg-red-500 text-white",
      })
      return
    }

    if (result) {
      toast({
        title: "Sucesso",
        description: "Departamento criado com sucesso!",
        className: "bg-green-500 text-white",
      })
    }
    setAcronym("")
    setDescription("")
  }

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <div className="flex flex-col  mx-auto max-w-2xl h-[calc(100vh-4rem)] items-center justify-center transparent">
        <div className="rounded-lg border bg-card p-8 shadow-sm h-[70%] w-[90%]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Criar Novo Departamento</h2>
              <p className="text-muted-foreground">
                Adicione um novo departamento fornecendo sua sigla e descrição.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="acronym" className="font-semibold">
                  Sigla Do Departamento
                </Label>
                <div className="relative">
                  <Input
                    id="acronym"
                    placeholder="Insira a sigla do departamento (por exemplo, RH, TI)"
                    value={acronym}
                    onChange={(e) => setAcronym(e.target.value.toUpperCase())}
                    maxLength={10}
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="font-semibold">
                  Descrição do Departamento
                </Label>
                <Textarea
                  id="description"
                  placeholder="Insira uma descrição do departamento..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button type="submit" className="bg-[#4A90E2] hover:bg-[#357ABD]">
                <Check className="mr-2 h-4 w-4" />
                Criar Departamento
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setAcronym("")
                  setDescription("")
                }}
              >
                Limpar Formulário
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
