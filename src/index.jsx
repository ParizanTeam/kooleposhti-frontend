import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import store from './store/store';
import './theme/main.scss';
import theme from './theme/theme';
import {  ThemeProvider } from '@mui/material/styles';


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

ReactDOM.render(<App />, document.getElementById('root'));
