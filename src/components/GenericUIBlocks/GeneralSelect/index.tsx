import React from 'react';

// react select
import Select from 'react-select';

// components
import Typography from '../Typography';

// styles
import './styles.scss';


const colourStyles = {
  dropdownIndicator: (styles: any, {isFocused, menuIsOpen}: any) => ({
    ...styles,
    color: isFocused && !menuIsOpen ? '#ed5c2f !important' : 'grey',
    transform: !isFocused && !menuIsOpen && 'rotate(180deg)',
  }),
};

const errorStyles = {
  color: '#FF0000',
};


const GeneralSelect = (props:any) => {
  const {options, placeholder, error, label} = props;

  return (
    <div className="select-layout">
      <label>{label && label}</label>
      <Select
        options={options}
        styles={colourStyles}
        className="generic-select-container"
        classNamePrefix="generic-select"
        placeholder={placeholder}
        blurInputOnSelect
      />
      {error && (
        <Typography variant="p" style={errorStyles}>
          <sup>*</sup>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default GeneralSelect;
