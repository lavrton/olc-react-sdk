import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.scss';

// font families
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// utils
import { CustomCSSProperties } from './utils/customStyles';
import { setAuthUserName, setAuthUserPassword } from './utils/helper';

interface TemplateBuilderProps {
  container: HTMLElement | null;
  secretKey: string;
  basicAuthUsername: string;
  basicAuthPassword: string;
  returnRoute?: string | null;
  onGetTemplates?: (payload: any) => Promise<any>;
  onGetCustomFields?: () => Promise<any>;
  onSubmit?: (payload: any) => Promise<any>;
  styles?: {
    root?: CustomCSSProperties;
  };
}

const TemplateBuilder = ({
  container,
  secretKey,
  basicAuthUsername,
  basicAuthPassword,
  returnRoute,
  onGetTemplates,
  onGetCustomFields,
  onSubmit,
  styles,
}: TemplateBuilderProps): void => {
  if (!container) {
    throw new Error('Root element not found');
  }
  if (!secretKey) {
    throw new Error('secretKey not found');
  }
  if (!basicAuthUsername) {
    throw new Error('basicAuthUsername not found');
  }
  if (!basicAuthPassword) {
    throw new Error('basicAuthPassword not found');
  }
  setAuthUserName(basicAuthUsername);
  setAuthUserPassword(basicAuthPassword);
  const root = ReactDOM.createRoot(container);
  root.render(
    <>
      <Provider store={store}>
        <Router>
          <App
            secretKey={secretKey}
            styles={styles}
            returnRoute={returnRoute}
            onSubmit={onSubmit}
            onGetTemplates={onGetTemplates}
            onGetCustomFields={onGetCustomFields}
          />
        </Router>
      </Provider>
    </>
  );
};

// Example to run the project locally for development. Comment out these lines when building the application

const rootElement = document.getElementById('root');
if (rootElement) {
  console.log("React SDK Loaded");
  TemplateBuilder({
    container: rootElement,
    secretKey: import.meta.env.VITE_APP_PLOTNO_API_KEY,
    basicAuthUsername: import.meta.env.VITE_APP_BASIC_AUTH_USERNAME,
    basicAuthPassword: import.meta.env.VITE_APP_BASIC_AUTH_PASSWORD,
    // onGetTemplates: getAllTemplatesByTab,
    styles: {}
  });
} else {
  console.error("Root element '#root' not found in the document.");
}

export default TemplateBuilder;
