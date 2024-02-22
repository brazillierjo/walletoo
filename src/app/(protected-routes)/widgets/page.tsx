"use client";

import Calculator from "@/src/components/Widgets/CalculatorWidget";
import { CalendarWidget } from "@/src/components/Widgets/CalendarWidget";
import { NotesWidget } from "@/src/components/Widgets/NotesWidget";
import { WeatherWidget } from "@/src/components/Widgets/WeatherWidget";

const Widgets: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-6 p-4 lg:p-8">
      <h1 className="shrink text-xl font-bold">Mes widgets</h1>

      <div className="flex flex-wrap gap-6">
        <WeatherWidget />
        <CalendarWidget />
        <Calculator />
        <NotesWidget />
      </div>
    </div>
  );
};

export default Widgets;
