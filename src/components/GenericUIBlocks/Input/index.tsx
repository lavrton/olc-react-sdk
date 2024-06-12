import React from 'react'

// styles 
import './styles.scss'
import Typography from '../Typography';

const errorStyles = {
  color: '#FF0000',
};

const Input = (props:any) => {
    const {variant, type, value, onChange, placeholder, label, error} = props;
    const InputVariant = variant || "input"
  return (
    <div className="input-layout">
      <label className="basic-label">{label ? label : ''}</label>
      <InputVariant
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="basic-input"
      />
      {error && (
        <Typography variant="p" style={errorStyles}>
          <sup>*</sup>{error}
        </Typography>
      )}
    </div>
  );
}

export default Input