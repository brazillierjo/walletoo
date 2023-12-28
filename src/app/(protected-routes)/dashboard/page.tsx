"use client";

import { CalendarWidget } from "@/src/components/Widgets/CalendarWidget";
import { NotesWidget } from "@/src/components/Widgets/NotesWidget";
import { WeatherWidget } from "@/src/components/Widgets/WeatherWidget";

const Dashboard: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6 p-4 lg:p-8">
      <h1 className="shrink text-xl font-bold">Dashboard</h1>

      <div className="flex flex-col justify-between gap-6 lg:flex-row">
        <div className="flex w-full flex-col gap-6">
          <WeatherWidget />
          <div className="flex flex-col gap-6 lg:flex-row">
            <CalendarWidget />
          </div>
        </div>

        <div>
          <NotesWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
