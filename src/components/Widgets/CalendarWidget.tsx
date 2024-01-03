"use client";

import { useState } from "react";
import { userAtom } from "@/src/atoms/user.atom";
import { Calendar } from "@/src/components/ui/calendar";
import { Card } from "@/src/components/ui/card";
import { getLocale } from "@/src/utils/locales";
import { useAtom } from "jotai";

export const CalendarWidget: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const locale = getLocale(user?.lang);

  return (
    <Card className="h-fit min-h-[350px] w-full flex-shrink-0 px-4 pb-2 pt-6 sm:w-1/2 lg:w-[300px]">
      <h4 className="text-center text-sm font-semibold uppercase">Mon calendrier</h4>

      <div className="mt-2 flex justify-center">
        <Calendar mode="single" selected={date} onSelect={setDate} locale={locale} />
      </div>
    </Card>
  );
};
