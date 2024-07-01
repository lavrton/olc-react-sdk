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

interface TemplateBuilderProps {
  container: HTMLElement | null;
  apiKey: string;
  mode: string;
  builderKey: string;
  returnRoute?: string | null;
  styles?: React.CSSProperties;
}

const TemplateBuilder = ({
  container,
  apiKey,
  mode,
  builderKey,
  returnRoute,
  styles,
}: TemplateBuilderProps): void => {
  if (!container) {
    throw new Error('Root element not found');
  }
  if (!apiKey) {
    throw new Error('apiKey not found');
  }
  if (!builderKey) {
    throw new Error('builderKey not found');
  }
  setApiKey(apiKey);
  setMode(mode);
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App builderKey={builderKey} styles={styles} returnRoute={returnRoute} />
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
    apiKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYiLCJlbWFpbCI6InVzbWFuK2FkbWluQG9wZW5sZXR0ZXJjb25uZWN0LmNvbSIsImFwaUtleUlkIjoiNCIsImlhdCI6MTcxNzUxNDc0MCwiZXhwIjo0ODczMjc0NzQwfQ.D_yEcZ4ZJtM0ArzaYqnV8ggCsT52l4ALbzsX1QkATag',
    mode: 'live',
    builderKey: 'ysCpKe5xuksqn5IdNqHJ',
    returnRoute: '/'
  });
} else {
  console.error("Root element '#root' not found in the document.");
}

export default TemplateBuilder;
