import React from 'react'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Chart, Doughnut } from 'react-chartjs-2'
import { GetAllTicketStatusByStaffResponse } from '@/models/api'
import { memo } from 'react'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  spacing: 3,
  cutout: '85%',
  // radius: "90%",
  // radius: 120,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        padding: 20,
      },
    },
    // tooltips: {
    //   callbacks: {
    //     label: function(item :any, data : any) {
    //       var label = data.datasets[item.datasetIndex].label || '';
    //       var yLabel = item.yLabel;
    //       var content = '';

    //       if (data.datasets.length > 1) {
    //         content += '<span class="popover-body-label mr-auto">' + label + '</span>';
    //       }

    //       content += '<span class="popover-body-value">$' + yLabel + 'k</span>';
    //       return content;
    //     }
    //   }
    // },
  },
}

interface DoughnutChartProps {
  data: GetAllTicketStatusByStaffResponse
}

const DoughnutChart = (props: DoughnutChartProps) => {
  const labels = ['Support', 'Upgrade', 'Change']
  const originalLabels = ['SUPPORT_REQUEST', 'UPGRADE', 'CHANGE_REQUEST']
  const values = originalLabels.map(
    (item) => props.data.requests.find((x) => x.requestName === item)?.quantity
  )
  const data = {
    labels,
    datasets: [
      {
        label: 'Requests',
        data: values,
        backgroundColor: ['#2C7BE5', '#A6C5F7', '#D2DDEC'],
      },
    ],
  }
  return <Doughnut className="h-[300px]" options={options} data={data} />
}

export default memo(DoughnutChart)
