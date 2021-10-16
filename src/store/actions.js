export const login = uid => {
  return {
    type: 'LOGIN',
    payload: {
      uid: uid,
    },
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
