import React from 'react';

const Dot = (props:any) => {
    const { onClick, style } = props;
  return (
    <>
      <svg
        width="11"
        height="11"
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        style={style}
      >
        <circle cx="5.30958" cy="5.28224" r="4.90333" style={style} />
      </svg>
    </>
  );
};

export default Dot;
