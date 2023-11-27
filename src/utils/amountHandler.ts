type AmountHandlerType = (amount: number, format: string, currency: string) => string;

const amountHandler: AmountHandlerType = (amount, format, curreny): string => {
    const formatter = new Intl.NumberFormat(format === "EU" ? "fr-FR" : "en-US", {
        style: "decimal",
        maximumFractionDigits: 2,
    });

    const formattedAmount = formatter.format(amount) + " " + curreny;

    return formattedAmount;
};

export default amountHandler;
