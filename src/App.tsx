import React, {useState} from 'react';
import {TemplateBuilder} from './index';

// images
import Delete from './assets/modal-icons/del'

// components
import Button from './components/GenericUIBlocks/Button';
import Typography from './components/GenericUIBlocks/Typography';
import CircularProgress from './components/GenericUIBlocks/CircularProgress';
import Dialog from './components/GenericUIBlocks/Dialog';
import {GridContainer, GridItem} from './components/GenericUIBlocks/Grid';
import Input from './components/GenericUIBlocks/Input';


const buttonStyles = {
  fontSize: '30px',
};

const typoStyles = {
  fontSize: '30px',
  color: 'orange',
};

const dialogStyles = {
  maxWidth: '450px',
  minHeight: '600px',
};

function App() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
        icon={<Delete/>}
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
          <GridItem lg={12}>
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
          <GridItem lg={12}>
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
        </GridContainer>
      </Dialog>
    </>
  );
}

export default App;
