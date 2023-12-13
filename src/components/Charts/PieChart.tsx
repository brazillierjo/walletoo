import { Card } from "@/src/components/ui/card";
import { ApexOptions } from "apexcharts";
import ApexCharts from "react-apexcharts";

interface PieChartProps {
  title: string;
  data: number[];
  labels: string[];
}

const PieChart: React.FC<PieChartProps> = ({ title, data, labels }) => {
  const chartData: { series: number[]; options: ApexOptions } = {
    series: data,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: labels,
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
    <Card className="h-full p-4 ring">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      <div className="mx-auto w-full lg:w-2/3">
        <ApexCharts options={chartData.options} series={chartData.series} type="pie" />
      </div>
    </Card>
  );
};

export default PieChart;
