export const getOrderDateValue = (date: string, time = "00:00") => {
  const parsed = parseOrderDate(date, time);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const parseOrderDate = (date: string, time: string) => {
  const monthMap: Record<string, number> = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const match = date.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s*(\d{4})$/);

  if (match) {
    const [, monthName, day, year] = match;
    const [hours, minutes] = time.split(":").map(Number);

    return new Date(
      Number(year),
      monthMap[monthName],
      Number(day),
      Number.isNaN(hours) ? 0 : hours,
      Number.isNaN(minutes) ? 0 : minutes,
    );
  }

  return new Date(`${date} ${time}`);
};

export const formatOrderDate = (date: string, time: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parseOrderDate(date, time));

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
