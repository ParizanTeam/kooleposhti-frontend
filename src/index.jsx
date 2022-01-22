import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import store from './store/store';
import './theme/main.scss';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, remove_token } from './store/actions';
import { faIR } from '@mui/material/locale';
import { defaults } from 'chart.js';
defaults.font.family ='iranyekan';

const theme = createTheme(
  {
    typography: {
      fontFamily: 'iranyekan, Arial',
    },
  },
  faIR
);





function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </React.StrictMode>
    </ThemeProvider>
  );
}


let token = localStorage.getItem('access_token');
if (token) {
  store
    .dispatch(login())
    .then(() => {
      ReactDOM.render(<App />, document.getElementById('root'));
    })
    .catch(error => {
      console.log(error);
      store.dispatch(remove_token());
      ReactDOM.render(<App />, document.getElementById('root'));
    });
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
