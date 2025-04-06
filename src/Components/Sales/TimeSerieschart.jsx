


// import * as React from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';

// const chartData = [
//   { date: "2023-01-10", leads: 850, plannedVisits: 750, actualVisits: 480, conversions: 280 },
//   { date: "2023-01-09", leads: 800, plannedVisits: 400, actualVisits: 410, conversions: 260 },
//   { date: "2023-01-08", leads: 350, plannedVisits: 550, actualVisits: 420, conversions: 840 },
//   { date: "2023-01-07", leads: 700, plannedVisits: 900, actualVisits: 400, conversions: 320 },
//   { date: "2023-01-06", leads: 650, plannedVisits: 550, actualVisits: 580, conversions: 200 },
//   { date: "2023-01-05", leads: 100, plannedVisits: 160, actualVisits: 350, conversions: 180 },
//   { date: "2023-01-04", leads: 550, plannedVisits: 120, actualVisits: 300, conversions: 160 },
//   { date: "2023-01-03", leads: 230, plannedVisits: 200, actualVisits: 150, conversions: 140 },
//   { date: "2023-01-02", leads: 150, plannedVisits: 350, actualVisits: 220, conversions: 120 },
//   { date: "2023-01-01", leads: 400, plannedVisits: 300, actualVisits: 200, conversions: 100 }
// ];

// export default function LeadConversionChart() {
//   return (
//     <LineChart
//       dataset={chartData.map(item => ({
//         x: new Date(item.date).getTime(),
//         leads: item.leads,
//         plannedVisits: item.plannedVisits,
//         actualVisits: item.actualVisits,
//         conversions: item.conversions
//       }))}
//       xAxis={[{ dataKey: 'x', scaleType: 'time', label: 'Date' }]}
//       series={[
//         { dataKey: 'leads', label: 'Leads', color: '#90caf9', area: true, curveType: 'natural', showMark: true },
//         { dataKey: 'plannedVisits', label: 'Planned Visits', color: '#a5d6a7', area: true, curveType: 'natural', showMark: true },
//         { dataKey: 'actualVisits', label: 'Actual Visits', color: '#ffcc80', area: true, curveType: 'natural', showMark: true },
//         { dataKey: 'conversions', label: 'Conversions', color: '#ef9a9a', area: true, curveType: 'natural', showMark: true }
//       ]}
//       height={350}
//       margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
//       grid={{ vertical: true, horizontal: true }}
//     />
//   );
// }


import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const chartData = [
  { date: "2023-01-10", leads: 850, plannedVisits: 0, actualVisits: 480, conversions: 0 },
  { date: "2023-01-09", leads: 800, plannedVisits: 400, actualVisits: 410, conversions: 260 },
  { date: "2023-01-08", leads: 350, plannedVisits: 550, actualVisits: 420, conversions: 840 },
  { date: "2023-01-07", leads: 700, plannedVisits: 900, actualVisits: 400, conversions: 320 },
  { date: "2023-01-06", leads: 650, plannedVisits: 550, actualVisits: 580, conversions: 200 },
  { date: "2023-01-05", leads: 100, plannedVisits: 160, actualVisits: 350, conversions: 180 },
  { date: "2023-01-04", leads: 550, plannedVisits: 120, actualVisits: 300, conversions: 160 },
  { date: "2023-01-03", leads: 230, plannedVisits: 200, actualVisits: 150, conversions: 140 },
  { date: "2023-01-02", leads: 150, plannedVisits: 350, actualVisits: 220, conversions: 120 },
  { date: "2023-01-01", leads: 400, plannedVisits: 300, actualVisits: 200, conversions: 100 }
];

export default function LeadConversionChart() {
  return (
    <LineChart
      dataset={chartData.map(item => ({
        x: new Date(item.date).getTime(),
        leads: item.leads,
        plannedVisits: item.plannedVisits,
        actualVisits: item.actualVisits,
        conversions: item.conversions
      }))}
      xAxis={[
        {
          dataKey: 'x',
          scaleType: 'time',
          label: 'Date',
          valueFormatter: (date) =>
            new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
        }
      ]}
      series={[
        { dataKey: 'leads', label: 'Leads', color: '#90caf9', area: true, curveType: 'natural', showMark: true },
        { dataKey: 'plannedVisits', label: 'Planned Visits', color: '#a5d6a7', area: true, curveType: 'natural', showMark: true },
        { dataKey: 'actualVisits', label: 'Actual Visits', color: '#ffcc80', area: true, curveType: 'natural', showMark: true },
        { dataKey: 'conversions', label: 'Conversions', color: '#ef9a9a', area: true, curveType: 'natural', showMark: true }
      ]}
      height={400}
      margin={{ left: 50, right: 50, top: 30, bottom: 50 }}
      grid={{ vertical: true, horizontal: true }}
      sx={{
        '.MuiChartsAxis-line': { stroke: '#000' }, // dark axis line
      }}
      axisHighlight={{
        x: 'cross',
        y: 'cross',
      }}
    />
    );
  }






// ---------------

// import React, { useState } from "react";
// import Chart from "react-apexcharts";

// const ApexChart = () => {
//   // Simulate converting timestamps to readable dates
//   const rawData = [
//     [1327359600000, 30.95],
//     [1335132000000, 32.62],
//     [1335218400000, 32.4],
//     [1335304800000, 33.13],
//     [1335391200000, 33.26],
//     [1335477600000, 33.58],
//     [1335736800000, 33.55],
//     [1335823200000, 33.77],
//     [1335909600000, 33.76],
//     [1335996000000, 33.32],
//   ];

//   const labels = rawData.map(([timestamp]) =>
//     new Date(timestamp).toLocaleDateString("en-GB")
//   );
//   const data = rawData.map(([, value]) => value);

//   const [state] = useState({
//     series: [
//       {
//         name: "Leads",
//         data: data,
//       },
//     ],
//     options: {
//       chart: {
//         type: "line",
//         toolbar: {
//           show: false,
//         },
//       },
//       xaxis: {
//         categories: labels,
//         title: {
//           text: "Date",
//         },
//       },
//       yaxis: {
//         title: {
//           text: "Value",
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "smooth",
//       },
//       tooltip: {
//         x: {
//           format: "dd MMM yyyy",
//         },
//       },
//     },
//   });

//   return (
//     <div className="rounded-lg bg-white p-4 shadow-md w-full">
//       <h2 className="text-xl font-semibold mb-4">Lead Conversion Trend</h2>
//       <Chart options={state.options} series={state.series} type="line" height={350} />
//     </div>
//   );
// };

// export default ApexChart;
