import { useCallback } from "react"

const useDownloadFile = (baseUrl: string = "http://localhost:3333") => {
  const downloadFile = useCallback(
    (fileName: string) => {
      if (!fileName) return

      const link = document.createElement("a")
      link.href = `${baseUrl}/documents/download/${fileName}`
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    [baseUrl]
  )

  return { downloadFile }
}

export default useDownloadFile
