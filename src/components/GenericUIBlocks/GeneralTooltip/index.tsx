import React from 'react'

// react-tooltip
import {Tooltip} from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// styles
import './styles.scss'

const GeneralTootip = (props:any) => {
    const {anchorSelect, place, title} = props;
  return (
    <Tooltip className='basic-tooltip' anchorSelect={anchorSelect} place={place}>
      {title}
    </Tooltip>
  );
}

export default GeneralTootip;