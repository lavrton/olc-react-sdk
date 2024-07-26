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
  createTemplateRoute?: string | null;
  templateBuilderRoute?: string | null;
  olcTemplate?: Record<string, any>;
  onGetOneTemplate?: (payload: any) => Promise<any>;
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
  createTemplateRoute,
  templateBuilderRoute,
  olcTemplate,
  onGetOneTemplate,
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
            olcTemplate={olcTemplate}
            returnRoute={returnRoute}
            createTemplateRoute={createTemplateRoute}
            templateBuilderRoute={templateBuilderRoute}
            onGetOneTemplate={onGetOneTemplate}
            onGetTemplates={onGetTemplates}
            onGetCustomFields={onGetCustomFields}
            onSubmit={onSubmit}
          />
        </Router>
      </Provider>
    </>
  );
};

// Example to run the project locally for development. Comment out these lines when building the application

// const rootElement = document.getElementById('root');
// if (rootElement) {
//   console.log("React SDK Loaded");
//   TemplateBuilder({
//     container: rootElement,
//     secretKey: import.meta.env.VITE_APP_PLOTNO_API_KEY,
//     basicAuthUsername: import.meta.env.VITE_APP_BASIC_AUTH_USERNAME,
//     basicAuthPassword: import.meta.env.VITE_APP_BASIC_AUTH_PASSWORD,
//     // onGetOneTemplate: getOneTemplate,
//     // olcTemplate: olcTemplateData,
//     // onGetTemplates: getAllTemplatesByTab,
//     // onSubmit: createTemplate,
//     styles: {}
//   });
// } else {
//   console.error("Root element '#root' not found in the document.");
// }

export default TemplateBuilder;
