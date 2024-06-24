import React from 'react';

// react-tooltip
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

// styles
import './styles.scss';

interface GeneralTooltipProps {
  anchorSelect: string;
  place: 'top' | 'right' | 'bottom' | 'left';
  title: string;
}

const GeneralTooltip: React.FC<GeneralTooltipProps> = ({ anchorSelect, place, title }) => {
  return (
    <Tooltip className="basic-tooltip" anchorSelect={anchorSelect} place={place}>
      {title}
    </Tooltip>
  );
};

export default GeneralTooltip;
