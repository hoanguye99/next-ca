export interface GetAllProjectsResponse {
  details: Project[]
}

export interface Project {
  id: number
  name: string
  project_category: string
  project_code: string
  image: string
}

export interface GetAllTicketStatusByStaffResponse {
  tickets: RequestType[]
  status: StatusQuantity[]
  requests: RequestQuantity[]
}

interface RequestType {
  type: string
  details: RequestDetail[]
}

interface StatusQuantity {
  statusName: string
  quantity: number
}

interface RequestQuantity {
  requestName: string
  quantity: number
}

export interface RequestDetail {
  id: number
  customer_name: string
  project_id: number
  category_id: number
  email: string
  phone: string
  date_create: string
  resolved_date: string
  summary: string
  description_by_customer: string
  group_id: number
  priority_id: number
  scope: {
    type: string
    data: number[]
  }
  assignee_id: number
  description_by_staff: string
  status_name: string
  status_id: number
  request_type_id: number
  request_type_name: string
}

export interface GetTimeSpentResponse {
  details: number[]
}