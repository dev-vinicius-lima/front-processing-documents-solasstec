import { useState } from "react"
import { IDocument } from "@/types/Document"

export type SearchTerms = {
  id: string
  title: string
  sectorShipping: string
  dateTimeSubmission: string
  ReceivingSector: string
  dateTimeReceived: string
  Anexo: string
  Ações: string
}
interface UseSearchReturn {
  searchTerms: SearchTerms
  updateSearchTerm: (field: keyof SearchTerms, value: string) => void
  filteredData: IDocument[]
}

const useSearch = (data: IDocument[]): UseSearchReturn => {
  const [searchTerms, setSearchTerms] = useState({
    id: "",
    title: "",
    sectorShipping: "",
    dateTimeSubmission: "",
    ReceivingSector: "",
    dateTimeReceived: "",
    Anexo: "",
    Ações: "",
  })

  const filteredData = data.filter((item) => {
    return (
      (searchTerms.id === "" || String(item.id).includes(searchTerms.id)) &&
      (searchTerms.title === "" ||
        item.title.toLowerCase().includes(searchTerms.title.toLowerCase())) &&
      (searchTerms.sectorShipping === "" ||
        item.sectorShipping
          .toLowerCase()
          .includes(searchTerms.sectorShipping.toLowerCase())) &&
      (searchTerms.dateTimeSubmission === "" ||
        item.dateTimeSubmission
          .toLowerCase()
          .includes(searchTerms.dateTimeSubmission.toLowerCase())) &&
      (searchTerms.ReceivingSector === "" ||
        item.ReceivingSector.toLowerCase().includes(
          searchTerms.ReceivingSector.toLowerCase()
        )) &&
      (searchTerms.dateTimeReceived === "" ||
        item.dateTimeReceived
          .toLowerCase()
          .includes(searchTerms.dateTimeReceived.toLowerCase())) &&
      (searchTerms.Anexo === "" ||
        item.file.toLowerCase().includes(searchTerms.Anexo.toLowerCase())) &&
      (searchTerms.Ações === "" ||
        item.type.toLowerCase().includes(searchTerms.Ações.toLowerCase()))
    )
  })

  const updateSearchTerm = (field: string, value: string) => {
    setSearchTerms((prev) => ({ ...prev, [field]: value }))
  }

  return {
    searchTerms,
    updateSearchTerm,
    filteredData,
  }
}
export default useSearch
