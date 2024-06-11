import React, { useState } from 'react';
import {TemplateBuilder} from './index';

// components
import Button from './components/GenericUIBlocks/Button';
import Typography from './components/GenericUIBlocks/Typography';
import CircularProgress from './components/GenericUIBlocks/CircularProgress';
import Dialog from './components/GenericUIBlocks/Dialog';
import { GridContainer, GridItem } from './components/GenericUIBlocks/Grid';

const buttonStyles = {
  fontSize: '30px',
}

const typoStyles = {
  fontSize: '30px',
  color: "orange"
}

const dialogStyles = {
  maxWidth: "450px",
  minHeight: "300px",
}

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = ()=>{
    setOpen(true);
  };

  const handleClose = ()=>{
    setOpen(false);
  };

  return (
    <>
      <TemplateBuilder apiKey="aqsqwlksjddk" secret="ysCpKe5xuksqn5IdNqHJ" />
      <Button onClick={handleOpen} style={buttonStyles}>
        Button
      </Button>
      <Typography variant="p" style={typoStyles}>Typography</Typography>
      <CircularProgress />
      <Dialog customStyles={dialogStyles} open={open} handleClose={handleClose} />
    </>
  );
}

export default App;
