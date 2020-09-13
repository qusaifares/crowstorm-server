const hours = (num: number | string): number => {
  if (typeof num === 'string') num = +num;
  return num * 3600000;
};
export default hours;
