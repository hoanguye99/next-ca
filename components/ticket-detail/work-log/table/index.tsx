import { GetTicketDetailResponse, TicketDetailsLog } from '@/models/api'
import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import ActionButton from './action-button'
import styles from '@/styles/components/common/table.module.scss'
import EmptyView from '@/components/common/empty-view'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Button } from '@/components/styled'

interface WorkLogTableProps {
  getTicketDetailData: GetTicketDetailResponse
  addNew: () => void
}

const columnHelper = createColumnHelper<TicketDetailsLog>()

const columns = [
  columnHelper.accessor('user_key', {
    header: () => 'Username',
  }),
  columnHelper.accessor('time_spent', {
    header: () => 'Hour',
  }),
  columnHelper.accessor('date_created', {
    header: () => 'Created',
    cell: (info) => {
      const createdDate = dayjs(info.getValue())
      return <i>{createdDate.format('MMMM DD')}</i>
    },
  }),
  columnHelper.accessor('start_date', {
    header: () => 'Started',
    cell: (info) => {
      const startDate = dayjs(info.getValue(), 'DD-MM-YYYY')
      return <i>{startDate.format('MMMM DD')}</i>
    },
  }),
  columnHelper.accessor('type_of_work', {
    header: () => 'Type',
  }),
  // columnHelper.accessor('comment', {
  //   header: () => 'Comment',
  // }),
  columnHelper.accessor('phase_work_log_name', {
    header: () => 'Phase',
  }),
  columnHelper.display({
    id: 'actions',
    cell: (props) => <ActionButton row={props.row} />,
  }),
]

const WorkLogTable = (props: WorkLogTableProps) => {
  const [data, setData] = React.useState(() => [
    ...props.getTicketDetailData.detailsLog,
  ])

  useEffect(() => {
    setData([...props.getTicketDetailData.detailsLog])
  }, [props.getTicketDetailData.detailsLog])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <table className={styles['main-table']}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-[#f9fbfd] uppercase font-extrabold"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {data.length === 0 && (
        <EmptyView className="bg-gray-table !h-[300px]">
          <p className="text-2xl text-gray-400 mb-5">No Work Log Found</p>
          <Button className="text-sm" onClick={props.addNew}>Create Work Log</Button>
        </EmptyView>
      )}
    </>
  )
}

export default WorkLogTable
