import { useQuery } from '@tanstack/react-query'

export function useQueryDashBoard(type: string, fetcher: () => Promise<any>) {
  return useQuery(['dashboard', type], fetcher)
}
