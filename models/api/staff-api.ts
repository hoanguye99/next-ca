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
  issue_id: string
  issue_key: string
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

export interface GetTicketDetailResponse {
  statusTransition: { id: string; name: string }[]
  request_name: string
  id: number
  customer_name: string
  account_name: string
  project_id: number
  category_id: number
  email: string
  phone: string
  date_create: string
  resolved_date: string
  summary: string
  status_id: number
  group_id: number
  priority_id: number
  scope: {
    type: string
    data: number[]
  }
  assignee_id: string
  description_by_staff: string
  request_type_id: number
  sizing_id: number
  assignee_name: string
  issue_id: string
  component_name: string
  time_spent: string
  activity_date: string
  component_id: string
  issue_key: string
  name_priority: string
  group_name: string
  status_name: string
  sizing_name: string
  project_name: string
  details: TicketDetails[]
  detailsLog: TicketDetailsLog[]
  detailComment: TicketDetailComment[]
}

interface TicketDetails {
  id: number
  ticket_id: number
  date_create: string
  new_status: number
  note: string
  date_activity: string
  time_spent: string
  activity_type: number
  new_group: number
  status_name: string
  activity_name: string
}

interface TicketDetailsLog {
  id: number
  comment: string
  time_spent: string
  start_date: string
  username: string
  user_key: string
  ot: {
    type: string
    data: number[]
  }
  phase_work_log: string
  date_created: string
  type_of_work: string
  ticket_id: number
  issue_id: string
  phase_work_log_name: string
}

interface TicketDetailComment {
  id: number
  content: string
  date_created: string
  created_by_account: string
  ticket_id: number
}
