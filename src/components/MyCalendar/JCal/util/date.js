export const getDate = date => {
    const JDate = require('jalali-date');
    const jdate = new JDate;
    return new Date(jdate.getFullYear(), jdate.getMonth(), jdate.getDate());
};

export const checkDate = date =>
  Object.prototype.toString.call(date) === '[object Date]';
