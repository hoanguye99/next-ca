import { GetTicketDetailResponse } from '@/models/api'
import React from 'react'

interface WorkLogProps {
  getTicketDetailData: GetTicketDetailResponse
}

const WorkLog = (props: WorkLogProps) => {
  const data = React.useMemo(() => props.getTicketDetailData.detailsLog, [props.getTicketDetailData.detailsLog])

  const columns = useWorkLogColumns()

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

export default WorkLog