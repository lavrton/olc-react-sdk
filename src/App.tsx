import React, {useState, useEffect} from 'react';

// Libraries/Packages
import {Routes, Route} from 'react-router-dom';
import {createStore, StoreType} from 'polotno/model/store';

// components
import GenericSnackbar from './components/GenericUIBlocks/GenericSnackbar';
import CreateTemplate from './components/CreateTemplate';
import TemplateBuilder from './components/TemplateBuilder';
import {createGlobalStyle} from 'styled-components';
// import { Styles } from './customStyles';

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
}

const App: React.FC<AppProps> = ({secretKey, returnRoute, styles}) => {
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
        ${
          styles
            ? Object.entries(styles.root)
                .map(([key, value]) => `${key}: ${value};`)
                .join(' ')
            : ''
        }
          }
        body { background-color: var(--mainBackgroundColor);}`
      : createGlobalStyle`<></>`;

  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={<CreateTemplate returnRoute={returnRoute} />}
        />
        <Route
          path="/template-builder"
          element={<TemplateBuilder store={store} />}
        />
      </Routes>

      {/* SNACKBAR FOR NOTIFICATIONS */}
      <GenericSnackbar />
    </>
  );
};

export default App;
