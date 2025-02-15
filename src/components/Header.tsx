"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const route = useRouter()

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-blue-900 h-16 p-2">
        <Button
          variant="ghost"
          onClick={toggleMenu}
          size="lg"
          className="text-white shadow-lg transition-all duration-300 p-3"
        >
          <motion.div
            initial={false}
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.div>
          <span className="sr-only">Menu</span>
        </Button>

        <div className="text-slate-300 px-11 flex items-center gap-2">
          <p>João da Silva</p>
          <div className="flex items-center justify-center rounded-full bg-teal-600 w-10 h-10">
            <p>JS</p>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 bg-blue-600 p-2 shadow rounded-ee-3xl">
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => route.push("/")}
              className="text-white decoration-none bg-blue-600 hover:bg-blue-800 mx-1"
            >
              Home
            </Button>
            <Button
              onClick={() => route.push("/department")}
              className="text-white decoration-none bg-blue-600 hover:bg-blue-800 mx-1"
            >
              Criar Departamento
            </Button>
            <Button
              onClick={() => route.push("/departmentManagement")}
              className="text-white decoration-none bg-blue-600 hover:bg-blue-800 mx-1"
            >
              Gerenciar Departamento
            </Button>
            <Button
              onClick={() => route.push("/history")}
              className="text-white decoration-none bg-blue-600 hover:bg-blue-800 mx-1"
            >
              Histórico de Tramitações
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
