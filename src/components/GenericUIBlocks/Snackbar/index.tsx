import React, { useEffect } from 'react';

//Hooks
import { useSnackbar } from 'react-simple-snackbar';
import { useSelector } from "react-redux";

// components
import Typography from '../Typography';

// styles
import './styles.scss'

const options = {
  position: 'top-right',
  style: {
    backgroundColor: '#EF7820',
    width: '400px',
    color: 'white',
    fontFamily: 'Inter',
    fontSize: '16px',
    textAlign: 'center',
  },
  closeStyle: {
    color: 'white',
    fontSize: '16px',
  },
};

const Snackbar = () => {
  const [openSnackbar] = useSnackbar(options);

  const open = useSelector((state) => state.snackbarReducers.snackbar.open);

  const heading = useSelector(
    (state) => state.snackbarReducers.snackbar.heading
  );
  const message = useSelector(
    (state) => state.snackbarReducers.snackbar.message
  );

  const Element =   
  <div className="snackbar">
    <Typography>{heading || ''}</Typography>
    <Typography>{message || ''}</Typography>
  </div>

  useEffect(() => {
    if (open) {
      openSnackbar(Element, [50000])
    }
  }, [open]);

  return (
    Element
  )
};

export default Snackbar;
