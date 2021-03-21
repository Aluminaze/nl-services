const getCurrentDate = (): string => {
  const currentDate: string = new Date().toLocaleDateString("en-US", {
    timeZone: "Europe/Minsk",
  });
  const [month, date, year] = currentDate.split("/");

  return `${date}/${month}/${year}`;
};

export default getCurrentDate;
