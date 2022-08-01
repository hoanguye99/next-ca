import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { GetAllTicketStatusByStaffResponse } from '@/models/api'
import { memo } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface BarChartProps {
  data: GetAllTicketStatusByStaffResponse
}

export const options = {
  barThickness: 10,
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        drawBorder: false,
        display: false,
      },
      ticks: {
        color: '#95aac9',
        padding: 6,
      },
    },
    y: {
      grid: {
        drawBorder: false,
        borderDash: [4, 4],
        // display: false,
      },
      // ticks: {
      //   color: '#95aac9',
      //   padding: 6,
      //   callback: function(value: any) {
      //     if ( !(value % 10) ) {
      //       return '$' + value + 'k'
      //     }
      //   }
      // }
    },
  },
  elements: {
    bar: {
      // barThickness: 1,
      // maxBarThickness: 5,
      borderRadius: 5,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (item: any, data: any) {
          var label = data.datasets[item.datasetIndex].label || ''
          var yLabel = item.yLabel
          var content = ''

          if (data.datasets.length > 1) {
            content +=
              '<span class="popover-body-label mr-auto">' + label + '</span>'
          }

          content += '<span class="popover-body-value">$' + yLabel + 'k</span>'
          return content
        },
      },
    },
  },
}

const BarChart = (props: BarChartProps) => {
  const labels = [
    'Open',
    'In Progress',
    'Cancelled',
    'Complete',
    'Reopen'
  ]
  const originalLabels = [
    'OPEN_REQUEST',
    'IN_PROGRESS_REQUEST',
    'CANCEL_REQUEST',
    'COMPLETE',
    'REOPEN_REQUEST',
  ]
  const values = originalLabels.map(
    (item) => props.data.status.find((x) => x.statusName === item)?.quantity
  )
  const data = {
    labels,
    datasets: [
      {
        label: 'Requests',
        data: values,
        backgroundColor: '#2c7be5',
      },
    ],
  }
  return <Bar className="h-[300px]" options={options} data={data} />
}

export default memo(BarChart)
