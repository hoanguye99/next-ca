import { GetTicketDetailResponse } from '@/models/api'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import React from 'react'
import { UseQueryResult } from '@tanstack/react-query'

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
  getTicketDetail: UseQueryResult<GetTicketDetailResponse, unknown>
}

const TimeTracking = (props: TimeTrackingProps) => {
  function data() {
    const timeLogged = props.getTicketDetail.data!.detailsLog.reduce(
      (total, obj) => total + Number(obj.time_spent),
      0
    )
    const timeEstimate = Number(
      props.getTicketDetail.data!.time_spent.replace(/h/g, '')
    )

    let data

    if (timeEstimate >= timeLogged) {
      data = {
        labels: ['Logged', 'Remaining', 'Original Estimate'],
        datasets: [
          {
            label: 'Estimate',
            data: [0, 0, timeEstimate],
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
            data: [0, timeEstimate],
            backgroundColor: ['#2C7BE5', '#ff6384'],
            circumference: (timeEstimate / timeLogged) * 360,
          },
          {
            label: 'Log',
            data: [timeLogged, 0],
            backgroundColor: ['#2C7BE5', '#ff6384'],
          },
        ],
      }
    }
    return { data, timeLogged, timeEstimate }
  }

  return (
    <>
      {props.getTicketDetail.status === 'loading' && (
        <>
          <div className="flex flex-col gap-4 text-sm mb-5">
            <div className="animate-pulse bg-slate-100 h-7"></div>
            <div className="animate-pulse bg-slate-100 h-7"></div>
          </div>
          <div className="animate-pulse rounded-full bg-slate-100 h-[300px] w-[300px] mx-auto"></div>
        </>
      )}
      {props.getTicketDetail.status === 'success' && (
        <>
          <div className="flex flex-col gap-4 text-sm mb-5">
            <div className="flex items-center justify-between truncate gap-2">
              <span className="text-gray-500">Original Estimate:</span>
              <span>{data().timeEstimate}h</span>
            </div>
            <div className="flex items-center justify-between truncate gap-2">
              <span className="text-gray-500">Logged:</span>
              <span>{data().timeLogged}h</span>
            </div>
          </div>
          <div>
            <Doughnut
              className="h-[300px]"
              options={options}
              data={data().data}
            />
          </div>
        </>
      )}
    </>
  )
}

export default TimeTracking
