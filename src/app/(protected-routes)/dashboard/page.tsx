import { CalendarWidget } from "@/src/components/Widgets/CalendarWidget";
import { WeatherWidget } from "@/src/components/Widgets/WeatherWidget";

const Dashboard: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="shrink text-xl font-bold">Dashboard</h1>

      <div className="grid-cols-auto-fit grid grid-flow-row-dense gap-4">
        <CalendarWidget />
        <WeatherWidget />
      </div>
    </div>
  );
};

export default Dashboard;
