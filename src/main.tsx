import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App'
import './index.css'
import store from './redux/store';

// Snackbar
import SnackbarProvider from 'react-simple-snackbar';

// fonts
import "@fontsource/inter/400.css"; // Weight 400
import '@fontsource/inter/700.css'; // Weight 700
import '@fontsource/inter/600.css'; // Weight 700

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>
);
