import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import {
  useGetComponent,
  useGetConfigTicket,
} from '@/hooks/query/create-ticket'
import { useGetUserWithState } from '@/hooks/query/shared'
import { CreateTicketRequestBody, CreateTicketResponse } from '@/models/api'
import { SubmitHandler, useForm, UseFormReset } from 'react-hook-form'
import staffApi from '@/api/staff-api'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { NormalText } from '../styled'
import Link from 'next/link'

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

  const { data: getConfigTicketData } = useGetConfigTicket()

  const project_id =
    getConfigTicketData === undefined || !watchProject
      ? -1
      : getConfigTicketData.projects.find(
          (project) => project.name === watchProject
        )?.project_id
  const { data: getComponentData } = useGetComponent(
    watchProject,
    project_id || -1
  )

  const {
    fetchStatus: fetchUserStatus,
    data: getUserData,
    setUser,
  } = useGetUserWithState()

  const mutation = useTicketCreateMutation(reset)

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

    mutation,
  }
}

export function useTicketCreateMutation(reset: UseFormReset<TicketInputs>) {
  const userDetail = useAppSelector(selectUserDetail)
  return useMutation<
    CreateTicketResponse,
    AxiosError,
    CreateTicketRequestBody,
    CreateTicketResponse
  >(
    (createTicketBody) =>
      toast.promise(
        staffApi.createTicket(userDetail, createTicketBody),
        {
          loading: 'Creating Ticket ...',
          success: null,
          error: (err) => (err as AxiosError).message,
        },
        {
          style: {
            minWidth: '200px',
          },
          success: {
            style: {
              display: "none"
            }
          },
        }
      ),
    {
      onError: (error, variables, context) => {},
      onSuccess: (data, variables, context) => {
        reset()
        toast.success(
          (t) => (
            <div className="flex items-center gap-16">
              <NormalText>New Ticket Added</NormalText>
              <div className="flex items-center gap-3">
                <Link href={`/tickets/view/open-request/${data.key}`}>
                  <a className="text-sm w-fit text-blue-primary transition-all duration-75 hover:text-blue-hover active:text-blue-focus">
                    View
                  </a>
                </Link>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ),
          {
            duration: 10000,
          }
        )
      },
    }
  )
}
