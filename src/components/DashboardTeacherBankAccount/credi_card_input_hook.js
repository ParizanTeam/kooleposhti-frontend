import React from 'react';

const useCreditCardInput = () => {
  const [partValues, setPartValues] = React.useState({
    part1: '',
    part2: '',
    part3: '',
    part4: '',
  });

  return {
    handleChange: e => {
      const { maxLength, value, name } = e.target;
      const [fieldName, fieldIndex] = name.split('-');

      // Check if they hit the max character length
      if (value.length >= maxLength) {
        // Check if it's not the last input field
        if (parseInt(fieldIndex, 10) < 4) {
          // Get the next input field
          const nextSibling = document.querySelector(`input[name=part-${parseInt(fieldIndex, 10) + 1}]`);

          // If found, focus the next field
          if (nextSibling !== null) {
            nextSibling.focus();
          }
        }
      }

      setPartValues({
        ...value,
        [`part${fieldIndex}`]: value,
      });
    },
  };
};

export default useCreditCardInput;