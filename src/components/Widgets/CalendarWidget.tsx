"use client";

import { useState } from "react";
import { userAtom } from "@/src/atoms/user.atom";
import { Calendar } from "@/src/components/ui/calendar";
import { Card } from "@/src/components/ui/card";
import { getLocale } from "@/src/utils/locales";
import { enUS, fr } from "date-fns/locale";
import { useAtom } from "jotai";

export const CalendarWidget: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const locale = getLocale(user?.lang);

  return (
    <Card className="w-fit">
      <Calendar mode="single" selected={date} onSelect={setDate} locale={fr} className="rounded-md border" />
    </Card>
  );
};
