import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  scales: {
    x: {
      stacked: true,
      display: false,
      grid: {
        display: true,
      },
    },
    y: {
      stacked: true,
      display: false,
      grid: {
        display: true,
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      align: 'start',
      labels: {
        padding: 25,
        boxWidth: 15,
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  barThickness: 12,
};

const BarChart = ({ data }) => {
  const updatedLabels = data.labels.map((label, index) => {
    const value = data.datasets[0].data[index];
    return value > 0 ? `${label}: ${value}` : label;
  });
  
  const total = data.datasets.reduce((sum, dataset) => 
    sum + dataset.data.reduce((a, b) => a + b, 0), 0);
    
  const chartData = {
    ...data,
    labels: updatedLabels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      label: dataset.label + `: ${dataset.data.reduce((a, b) => a + b, 0)}`,
    }))
  };

  return (
    <div style={{ height: '170px', width: '100%', position: 'relative' }}>
      {total > 0 && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          padding: '5px 10px',
          fontWeight: 'bold',
          fontSize: '14px',
          zIndex: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '0 0 4px 0'
        }}>
          Total: {total}
        </div>
      )}
      <div style={{ height: '100%', width: '100%', paddingTop: '0' }}>
        <Bar data={chartData} options={barOptions} />
      </div>
    </div>
  );
};

export default BarChart;