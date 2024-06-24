import React, { useState, useEffect, CSSProperties } from 'react';

// styles
import './styles.scss';

interface CircularProgressProps {
  style?: CSSProperties;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ style = {} }) => {
  const [loader, setLoader] = useState(true);

  // TODD: Re-Check this functiom
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div className={loader ? 'basic-progress' : 'hide-loader'}>
      <div className="loader" style={style} />
    </div>
  );
}

export default CircularProgress;
