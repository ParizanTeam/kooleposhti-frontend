import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import store from './store/store';
import './theme/main.scss';
import IranyekanWoff2 from './assets/fonts/woff2/IRANYekanWebRegular.woff2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login, logout } from './store/actions';

const theme = createTheme({
  typography: {
    fontFamily: 'iranyekan, Arial',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'iranyekan';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('iranyekan'), local('iranyekan-Regular'), url(${IranyekanWoff2}) format('woff2');
          unicodeRange: U+200c,U+0621-0628,U+062A-063A,U+0641-0642,U+0644-0648,U+064E-0651,U+0655,U+067E,U+0686,U+0698,U+06A9,U+06AF,U+06BE,U+06CC
        }
      `,
    },
  },
});

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
