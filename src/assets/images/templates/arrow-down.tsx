import React from 'react';

const ArrowDown = (props: any) => {
  const {onClick} = props;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        color='#fff'
        viewBox="0 0 24 24"
        strokeWidth={3.5}
        stroke="currentColor"
        className="size-6"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
    </>
  );
};

export default ArrowDown;
