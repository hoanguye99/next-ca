import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useCreateMutation, useGetComponent, useGetConfigTicket } from '@/hooks/query/create-ticket'
import { useGetUserWithState } from '@/hooks/query/shared'
import { CreateTicketRequestBody, CreateTicketResponse } from '@/models/api'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import staffApi from '@/api/staff-api'

export interface TicketInputs {
  customer_name: string
  assignee_name: string
  project: string
  component_name: string

  group: string
  priority: string
  request_type: string
  sizing: string
  scope: boolean
  resolved_date: string
  activity_date: string
  time_spent: number

  summary: string
  description_by_staff: string
}

export const useTicketCreate = () => {
  const {
    register,
    setValue,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TicketInputs>()
  const watchProject = watch('project', '')

  const {
    status: status1,
    data: getConfigTicketData,
    error: error1,
  } = useGetConfigTicket()
  if (status1 === 'error') console.log(error1)

  const project_id =
    getConfigTicketData === undefined || !watchProject
      ? -1
      : getConfigTicketData.projects.find(
          (project) => project.name === watchProject
        )?.project_id
  const {
    status: status2,
    data: getComponentData,
    error: error2,
  } = useGetComponent(watchProject, project_id || -1)
  if (status2 === 'error') console.log(error2)

  const {
    status: status3,
    fetchStatus: fetchUserStatus,
    data: getUserData,
    error: error3,
    setUser,
  } = useGetUserWithState()
  if (status3 === 'error') console.log(error3)

  const userDetail = useAppSelector(selectUserDetail)
  const {
    showDetailModal,
    closeDetailModal,
    data : createData,
    posting : createPosting,
    showErrorModal,
    closeErrorModal,
    error : createError,
    mutation
  } = useCreateMutation<CreateTicketRequestBody, CreateTicketResponse>(createTicketBody => staffApi.createTicket(userDetail, createTicketBody))

  const handleFormSubmit: SubmitHandler<TicketInputs> = async (data) => {
    const createTicketBody = {
      customer_name: data.customer_name,
      assignee_name: getUserData!.name,
      project_id: getConfigTicketData!.projects.find(
        (obj) => obj.name === data.project
      )!.project_id,
      component_name: data.component_name,

      group_id: getConfigTicketData!.group.find(
        (obj) => obj.group_name === data.group
      )!.id,
      priority_id: getConfigTicketData!.priority.find(
        (obj) => obj.name_priority === data.priority
      )!.id,
      request_type_id: getConfigTicketData!.request.find(
        (obj) => obj.request_type_name === data.request_type
      )!.id,
      sizing_id: getConfigTicketData!.sizing.find(
        (obj) => obj.name === data.sizing
      )!.id,
      scope: data.scope ? 1 : 0,
      resolved_date: data.resolved_date,
      activity_date: data.activity_date,
      time_spent: `${data.time_spent}h`,

      summary: data.summary,
      description_by_staff: data.description_by_staff,
    }
    mutation.mutate(createTicketBody)
  }

  return {
    // Form
    register,
    setValue,
    watchProject,
    getValues,
    handleSubmit,
    errors,
    handleFormSubmit,
    reset,

    getConfigTicketData,

    getComponentData,

    // Get User query
    fetchUserStatus,
    getUserData,
    setUser,

    // Post Create variables
    showDetailModal,
    closeDetailModal,
    createData,
    createPosting,
    showErrorModal,
    closeErrorModal,
    createError,
  }
}

