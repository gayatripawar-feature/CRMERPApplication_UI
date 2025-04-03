
// import React from 'react';
// import ReactApexChart from 'react-apexcharts';


// const chartData = [
//     { date: "2023-01-01", leads: 400, plannedVisits: 300, actualVisits: 200, conversions: 100 },
//     { date: "2023-01-02", leads: 450, plannedVisits: 350, actualVisits: 220, conversions: 120 },
//     { date: "2023-01-03", leads: 500, plannedVisits: 400, actualVisits: 250, conversions: 140 },
//     { date: "2023-01-04", leads: 550, plannedVisits: 450, actualVisits: 300, conversions: 160 },
//     { date: "2023-01-05", leads: 600, plannedVisits: 500, actualVisits: 350, conversions: 180 },
//     { date: "2023-01-06", leads: 650, plannedVisits: 550, actualVisits: 380, conversions: 200 },
//     { date: "2023-01-07", leads: 700, plannedVisits: 600, actualVisits: 400, conversions: 220 },
//     { date: "2023-01-08", leads: 750, plannedVisits: 650, actualVisits: 420, conversions: 240 },
//     { date: "2023-01-09", leads: 800, plannedVisits: 700, actualVisits: 450, conversions: 260 },
//     { date: "2023-01-10", leads: 850, plannedVisits: 750, actualVisits: 480, conversions: 280 },
//     { date: "2023-01-11", leads: 900, plannedVisits: 800, actualVisits: 500, conversions: 300 },
//     { date: "2023-01-12", leads: 950, plannedVisits: 850, actualVisits: 530, conversions: 320 },
//     { date: "2023-01-13", leads: 1000, plannedVisits: 900, actualVisits: 550, conversions: 340 },
//     { date: "2023-01-14", leads: 1050, plannedVisits: 950, actualVisits: 570, conversions: 360 },
//     { date: "2023-01-15", leads: 1100, plannedVisits: 1000, actualVisits: 600, conversions: 380 },
//     { date: "2023-01-16", leads: 1150, plannedVisits: 1050, actualVisits: 630, conversions: 400 },
//     { date: "2023-01-17", leads: 1200, plannedVisits: 1100, actualVisits: 650, conversions: 420 },
//     { date: "2023-01-18", leads: 1250, plannedVisits: 1150, actualVisits: 680, conversions: 440 },
//     { date: "2023-01-19", leads: 1300, plannedVisits: 1200, actualVisits: 700, conversions: 460 },
//     { date: "2023-01-20", leads: 1350, plannedVisits: 1250, actualVisits: 730, conversions: 480 },
//     { date: "2023-01-21", leads: 1400, plannedVisits: 1300, actualVisits: 750, conversions: 500 },
//     { date: "2023-01-22", leads: 1450, plannedVisits: 1350, actualVisits: 780, conversions: 520 },
//     { date: "2023-01-23", leads: 1500, plannedVisits: 1400, actualVisits: 800, conversions: 540 },
//     { date: "2023-01-24", leads: 1550, plannedVisits: 1450, actualVisits: 830, conversions: 560 },
//     { date: "2023-01-25", leads: 1600, plannedVisits: 1500, actualVisits: 850, conversions: 580 },
//     { date: "2023-01-26", leads: 1650, plannedVisits: 1550, actualVisits: 880, conversions: 600 },
//     { date: "2023-01-27", leads: 1700, plannedVisits: 1600, actualVisits: 900, conversions: 620 },
//     { date: "2023-01-28", leads: 1750, plannedVisits: 1650, actualVisits: 930, conversions: 640 },
//     { date: "2023-01-29", leads: 1800, plannedVisits: 1700, actualVisits: 950, conversions: 660 },
//     { date: "2023-01-30", leads: 1850, plannedVisits: 1750, actualVisits: 980, conversions: 680 },
//   ];
  
  
// const ApexChart = () => {
//   const [state, setState] = React.useState({
//     series: [
//       { name: 'Leads', data: chartData.reverse().map(item => item.leads) },
//       { name: 'Planned Visits', data: chartData.reverse().map(item => item.plannedVisits) },
//       { name: 'Actual Visits', data: chartData.reverse().map(item => item.actualVisits) },
//       { name: 'Conversions', data: chartData.reverse().map(item => item.conversions) },
//     ],
//     options: {
//       chart: {
//         type: 'area',
//         stacked: false,
//         height: 350,
//         zoom: {
//           type: 'x',
//           enabled: true,
//           autoScaleYaxis: true,
//         },
//         toolbar: {
//           autoSelected: 'zoom',
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       markers: {
//         size: 0,
//       },
//       title: {
//         text: 'Lead Conversion Trend',
//         align: 'left',
//       },
//       fill: {
//         type: 'gradient',
//         gradient: {
//           shadeIntensity: 1,
//           inverseColors: false,
//           opacityFrom: 0.5,
//           opacityTo: 0,
//           stops: [0, 90, 100],
//         },
//       },
//       yaxis: {
//         title: {
//           text: 'Count',
//         },
//       },
//       xaxis: {
//         type: 'datetime', // We'll use datetime to manage x-axis as date
//         categories: chartData.reverse().map(item => item.date), // Reverse the categories so they start from the right
//         labels: {
//           rotate: -45, // Rotate x-axis labels for better readability
//         },
//       },
//       tooltip: {
//         shared: false,
//         y: {
//           formatter: function (val) {
//             return val;
//           },
//         },
//       },
//     },
//   });

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default ApexChart;


import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const chartData = [
  { date: "2023-01-10", leads: 850, plannedVisits: 750, actualVisits: 480, conversions: 280 },
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
      xAxis={[{ dataKey: 'x', scaleType: 'time', label: 'Date' }]}
      series={[
        { dataKey: 'leads', label: 'Leads', color: '#90caf9', area: true, curveType: 'natural', showMark: true },
        { dataKey: 'plannedVisits', label: 'Planned Visits', color: '#a5d6a7', area: true, curveType: 'natural', showMark: true },
        { dataKey: 'actualVisits', label: 'Actual Visits', color: '#ffcc80', area: true, curveType: 'natural', showMark: true },
        { dataKey: 'conversions', label: 'Conversions', color: '#ef9a9a', area: true, curveType: 'natural', showMark: true }
      ]}
      height={350}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}
