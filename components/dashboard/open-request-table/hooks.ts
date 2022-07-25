import { RequestDetail } from '@/models/api'
import React from 'react'
import { Column } from 'react-table'
import {StatusColumn} from './status-column'

export const useOpenRequestColumns = () => {
  const columns = React.useMemo<readonly Column<RequestDetail>[]>(
    () => [
      {
        Header: 'Project ID',
        accessor: 'project_id',
      },
      {
        Header: 'Customer',
        accessor: 'customer_name',
      },
      {
        Header: 'Assignee',
        accessor: 'email',
      },
      {
        Header: 'Create Date',
        accessor: 'date_create',
      },
      {
        Header: 'Status Date',
        accessor: 'status_id',
        Cell: (props) => StatusColumn(props.row.original),
      },
    ],
    []
  )

  return columns
}

