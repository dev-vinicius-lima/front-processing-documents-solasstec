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
  isReceived?: boolean
}

export interface DocumentMovement {
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
