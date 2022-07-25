
import { GetAllTicketStatusByStaffResponse } from '@/models/api'
import React from 'react'
import {
  useSortBy,
  useTable
} from 'react-table'
import {ArrowDown, ArrowUp, ArrowUpDown} from '@/components/common/table/pure-functions'
import styles from '@/styles/components/common/table.module.scss'
import { useOpenRequestColumns } from './hooks'

interface OpenRequestTableProps {
  data: GetAllTicketStatusByStaffResponse
}

const OpenRequestTable = (props: OpenRequestTableProps) => {
  const arr = props.data.tickets.find(item => item.type === 'OPEN_REQUEST')!.details
  const data = React.useMemo(() => arr, [arr])

  const columns = useOpenRequestColumns()

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  )

  return (
    <>
      <table {...getTableProps()} className={styles['main-table']}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <>
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-[#f9fbfd] uppercase font-extrabold"
              >
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div className="flex items-center gap-2 select-none">
                      <span>{column.render('Header')}</span>
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDown />
                          ) : (
                            <ArrowUp />
                          )
                        ) : (
                          <ArrowUpDown />
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="">
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}


export default OpenRequestTable
