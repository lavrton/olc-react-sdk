import React from 'react'

// react select
import Select from 'react-select';

const options = [
  {value: 'chocolate', label: 'Chocolate'},
  {value: 'strawberry', label: 'Strawberry'},
  {value: 'vanilla', label: 'Vanilla'},
];

const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles = {
  control: (styles: any) => ({...styles, backgroundColor: 'white'}),
  option: (styles: any, {isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? undefined : 'black',
      color: isDisabled ? 'grey' : '#fff',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? 'red' : 'orange',
      },
    };
  },
  input: (styles: any) => ({...styles, ...dot()}),
  placeholder: (styles: any) => ({...styles, ...dot('#ccc')}),
  singleValue: (styles: any) => ({...styles, ...dot("purple")}),
};

const GeneralSelect = () => {
  return <Select options={options} styles={colourStyles} />;
}

export default GeneralSelect