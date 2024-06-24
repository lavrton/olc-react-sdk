import React, { ChangeEvent, FC } from 'react';

// styles
import './styles.scss';
import Typography from '../Typography';

// icon
import Search from '../../../assets/images/input/search';

// styles
import './styles.scss';

const errorStyles = {
  color: '#FF0000',
};

interface InputProps {
  variant?: keyof JSX.IntrinsicElements;
  type: any;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  inputIcon?: boolean;
}

const Input: FC<InputProps> = ({ variant = 'input', type, value, onChange, placeholder, label, error, inputIcon }) => {
  const InputVariant = variant || 'input';

  return (
    <div className="input-layout">
      <label className="basic-label">{label ? label : ''}</label>
      <div className="input-with-icon">
        <InputVariant
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="basic-input"
        />
        {inputIcon && <Search fill="#ED5C2F" />}
      </div>
      {error && (
        <Typography variant="p" style={errorStyles}>
          <sup>*</sup>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Input;
