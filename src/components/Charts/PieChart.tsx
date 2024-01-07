"use client";

import { Card } from "@/src/components/ui/card";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface PieChartProps {
  title: string;
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ title, data, labels }) => {
  console.log(labels);
  const chartLabels = labels && labels.length > 0 ? labels : ["No Data"];

  const chartData: { series: number[]; options: ApexOptions } = {
    series: data,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: chartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Card className="h-full p-4">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      <Chart options={chartData.options} series={chartData.series} type="pie" />
    </Card>
  );
};

export default PieChart;
