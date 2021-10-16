import { combineReducers } from 'redux';

const initialAuthState = { isAuthenticated: false, uid: null };
const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        uid: action.payload.uid,
      };

    case 'LOGOUT':
      return initialAuthState;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
