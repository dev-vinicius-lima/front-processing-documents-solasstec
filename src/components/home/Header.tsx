"use client"
import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
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
  )
}

export default Header
