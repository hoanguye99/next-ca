import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { GetAllTicketStatusByStaffResponse } from '@/models/api'
import { memo } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface RadarChartProps {
  getAllTicketStatus: UseQueryResult<GetAllTicketStatusByStaffResponse, unknown>
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        // display: false,
      },
      grid: {
        // display: false,
        borderDash: [4, 4],
        circular: true,
        drawBorder: true,
      },
      //       ticks: {
      //         color: '#95aac9',
      //         padding: 6,
      //       },
    },
  },
  plugins: {
    legend: {
      display: true,
      position: 'right' as 'right',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        padding: 20,
      },
    },
    //     tooltips: {
    //       callbacks: {
    //         label: function (item: any, data: any) {
    //           var label = data.datasets[item.datasetIndex].label || ''
    //           var yLabel = item.yLabel
    //           var content = ''

    //           if (data.datasets.length > 1) {
    //             content +=
    //               '<span class="popover-body-label mr-auto">' + label + '</span>'
    //           }

    //           content += '<span class="popover-body-value">$' + yLabel + 'k</span>'
    //           return content
    //         },
    //       },
    //     },
  },
}

const RadarChart = (props: RadarChartProps) => {
  const labels = [
    'Open',
    'In Progress',
    'Cancelled',
    'Complete',
    'Reopen',
    'Close',
  ]
  const originalLabels = [
    'OPEN_REQUEST',
    'IN_PROGRESS_REQUEST',
    'CANCEL_REQUEST',
    'COMPLETE',
    'REOPEN_REQUEST',
    'CLOSE',
  ]

  function data() {
    const values = originalLabels.map(
      (item) =>
        props.getAllTicketStatus.data!.status.find((x) => x.statusName === item)
          ?.quantity
    )
    const data = {
      labels,
      datasets: [
        {
          label: 'Requests',
          data: values,
          backgroundColor: 'rgba(44, 123, 229, 0.2)',
          borderColor: 'rgba(44, 123, 229, 1)',
          borderWidth: 1.5,
        },
      ],
    }
    return data
  }

  return (
    <>
      {props.getAllTicketStatus.status === 'loading' && (
        <div className="animate-pulse rounded-full bg-slate-100 h-[300px] w-[300px] mx-auto"></div>
      )}
      {props.getAllTicketStatus.status === 'success' && (
        <Radar className="h-[300px]" options={options} data={data()} />
      )}
    </>
  )
}

export default memo(RadarChart)
