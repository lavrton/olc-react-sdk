import React, { useState, useEffect } from 'react';


// Libraries/Packages
import { Routes, Route } from "react-router-dom";
import { createStore, StoreType } from 'polotno/model/store';

// components
import GenericSnackbar from './components/GenericUIBlocks/GenericSnackbar';
import CreateTemplate from './components/CreateTemplate';
import { TemplateBuilder } from './index';


// Initialize Plotno Store
const initializeStore = () => {
  return createStore({
    key:"ysCpKe5xuksqn5IdNqHJ",
    // you can hide back-link on a paid license
    // but it will be good if you can keep it for Polotno project support
    showCredit: false,
  });
};

function App() {
  const [store, setStore] = useState<StoreType>(initializeStore);

  const currentPath = window?.location?.pathname;

  useEffect(() => {
    if (currentPath === '/create-template') {
      const newStore = initializeStore();
      setStore(newStore);
    }
  }, [currentPath]);

  
  return (
    <>
      <Routes>
        <Route path="/" element={<CreateTemplate />} />
        <Route path="/template-builder" element={<TemplateBuilder store={store} />} />
      </Routes>

      {/* SNACKBAR FOR NOTIFICATIONS */}
      <GenericSnackbar/>
    </>
  );
}

export default App;