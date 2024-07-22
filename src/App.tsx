import React, { useState, useEffect } from 'react';

// Libraries/Packages
import { Routes, Route } from 'react-router-dom';
import { createStore, StoreType } from 'polotno/model/store';

// components
import CreateTemplate from './components/CreateTemplate';
import TemplateBuilder from './components/TemplateBuilder';
import { createGlobalStyle } from 'styled-components';

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
  returnRoute?: string | null;
  styles?: any;
  onGetTemplates?: (payload: any) => Promise<any>;
  onGetCustomFields?: () => Promise<any>;
  onSubmit?: (payload: any) => Promise<any>;
}

const App: React.FC<AppProps> = ({ secretKey, returnRoute, styles, onGetCustomFields, onGetTemplates, onSubmit }) => {
  const [store, setStore] = useState<StoreType>(initializeStore(secretKey));

  const currentPath = window?.location?.pathname;

  useEffect(() => {
    if (currentPath === '/create-template') {
      const newStore = initializeStore(secretKey);
      setStore(newStore);
    }
  }, [currentPath]);

  const GlobalStyle =
    styles && Object.keys(styles).length
      ? createGlobalStyle`
        :root {
        ${styles
          ? Object.entries(styles.root)
            .map(([key, value]) => `${key}: ${value};`)
            .join(' ')
          : ''
        }
          }
        `
      : createGlobalStyle`<></>`;

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/create-template"
          element={<CreateTemplate returnRoute={returnRoute} />}
        />
        <Route
          path="/template-builder"
          element={<TemplateBuilder store={store} returnRoute={returnRoute} onGetTemplates={onGetTemplates} onGetCustomFields={onGetCustomFields} onSubmit={onSubmit} />}
        />
      </Routes>
    </>
  );
};

export default App;
