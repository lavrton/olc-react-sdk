import React from 'react';

// styles
import "./styles.scss"

const Button = ({children="", style={}, onClick={}}: any) => {
  return (
    <div className="basic-button" onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export default Button