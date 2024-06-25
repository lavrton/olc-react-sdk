import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App'
import './index.scss'

// fonts
import "@fontsource/inter/400.css"; // Weight 400
import '@fontsource/inter/700.css'; // Weight 700
import '@fontsource/inter/600.css'; // Weight 700

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
          <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
