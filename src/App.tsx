import React, {useState, useEffect} from 'react';

// Libraries/Packages
import {Routes, Route} from 'react-router-dom';
import {createStore, StoreType} from 'polotno/model/store';

// components
import CreateTemplate from './components/CreateTemplate';
import TemplateBuilder from './components/TemplateBuilder';
import {createGlobalStyle} from 'styled-components';

// Initialize Plotno Store
const initializeStore = (secretKey: string) => {
  return createStore({
    key: secretKey,
    // you can hide back-link on a paid license
    // but it will be good if you can keep it for Polotno project support
    showCredit: false,
  });
};

interface AppProps {
  secretKey: string;
  platformName?: string | null;
  createTemplateRoute?: string | null;
  templateBuilderRoute?: string | null;
  styles?: any;
  olcTemplate?: Record<string, any>;
  defaultCategory?: string[];
  onReturnAndNavigate?: () => void;
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: any) => Promise<any>;
  onGetCustomFields?: () => Promise<any>;
  onSubmit?: (payload: any) => Promise<any>;
}

const App: React.FC<AppProps> = ({
  secretKey,
  onReturnAndNavigate,
  platformName,
  defaultCategory,
  createTemplateRoute,
  templateBuilderRoute,
  styles,
  olcTemplate,
  onGetOneTemplate,
  onGetCustomFields,
  onGetTemplates,
  onSubmit,
}) => {
  const [store, setStore] = useState<StoreType>(initializeStore(secretKey));

  const currentPath = window?.location?.pathname;

  useEffect(() => {
    if (
      currentPath === createTemplateRoute ||
      currentPath === '/create-template'
    ) {
      const newStore = initializeStore(secretKey);
      setStore(newStore);
    }
  }, [currentPath]);

  const GlobalStyle =
    styles && Object.keys(styles).length
      ? createGlobalStyle`
        :root {
        ${
          styles
            ? Object.entries(styles.root)
                .map(([key, value]) => `${key}: ${value};`)
                .join(' ')
            : ''
        }
          }
        `
      : createGlobalStyle`<></>`;

  return (
    <div className="builder-wrapper">
      <GlobalStyle />
      <Routes>
        <Route
          path={createTemplateRoute || '/create-template'}
          element={
            <CreateTemplate
              onReturnAndNavigate={onReturnAndNavigate}
              createTemplateRoute={createTemplateRoute}
              templateBuilderRoute={templateBuilderRoute}
            />
          }
        />
        <Route
          path={templateBuilderRoute || '/template-builder/:id?'}
          element={
            <TemplateBuilder
              store={store}
              olcTemplate={olcTemplate}
              platformName={platformName}
              defaultCategory={defaultCategory}
              onReturnAndNavigate={onReturnAndNavigate}
              createTemplateRoute={createTemplateRoute}
              onGetOneTemplate={onGetOneTemplate}
              onGetTemplates={onGetTemplates}
              onGetCustomFields={onGetCustomFields}
              onSubmit={onSubmit}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
