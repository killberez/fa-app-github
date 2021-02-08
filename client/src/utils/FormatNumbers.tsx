import * as d3 from "d3";

export default (value: number, formattingOption: string) => {
  if (formattingOption === "none") return value;

  const localeUS = d3.formatDefaultLocale({
    decimal: ".",
    thousands: "\u00a0",
    grouping: [3],
    currency: ["$\u00a0", ""],
    percent: "%",
  });

  const localeEU = d3.formatDefaultLocale({
    decimal: ",",
    thousands: "\u00a0",
    grouping: [3],
    currency: ["", "\u00a0€"],
    percent: "%",
  });

  let format = localeUS.format(",.0f");

  switch (formattingOption) {
    case "euFormat":
      format = localeUS.format(",.0f");
      return format(value).replace(/,/, " ");
    case "siUs":
      format = localeUS.format(".4~s");
      return format(value).replace(/G/, "B");
    case "siEu":
      format = localeEU.format(".4~s");
      return format(value).replace(/G/, "B");
    case "currencyUs":
      format = localeUS.format("");
      return `$ ${format(value)}`;
    case "currencyEu":
      format = localeEU.format("");
      return `${format(value)} €`;
    case "siCurrencyUs":
      format = localeUS.format("$,.4~s");
      return format(value).replace(/G/, "B");
    case "siCurrencyEu":
      format = localeEU.format("$,.4~s");
      return format(value).replace(/G/, "B");
    case "percentUs":
      format = localeUS.format("");
      return `${format(value)}%`;
    case "percentEu":
      format = localeEU.format("");
      return `${format(value)}%`;
    default:
      return format(value).replace(/,/, " ");
  }
};
