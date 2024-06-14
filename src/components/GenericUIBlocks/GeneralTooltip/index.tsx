import React from 'react'

// react-tooltip
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const GeneralTootip = (props:any) => {
    const {anchorSelect, place, title} = props;
  return (
    <Tooltip anchorSelect={anchorSelect} place={place}>
    {title}
    </Tooltip>
  );
}

export default GeneralTootip;