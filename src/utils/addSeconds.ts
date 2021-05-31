export const addSeconds = (date: Date, seconds: number) => {
  const prevSeconds = date.getSeconds();
  return new Date(2020, 1, 1, 1, 0, seconds + prevSeconds);
};
