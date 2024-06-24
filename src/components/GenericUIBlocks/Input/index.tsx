import React from 'react';

// component
import Typography from '../Typography';

// icon
import Search from '../../../assets/images/input/search';

// styles
import './styles.scss';

const errorStyles = {
  color: '#FF0000',
};

const Input = (props: any) => {
  const {variant, type, value, onChange, placeholder, label, error, inputIcon} =
    props;
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
