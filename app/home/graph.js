import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Graph = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/data`)
      .then(response => {
        const fetchedData = response.data;
        console.log('Fetched Data:', fetchedData); // Log fetched data

        // Prepare data for Chart.js
        const labels = fetchedData.map((_, index) => `Point ${index + 1}`);
        const cvvData = fetchedData.map(item => item.cvv);
        const ssnData = fetchedData.map(item => item.ssn);
        const checkerData = fetchedData.map(item => item.checker);
        const floodsData = fetchedData.map(item => item.floods);

        const chartData = {
          labels,
          datasets: [
            {
              label: 'CVV',
              data: cvvData,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
            {
              label: 'SSN',
              data: ssnData,
              borderColor: 'rgba(153,102,255,1)',
              fill: false,
            },
            {
              label: 'Checker',
              data: checkerData,
              borderColor: 'rgba(255,159,64,1)',
              fill: false,
            },
            {
              label: 'Floods',
              data: floodsData,
              borderColor: 'rgba(54,162,235,1)',
              fill: false,
            }
          ]
        };

        console.log('Chart Data:', chartData); // Log prepared chart data
        setData(chartData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=''>
      <Line data={data} />
    </div>
  );
};

export default Graph;
