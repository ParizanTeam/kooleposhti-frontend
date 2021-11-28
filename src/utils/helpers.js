export const convertNumberToPersian = input => {
  input = `${input}`;
  console.log(input);
  const persian = { 0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '۴', 5: '۵', 6: '۶', 7: '۷', 8: '۸', 9: '۹' };
  let res = '';
  for (let i = 0; i < input.length; i++) {
    let char = input.charAt(i);
    if (persian[char]) {
      char = persian[char];
    }
    res += char;
  }
  return res;
};

export const formatPrice = input => {
  let count = 0;
  let res = '';
  input = input.toString();
  for (let i = input.length - 1; i > -1; i--) {
    const char = input.charAt(i);
    res = char + res;
    count += 1;
    if (count % 3 == 0 && i != 0) {
      res = ',' + res;
    }
  }
  return res;
};


export const changeDateFormat = (input) => {
  const JDate = require('jalali-date');
  const jdate = new JDate(input.split("-"));
  return convertNumberToPersian(jdate.format('dddd DD MMMM YYYY'));
};

export const dateDiff = (input) => {
  const JDate = require('jalali-date');
  const jdate = new JDate(input.split("-"));
  var msDiff = jdate.toGregorian().getTime() - new Date().getTime(); //Future date - current date
  //days till that day
  return  Math.floor(msDiff / (1000 * 60 * 60 * 24));
};

