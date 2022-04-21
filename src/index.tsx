import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store'
import { enableMapSet } from "immer"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'Segoe UI',
      "Averta CY Bold",
      "Raleway"
    ].join(','),
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
enableMapSet()
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
