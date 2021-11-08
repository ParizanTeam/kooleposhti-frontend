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
