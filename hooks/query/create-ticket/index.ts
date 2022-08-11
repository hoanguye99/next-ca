import staffApi from '@/api/staff-api'
import { useAppSelector } from '@/app/hooks'
import { selectUserDetail } from '@/features/auth/user-slice'
import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'

// Query Key factory
export const createTicketKeys = {
  all: ['create-ticket'] as const,
  getConfigTicket: () => [...createTicketKeys.all, 'getConfigTicket'] as const,
  getComponent: (project_id: number) =>
    [...createTicketKeys.all, 'getComponent', project_id] as const,
}

export function useGetConfigTicket() {
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(createTicketKeys.getConfigTicket(), () =>
    staffApi.getConfigTicket(userDetail)
  )
}

export function useGetComponent(watchProject: string, project_id: number) {
  // console.log("watchProject", watchProject)
  const userDetail = useAppSelector(selectUserDetail)
  return useQuery(
    createTicketKeys.getComponent(project_id),
    () => staffApi.getComponent(userDetail, project_id),
    {
      // The query will not execute until enabled
      enabled: !!watchProject,
    }
  )
}