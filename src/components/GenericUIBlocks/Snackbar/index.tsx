import React from 'react';

// components
import Typography from '../Typography';

// styles
import './styles.scss'

const Snackbar = () => {  
  return (
    <div className="snackbar">
      <Typography>Notifications</Typography>
      <Typography>Snackbar Here !</Typography>
    </div>
  );
};

export default Snackbar;
