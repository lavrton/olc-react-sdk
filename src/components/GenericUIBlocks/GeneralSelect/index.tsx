import React from 'react';

// react select
import Select, {StylesConfig} from 'react-select';

// components
import Typography from '../Typography';

// styles
import './styles.scss';

interface Option {
  id?: number | string;
  value: string;
  label: string;
}

interface GeneralSelectProps {
  options: Option[];
  placeholder?: string;
  error?: string;
  label?: string;
  selectedValue: Option | null;
  isError: boolean;
  setSelectedValue: (option: Option | null) => void;
}

const colourStyles: StylesConfig<Option, false> = {
  dropdownIndicator: (styles, {isFocused, selectProps}) => ({
    ...styles,
    color: isFocused && selectProps.menuIsOpen ? 'var(--primaryColor)' : 'grey',
    transform:
      !isFocused && !selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
  }),
  option: (styles, {isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected && isFocused
          ? 'var(--selectOptionSelectedBg)'
          : isFocused && !isSelected
            ? 'var(--selectOptionFocusedColor)'
            : undefined,
    };
  },
};

const errorStyles = {
  color: '#FF0000',
  fontWeight: '400'
};

const GeneralSelect: React.FC<GeneralSelectProps> = ({
  options,
  placeholder,
  error,
  label,
  isError,
  selectedValue,
  setSelectedValue,
}) => {
  return (
    <div className="select-layout">
      <label>{label && label}</label>
      <Select
        value={selectedValue}
        options={options}
        onChange={setSelectedValue}
        styles={colourStyles}
        className="generic-select-container"
        classNamePrefix="generic-select"
        placeholder={placeholder}
        blurInputOnSelect
      />
      {isError && (
        <Typography variant="p" style={errorStyles}>
          <sup>*</sup>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default GeneralSelect;
