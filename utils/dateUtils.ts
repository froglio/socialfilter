export const formatDateToBrazilian = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = date.getDate().toString().padStart(2, "0");
  const monthNames = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month} de ${year}`;
};
