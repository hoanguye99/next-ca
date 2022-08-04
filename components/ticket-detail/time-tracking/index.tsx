import { GetTicketDetailResponse } from '@/models/api'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import React from 'react'

ChartJS.register(Title, Tooltip, Legend, ArcElement)
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  spacing: 3,
  cutout: '70%',
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

interface TimeTrackingProps {
  getTicketDetailData: GetTicketDetailResponse
}

const TimeTracking = (props: TimeTrackingProps) => {
  const timeLogged = props.getTicketDetailData.detailsLog.reduce(
    (total, obj) => total + Number(obj.time_spent),
    0
  )
  const timeEstimate = Number(
    props.getTicketDetailData.time_spent.replace(/h/g, '')
  )

  let data

  if (timeEstimate >= timeLogged) {
    data = {
      labels: ['Logged', 'Remaining', 'Original Estimate'],
      datasets: [
        {
          label: 'Estimate',
          data: [0,0,timeEstimate],
          backgroundColor: ['#2C7BE5', '#D2DDEC', '#ff6384'],
        },
        {
          label: 'Log',
          data: [timeLogged, timeEstimate - timeLogged, 0],
          backgroundColor: ['#2C7BE5', '#D2DDEC', '#ff6384'],
        },
      ],
    }
  } else {
    data = {
      labels: ['Logged', 'Original Estimate'],
      datasets: [
        {
          label: 'Estimate',
          data: [0,timeEstimate],
          backgroundColor: ['#2C7BE5', '#ff6384'],
          circumference: timeEstimate/timeLogged*360
        },
        {
          label: 'Log',
          data: [timeLogged, 0],
          backgroundColor: ['#2C7BE5', '#ff6384'],
        },
      ],
    }

  }

  return <Doughnut className="h-[300px]" options={options} data={data} />
}

export default TimeTracking
