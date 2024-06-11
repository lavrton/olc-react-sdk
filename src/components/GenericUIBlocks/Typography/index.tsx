import React from 'react';

// styles
import './styles.scss'

const Typography = ({children="", style={}, variant=""}: any) => {
  return (
    <>
      {variant === 'h1' && <h1 className="basic-typo">{children}</h1>}
      {variant === 'h2' && <h2 className="basic-typo">{children}</h2>}
      {variant === 'h3' && <h3 className="basic-typo">{children}</h3>}
      {variant === 'h4' && <h4 className="basic-typo">{children}</h4>}
      {variant === 'h5' && <h5 className="basic-typo">{children}</h5>}
      {variant === 'h6' && <h6 className="basic-typo">{children}</h6>}
      {variant === 'p' && 
      <p className="basic-typo" style={style}>
        {children}
      </p>
      }
    </>
  );
};

export default Typography;
