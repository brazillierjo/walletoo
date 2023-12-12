export const temperaturesUnit = [
  {
    name: "Celsius",
    symbol: "°C",
  },
  {
    name: "Fahrenheit",
    symbol: "°F",
  },
];

export const convertTemperature = (temperature: number, unit: string) => {
  switch (unit) {
    case "Fahrenheit":
      return (((temperature - 273.15) * 9) / 5 + 32).toFixed(0);
    case "Celsius":
      return (temperature - 273.15).toFixed(0);
    default:
      return temperature.toFixed(0);
  }
};
