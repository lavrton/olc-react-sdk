import React, { useState, useEffect, CSSProperties } from 'react';

// styles
import './styles.scss';

interface CircularProgressProps {
  style?: CSSProperties;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ style = {} }) => {
  return (
    <div className={'basic-progress'}>
      <div className="loader" style={style} />
    </div>
  );
}

export default CircularProgress;
