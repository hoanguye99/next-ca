export interface GetAllProjectsResponse {
  details: Project[]
}

interface Project {
  id: number
  name: string
  project_category: string
  project_code: string
  image: string
}
