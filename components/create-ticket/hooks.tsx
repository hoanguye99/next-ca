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
        // reset()
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Emilia Gates
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Sure! 8:30pm works great!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ))
      },
    }
  )
}
