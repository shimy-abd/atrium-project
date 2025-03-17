import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  goals: { name: string; status: string }[];
}

const PieChart: React.FC<PieChartProps> = ({ goals }) => {
  const statusCounts = goals.reduce(
    (acc, goal) => {
      acc[goal.status] = (acc[goal.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const data = {
    labels: ['Onboarding', '1:1 sessions', 'Complete', 'Impact Assessment'],
    datasets: [
      {
        label: 'Participant Progress',
        data: [
          statusCounts['NS'] || 0,
          statusCounts['IP'] || 0,
          statusCounts['C'] || 0,
          statusCounts['A'] || 0,
        ],
        backgroundColor: [
          'rgba(250, 244, 237, 0.85)',
          'rgba(38, 0, 252, 0.85)',
          'rgba(210, 201, 203, 0.85)',
          'rgba(9, 0, 121, 0.85)',
        ],
        borderColor: [
          'rgba(250, 244, 237, 1)',
          'rgba(38, 0, 252, 1)',
          'rgba(210, 201, 203, 1)',
          'rgba(9, 0, 121, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'left',
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            return data.labels.map((label, index) => {
              const value = data.datasets[0].data[index];
              return {
                text: `${label} ${' '.repeat(20 - label.length)} ${value}`,
                fillStyle: data.datasets[0].backgroundColor[index],
                strokeStyle: data.datasets[0].borderColor[index],
                lineWidth: data.datasets[0].borderWidth,
              };
            });
          },
        },
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;