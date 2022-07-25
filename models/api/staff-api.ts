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
