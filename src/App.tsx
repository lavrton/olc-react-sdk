import React, { useState, useEffect } from 'react';
import { TemplateBuilder } from './index';

// Libraries/Packages
import { Routes, Route } from "react-router-dom";
import { createStore } from 'polotno/model/store';

// components
import Button from './components/GenericUIBlocks/Button';
import Typography from './components/GenericUIBlocks/Typography';
import CircularProgress from './components/GenericUIBlocks/CircularProgress';
import Dialog from './components/GenericUIBlocks/Dialog';
import { GridContainer, GridItem } from './components/GenericUIBlocks/Grid';
import Input from './components/GenericUIBlocks/Input';
import Snackbar from './components/GenericUIBlocks/Snackbar';
import GeneralSelect from './components/GenericUIBlocks/GeneralSelect';
import GeneralTootip from './components/GenericUIBlocks/GeneralTooltip';
import CreateTemplate from './components/CreateTemplate';

// const buttonStyles = {
//   fontSize: '30px',
// };

// const typoStyles = {
//   fontSize: '30px',
//   color: 'orange',
//   maxWidth: "fit-content"
// };

// const dialogStyles = {
//   maxWidth: '450px',
//   minHeight: '600px',
// };

// const progressStyles = {
//   width: '50px',
//   height: '50px',
// };

// Initialize Plotno Store
const initializeStore = () => {
  return createStore({
    key: 'ysCpKe5xuksqn5IdNqHJ',
    // you can hide back-link on a paid license
    // but it will be good if you can keep it for Polotno project support
    showCredit: false,
  });
};


function App() {
  const [store, setStore] = useState(initializeStore);

  // const [open, setOpen] = useState(false);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');


  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const selectOptions = [
  //   { value: 'chocolate', label: 'Chocolate' },
  //   { value: 'strawberry', label: 'Strawberry' },
  //   { value: 'vanilla', label: 'Vanilla' },
  // ];

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
      <Snackbar />








      {/* <> DUMMY COMPONENTS 
      TODO: Remove Later
      <Button onClick={handleOpen} style={buttonStyles}>
        Button
      </Button>
      <Typography className="tool" variant="p" style={typoStyles}>
        Typography
      </Typography>
      <GeneralTootip anchorSelect=".tool" place="top" title="Hello world!" />
      <CircularProgress style={progressStyles} />
      <Dialog
        icon={<Delete />}
        customStyles={dialogStyles}
        open={open}
        handleClose={handleClose}
        title="Modal"
        subHeading=""
        description="Description"
        cancelText="Cancel"
        submitText="Submit"
        onSubmit={() => {}}
        onCancel={() => {}}
      >
        <GridContainer>
          <GridItem lg={12} md={12} sm={12} xs={12}>
            <Input
              label="First Name"
              variant="input"
              type="text"
              value={firstName}
              onChange={(e: any) => setFirstName(e.target.value)}
              placeholder="First Name"
              error="Please enter valid name"
            />
          </GridItem>
          <GridItem lg={12} md={12} sm={12} xs={12}>
            <Input
              label="Last Name"
              variant="input"
              type="text"
              value={lastName}
              onChange={(e: any) => setLastName(e.target.value)}
              placeholder="Last Name"
              error="Please enter valid name"
            />
          </GridItem>
          <GridItem lg={12} md={12} sm={12} xs={12}>
            <GeneralSelect
              options={selectOptions}
              placeholder="Select a tag"
              error="select atleast one tag"
              label="Select a tag"
            />
          </GridItem>
        </GridContainer>
      </Dialog>
      <button onClick={() => openSnackbar(<Snackbar />, 1000)}>
        Click me to open the Snackbar!
      </button>
      <GridContainer>
        <GridItem xl={12} lg={12} md={12}>
          <GeneralSelect
            options={selectOptions}
            placeholder="Select a tag"
            error="select atleast one tag"
            label="Select a tag"
          />
        </GridItem>
      </GridContainer>
      </> */}
    </>
  );
}

export default App;