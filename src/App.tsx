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
      {/* <TemplateBuilder apiKey="aqsqwlksjddk" secret="ysCpKe5xuksqn5IdNqHJ" /> */}
      <Button onClick={handleOpen} style={buttonStyles}>
        Button
      </Button>
      <Typography variant="p" style={typoStyles}>
        Typography
      </Typography>
      <CircularProgress />
      <Dialog
        customStyles={dialogStyles}
        open={open}
        handleClose={handleClose}
        title="Delete Template"
        subHeading="Are you sure you want to delete this Template?"
        desscription="This template will be deleted from your Templates list but will
            still be included in associated orders."
        onSubmit={() => {}}
        onCancel={handleClose}
        cancelText="Cancel"
        submitText="Submit"
      />
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={4} lg={3} xl={3}>
            <Typography variant="p" style={typoStyles}>
              Item 1
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={6} md={4} lg={3} xl={3}>
            <Typography variant="p" style={typoStyles}>
              Item 2
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={6} md={4} lg={3} xl={3}>
            <Typography variant="p" style={typoStyles}>
              Item 3
            </Typography>
          </GridItem>
          <GridItem xs={12} sm={6} md={4} lg={3} xl={3}>
            <Typography variant="p" style={typoStyles}>
              Item 4
            </Typography>
          </GridItem>
        </GridContainer>
      </div>
    </>
  );
}

export default App;
