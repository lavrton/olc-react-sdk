import React, {useState} from 'react';
import {TemplateBuilder} from './index';
import {useSnackbar} from 'react-simple-snackbar';

// images
import Delete from './assets/images/modal-icons/del';

// components
import Button from './components/GenericUIBlocks/Button';
import Typography from './components/GenericUIBlocks/Typography';
import CircularProgress from './components/GenericUIBlocks/CircularProgress';
import Dialog from './components/GenericUIBlocks/Dialog';
import {GridContainer, GridItem} from './components/GenericUIBlocks/Grid';
import Input from './components/GenericUIBlocks/Input';
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const buttonStyles = {
  fontSize: '30px',
};

const typoStyles = {
  fontSize: '30px',
  color: 'orange',
  maxWidth: "fit-content"
};

const dialogStyles = {
  maxWidth: '450px',
  minHeight: '600px',
};

const progressStyles = {
  width: '50px',
  height: '50px',
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
  
  const options = {
    position: 'bottom-center',
    style: {
      backgroundColor: 'midnightblue',
      border: '2px solid lightgreen',
      color: 'lightblue',
      fontFamily: 'Menlo, monospace',
      fontSize: '20px',
      textAlign: 'center',
    },
    closeStyle: {
      color: 'lightcoral',
      fontSize: '16px',
    },
  };

  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  return (
    <>
      {/* <TemplateBuilder apiKey="aqsqwlksjddk" secret="ysCpKe5xuksqn5IdNqHJ" /> */}
      <Button onClick={handleOpen} style={buttonStyles}>
        Button
      </Button>
      <Typography className="tool" variant="p" style={typoStyles}>
        Typography
      </Typography>
      <Tooltip anchorSelect=".tool" place="top">
        Hello world!
      </Tooltip>
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
      <div>
        <button
          onClick={() => openSnackbar('This is the content of the Snackbar.')}
        >
          Click me to open the Snackbar!
        </button>
        <button onClick={closeSnackbar}>
          Click me to close the Snackbar programmatically.
        </button>
      </div>
    </>
  );
}

export default App;
