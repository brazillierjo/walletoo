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
        type: "donut",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
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
    <Card className="p-4">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>

      <div className="mx-auto w-full lg:w-2/3">
        <ApexCharts options={chartData.options} series={chartData.series} type="donut" />
      </div>
    </Card>
  );
};

export default PieChart;
