// usePagination.ts
import { IDocument } from "@/types/Document"
import { useState } from "react"

const usePagination = (data: IDocument[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return {
    currentData,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  }
}

export default usePagination
