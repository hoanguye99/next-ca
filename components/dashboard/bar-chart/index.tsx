import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps{}

export const options = {
  barThickness: 10,
  responsive: true,
  scales:{
    x: {
      grid: {
        drawBorder: false,
        display: false,
      },
      ticks: {
        color: '#95aac9',
        padding: 6
      }
    },
    y: {
      grid: {
        drawBorder: false,
        borderDash: [4, 4]
        // display: false,
      },
      ticks: {
        color: '#95aac9',
        padding: 6,
        callback: function(value: any) {
          if ( !(value % 10) ) {
            return '$' + value + 'k'
          }
        }
      }
    }
  },
  elements: {
    bar: {
      // barThickness: 1,
      // maxBarThickness: 5,
      borderRadius: 5
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: function(item :any, data : any) {
          var label = data.datasets[item.datasetIndex].label || '';
          var yLabel = item.yLabel;
          var content = '';
  
          if (data.datasets.length > 1) {
            content += '<span class="popover-body-label mr-auto">' + label + '</span>';
          }
  
          content += '<span class="popover-body-value">$' + yLabel + 'k</span>';
          return content;
        }
      }
    },
  }
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Sales',
      data: [25,20,30,22,17,10,18,26,28,26,20,32],
      backgroundColor: '#2c7be5',
    }
  ],
};

const BarChart = (props: BarChartProps) => {
  return (
    <Bar options={options} data={data} />
  )
}

export default BarChart