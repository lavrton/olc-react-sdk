import React, { useState, useEffect } from 'react';

// Libraries/Packages
import { Routes, Route } from "react-router-dom";
import { createStore, StoreType } from 'polotno/model/store';

// components
import GenericSnackbar from './components/GenericUIBlocks/GenericSnackbar';
import CreateTemplate from './components/CreateTemplate';
import { TemplateBuilder } from './index';
import ThemeChanger from './components/ThemeChanger';
import { useDispatch, useSelector } from 'react-redux';
import Button from './components/GenericUIBlocks/Button';
import { resetTheme } from './redux/actions/themeActions';


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
  const [open, setOpen] = useState(false)

  const currentPath = window?.location?.pathname;

  useEffect(() => {
    if (currentPath === '/create-template') {
      const newStore = initializeStore();
      setStore(newStore);
    }
  }, [currentPath]);

const theme = useSelector((state:any)=> state.theme)
const dispatch = useDispatch();

  useEffect(()=>{
    const body= document.querySelector('body');
    if(body){
      body.style.backgroundColor = theme.backgroundColor;
    }
  },[theme])

  const handleOpen = ()=>{
    setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false)
    dispatch(resetTheme())
  }

  return (
    <div style={{...theme, color: theme.primaryColor}}>
      <Button onClick={handleOpen}>Change Theme</Button>
      <ThemeChanger open={open} handleClose={handleClose} />
      <Routes>
        <Route path="/" element={<CreateTemplate />} />
        <Route
          path="/template-builder"
          element={<TemplateBuilder store={store} />}
        />
      </Routes>

      {/* SNACKBAR FOR NOTIFICATIONS */}
      <GenericSnackbar/>
    </div>
  );
}

export default App;