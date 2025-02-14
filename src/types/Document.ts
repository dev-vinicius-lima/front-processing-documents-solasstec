export interface IDocument {
  dateTimeSubmission: string
  ReceivingSector: string
  dateTimeReceived: string
  sectorShipping: string
  id: number
  type: string
  title: string
  description: string
  file: string
  createdAt: string
  departmentId: number | null
  isSend?: boolean
}
