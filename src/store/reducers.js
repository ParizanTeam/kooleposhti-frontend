import { combineReducers } from 'redux';

import { colorMap } from '../components/StudentProfile/constant';

const initialAuthState = {
  isAuthenticated: false,
};
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        ...action.payload,
      };

    case 'LOGOUT':
      return initialAuthState;

    default:
      return state;
  }
};
let theNewone = localStorage.getItem('chosenColor');
if (theNewone==null) {
  theNewone = 'Pink';
  localStorage.setItem('chosenColor', theNewone);
}
const themeReducer = (state = colorMap[theNewone], action) => {
  switch (action.type) {
    case 'PROFILE_COLOR':
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
});

export default rootReducer;
