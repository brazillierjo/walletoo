"use client";

import { CalendarWidget } from "@/src/components/Widgets/CalendarWidget";
import { WeatherWidget } from "@/src/components/Widgets/WeatherWidget";

const Dashboard: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="shrink text-xl font-bold">Dashboard</h1>

      <div className="flex flex-wrap gap-6">
        <WeatherWidget />
        <CalendarWidget />
      </div>
    </div>
  );
};

export default Dashboard;
