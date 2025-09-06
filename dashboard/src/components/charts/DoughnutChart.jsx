import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartColors = {
  red: '#FF6384',
  orange: '#FF9F40',
  yellow: '#FFCD56',
  green: '#4BC0C0',
  blue: '#36A2EB',
  purple: '#9966FF',
  grey: '#C9CBCF'
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  layout: {
    padding: 2
  },
  plugins: {
    legend: {
      position: 'right',
      align: 'center',
      labels: {
        padding: 23,
        boxWidth: 25,
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 14
        },
        generateLabels: function(chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const labels = getLegendLabels(chart);
            return data.labels.map((label, i) => ({
              text: labels[i],
              fillStyle: data.datasets[0].backgroundColor[i],
              hidden: false,
              lineCap: undefined,
              lineDash: undefined,
              lineDashOffset: undefined,
              lineJoin: undefined,
              lineWidth: 1,
              strokeStyle: 'rgba(0,0,0,0.1)',
              pointStyle: 'circle',
              rotation: undefined
            }));
          }
          return [];
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          const label = context.dataset.label || '';
          const value = context.raw || 0;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = Math.round((value / total) * 100);
          return `${label}: ${value} (${percentage}%)`;
        }
      }
    }
  }
};

const getLegendLabels = (chart) => {
  const data = chart.data;
  if (!data.datasets || !data.datasets[0]) return [];
  
  const dataset = data.datasets[0];
  const total = dataset.data.reduce((a, b) => a + b, 0);
  
  return data.labels.map((label, i) => {
    const value = dataset.data[i];
    const percentage = Math.round((value / total) * 100);
    return `${label}: ${value} (${percentage}%)`;
  });
};

const DoughnutChart = ({ data, centerText }) => {
  const plugins = [{
    id: 'centerText',
    beforeDraw: function(chart) {
      if (!centerText) return;
      
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      const ctx = chart.ctx;
      
      ctx.save();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#e0e0e0';
      ctx.stroke();
      
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(centerText, centerX, centerY - 5);
      
      ctx.font = '12px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Total', centerX, centerY + 20);
      
      ctx.restore();
    }
  }];

  return (
    <div style={{ height: '250px', width: '100%', position: 'relative' }}>
      <Doughnut 
        data={data} 
        options={doughnutOptions}
        plugins={plugins}
      />
    </div>
  );
};

export default DoughnutChart;
