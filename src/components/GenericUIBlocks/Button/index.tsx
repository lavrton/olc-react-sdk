import React, { CSSProperties, ReactNode, MouseEventHandler } from 'react';

// styles
import './styles.scss';

interface ButtonProps {
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  disabled?: boolean;
  backdrop?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children = '',
  style = {},
  onClick,
  className = '',
  disabled = false,
  backdrop = true,
}) => {
  return (
    <>
      <div
        className={`basic-button ${className} ${disabled ? 'disabled' : ''}`}
        onClick={disabled ? undefined : onClick}
        style={style}
      >
        {children}
        {backdrop && <span className="backdrop" />}
      </div>
    </>
  );
};

export default Button;
