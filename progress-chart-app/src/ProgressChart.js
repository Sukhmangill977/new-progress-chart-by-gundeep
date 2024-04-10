import React from 'react';
import { Bar } from 'react-chartjs-2';

const ProgressChart = ({ subject1Data, subject2Data }) => {
  const data = {
    labels: ['Subject 1', 'Subject 2'],
    datasets: [
      {
        label: 'Progress',
        backgroundColor: ['rgba(75,192,192,0.2)', 'rgba(255,99,132,0.2)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(75,192,192,0.4)', 'rgba(255,99,132,0.4)'],
        hoverBorderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)'],
        data: [subject1Data, subject2Data]
      }
    ]
  };

  return (
    <div>
      <h2>Progress Chart</h2>
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false // Ensure chart resizes properly
        }}
      />
    </div>
  );
};

export default ProgressChart;
