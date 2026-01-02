export const getRandomBG = () => {
  const classes = [
    "bg-yellow-500",
    "bg-blue-700",
    "bg-red-600",
    "bg-green-600",
  ];
  return classes[Math.floor(Math.random() * classes.length)];
};

export const getAvatarName = (name) => {
  if (!name) return "";

  return name.split(" ").map(word => word[0]).join("").toUpperCase();
};

export const formatDate = (date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;

};

export const formatDateAndTime = (date) => {
  const dateAndTime = new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata"
  })

  return dateAndTime;
}