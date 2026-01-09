export default defineNuxtPlugin(() => {
  const formatPrice = (value: any) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      value = 0;
    }
    let formatter = new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    });
    return formatter.format(Number(value));
  };

  const formatDigit = (value: any) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      value = 0;
    }
    let formatter = new Intl.NumberFormat("en-US");
    return formatter.format(Number(value));
  };

  const formatDateTH = (value: Date) => {
    let formatter = new Date(value).toLocaleDateString("th-TH");
    return formatter;
  };

  const formatDateTextTH = (value: Date) => {
    if (value === null || value === undefined) {
      return "ไม่ระบุวันที่";
    }
    let formatter = new Date(value).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formatter;
  };

  return {
    provide: {
      formatPrice: formatPrice,
      formatDigit: formatDigit,
      formatDateTH: formatDateTH,
      formatDateTextTH: formatDateTextTH,
    },
  };
});
