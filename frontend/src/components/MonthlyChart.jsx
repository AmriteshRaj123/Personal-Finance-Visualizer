import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Paper } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyChart = ({ transactions }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const monthlyTotals = transactions.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {});

    setChartData({
      labels: Object.keys(monthlyTotals),
      datasets: [
        {
          label: 'Monthly Expenses',
          data: Object.values(monthlyTotals),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    });
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Expenses'
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Bar data={chartData} options={options} />
    </Paper>
  );
};

export default MonthlyChart;