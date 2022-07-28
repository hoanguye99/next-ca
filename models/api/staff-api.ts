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

export interface GetConfigTicketResponse {
  projects: CreateTicketProject[]
  status: CreateTicketStatus[]
  priority: CreateTicketPriority[]
  request: CreateTicketRequest[]
  group: CreateTicketGroup[]
  sizing: CreateTicketSizing[]
}

interface CreateTicketProject {
  name: string
  date_create: string
  user_create: number
  account_owner: string
  department: string
  project_code: string
  project_id: number
  project_category: string
  image: string
}

interface CreateTicketStatus {
  id: number
  status_name: string
}

interface CreateTicketPriority {
  id: number
  name_priority: string
}

interface CreateTicketRequest {
  id: number
  request_type_name: string
}

interface CreateTicketGroup {
  id: number
  group_name: string
}

interface CreateTicketSizing {
  id: number
  name: string
}

export interface GetComponentResponse {
  component_name: { name: string }[]
}

export interface CreateTicketRequestBody {
  customer_name: string
  project_id: number
  summary: string
  group_id: number
  priority_id: number
  scope: number
  description_by_staff: string
  request_type_id: number
  sizing_id: number
  resolved_date: string
  component_name: string
  time_spent: string
  activity_date: string
  assignee_name: string
}

export interface CreateTicketResponse {
  idMaster: number
}

export interface GetUserResponse {
  name: string
  key: string
  emailAddress: string
  displayName: string
}
