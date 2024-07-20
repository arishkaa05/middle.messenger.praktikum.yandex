export const formatDate = (date: string | Date = new Date()): string => {
  let newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  return `${day}.${month}`;
};
