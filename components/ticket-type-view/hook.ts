import { useGetAllTicketStatus } from '@/hooks/query/dashboard'
import { RequestType } from '@/models/api'
import { useEffect, useState } from 'react'

export const useDispData = (ticketType: string) => {
  const getAllTicketStatus = useGetAllTicketStatus()
  const [dispData, setDispData] = useState<RequestType | undefined>(undefined)
  const [filter, setFilter] = useState('')
  useEffect(() => {
    // get Data from Ticket API based on ticketType URL passed in
    const preFilter =
      getAllTicketStatus.data !== undefined
        ? getAllTicketStatus.data.tickets.find((obj) => obj.type === ticketType)
        : undefined

    // Filter results based on User input string (case insensitive)
    const postFilter =
      preFilter === undefined
        ? undefined
        : {
            ...preFilter,
            details: preFilter.details.filter((obj) =>
            (Object.keys(obj) as (keyof typeof obj)[]).some(
                (key) =>
                  typeof obj[key] === 'string' && (obj[key] as string).toLowerCase().includes(filter.toLowerCase())
              )
            ),
          }
    setDispData(postFilter)
  }, [getAllTicketStatus.data, ticketType, filter])

  return {
    dispData,

    filter,
    setFilter,
  }
}
