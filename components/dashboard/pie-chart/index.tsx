import React from 'react'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Bar, Chart, Doughnut } from 'react-chartjs-2'

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
      position: "bottom" as "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 8,
        padding: 20,
      }
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

export const data = {
  labels: ['Desktop', 'Tablet', 'Mobile'],
  datasets: [
    {
      label: '# of Votes',
      data: [60, 25, 15],
      backgroundColor: ['#2C7BE5', '#A6C5F7', '#D2DDEC'],
    },
  ],
}

type PieChartProps = {}

const PieChart = (props: PieChartProps) => {
  return <Doughnut className='h-[300px]' options={options} data={data} />
}

export default PieChart
