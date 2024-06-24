import React, { CSSProperties, ReactNode, MouseEventHandler } from 'react';

// styles
import './styles.scss';

interface ButtonProps {
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children = '', style = {}, onClick, className = '' }) => {
  return (
    <div className={`basic-button ${className}`} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

export default Button;
