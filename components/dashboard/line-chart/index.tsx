import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { GetTimeSpentResponse } from '@/models/api'
import { memo } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartProps {
  getTimeSpent: UseQueryResult<GetTimeSpentResponse, unknown>
}

export const options = {
  // barThickness: 10,
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
  // elements: {
  //   bar: {
  //     // barThickness: 1,
  //     // maxBarThickness: 5,
  //     borderRadius: 5
  //   }
  // },
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

const LineChart = (props: LineChartProps) => {
  const labels = [
    'Week - 7',
    'Week - 6',
    'Week - 5',
    'Week - 4',
    'Week - 3',
    'Week - 2',
    'Week - 1',
    'Now',
  ]

  function data() {
    const data = {
      labels,
      datasets: [
        {
          label: 'Hours',
          data: props.getTimeSpent.data!.details,
          backgroundColor: '#2c7be5',
        },
      ],
    }
    return data
  }

  return (
    <>
      {props.getTimeSpent.status === 'loading' && (
        <div className="animate-pulse rounded bg-slate-100 h-full w-full mt-5"></div>
      )}
      {props.getTimeSpent.status === 'success' && (
        <Line className="h-[300px]" options={options} data={data()} />
      )}
    </>
  )
}

export default memo(LineChart)
