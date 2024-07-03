import React from 'react';
import ReactDOM from 'react-dom/client';
import { setApiKey, setMode } from './utils/helper';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.scss';

// fonts
import '@fontsource/inter/400.css'; // Weight 400
import '@fontsource/inter/700.css'; // Weight 700
import '@fontsource/inter/600.css'; // Weight 700

// utils
import {CustomCSSProperties} from './utils/customStyles';

interface TemplateBuilderProps {
  container: HTMLElement | null;
  apiKey: string;
  mode: 'test' | 'live';
  secretKey: string;
  returnRoute?: string | null;
  styles?: {
    root?: CustomCSSProperties;
  };
}

const TemplateBuilder = ({
  container,
  apiKey,
  secretKey,
  mode,
  returnRoute,
  styles,
}: TemplateBuilderProps): void => {
  if (!container) {
    throw new Error('Root element not found');
  }
  if (!apiKey) {
    throw new Error('apiKey not found');
  }
  if (!secretKey) {
    throw new Error('secretKey not found');
  }
  setApiKey(apiKey);
  setMode(mode);
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App 
          secretKey={secretKey} 
          styles={styles}
          returnRoute={returnRoute} />
        </Provider>
      </Router>
    </React.StrictMode>
  );
};

// Example to run the project locally for development. Comment out these lines when building the application

const rootElement = document.getElementById('root');
if (rootElement) {
  TemplateBuilder({
    container: rootElement,
    apiKey: import.meta.env.VITE_APP_ACCESS_TOKEN,
    mode: 'live',
    secretKey: import.meta.env.VITE_APP_PLOTNO_API_KEY,
    returnRoute: '/',
    // styles: {}
  });
} else {
  console.error("Root element '#root' not found in the document.");
}

export default TemplateBuilder;
