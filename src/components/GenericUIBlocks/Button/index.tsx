import React from 'react';

// styles
import "./styles.scss"

const Button = ({children = '', style = {}, onClick = {}, className={}}: any) => {
  return (
    <div className={`basic-button ${className}`} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export default Button