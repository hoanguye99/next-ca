import { Spinner } from '@/components/styled'
import { useQueryDashBoard } from '@/hooks/query'
import React from 'react'

interface DashBoardDataProps<T> {
  type: string
  fetcher: () => Promise<T>
  render: (data: T) => React.ReactNode
}

function DashBoardData<T>(props: DashBoardDataProps<T>) {
  const { status, data, error } = useQueryDashBoard(props.type, props.fetcher)
  if (status === 'error')
    return <p className="text-red-500">{(error as Object).toString()}</p>
  if (status === 'loading')
    return (
      <div className="h-full flex justify-center items-center">
        <Spinner />
      </div>
    )
  if (status === 'success') return <>{props.render(data)}</>
  return <>Error Case, Check Code</>
}

export default DashBoardData
