const getCurrentDate = (inputDate: string): string => {
  if (inputDate) {
    const [month, date, year] = inputDate.split("/");

    return `${date}/${month}/${year}`;
  }

  return "";
};

export default getCurrentDate;
