import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// fonts
import "@fontsource/inter/400.css"; // Weight 400
import '@fontsource/inter/700.css'; // Weight 700
import '@fontsource/inter/600.css'; // Weight 700

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
