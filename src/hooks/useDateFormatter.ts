import { useMemo } from "react"

const useDateFormatter = (date: Date, locale: string = "fr-FR") => {
  return useMemo(() => {
    return new Date(date).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
    })
  }, [date, locale])
}

export default useDateFormatter
