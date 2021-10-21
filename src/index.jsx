import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routes/AppRouter';
import store from './store/store';
import './theme/main.scss';
import IranyekanWoff2 from './assets/fonts/woff2/IRANYekanWebRegular.woff2';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

const cacheLtr = createCache({
  key: 'muiltr',
  prepend: true,
});

const rtl = true;

const theme = createTheme({
  direction: 'rtl',
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
      <CacheProvider value={rtl ? cacheRtl : cacheLtr}>
        <React.StrictMode>
          <Provider store={store}>
            <AppRouter />
          </Provider>
        </React.StrictMode>
    </CacheProvider>
      </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
