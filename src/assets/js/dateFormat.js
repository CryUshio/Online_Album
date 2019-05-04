const completeZero = (num) => String(num).padStart(2, '0');

const format = (date) => {
  const _date = new Date(date * 1000);
  const year = _date.getFullYear();
  const month = completeZero(_date.getMonth() + 1);
  const day = completeZero(_date.getDate());
  const hour = completeZero(_date.getHours());
  const minute = completeZero(_date.getMinutes());
  const second = completeZero(_date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export default format;
