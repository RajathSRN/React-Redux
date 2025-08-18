export const toDisplayableDateFormat = (dateString) => {
  let date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleDateString("en-US", {
    month: "short",
  })} ${date.getFullYear()} ${date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`;
};
