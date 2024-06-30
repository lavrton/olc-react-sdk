import React from 'react';

const DynamicField = (props: any) => {
  const {stroke} = props;
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ width: '18px', height: '18px'}}
        xmlSpace="preserve"
        width="512"
        height="512"
      >
        <g>
          <path
            style={{
              fill: 'none',
              stroke: `${stroke}`,
              strokeWidth: 40,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            d="M412,136h40c22.091,0,40,17.909,40,40v160c0,22.091-17.909,40-40,40h-40"
          />
          <line
            style={{
              fill: 'none',
              stroke: `${stroke}`,
              strokeWidth: 40,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            x1="100"
            y1="216"
            x2="180"
            y2="216"
          />
          <line
            style={{
              fill: 'none',
              stroke: `${stroke}`,
              strokeWidth: 40,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            x1="140"
            y1="296"
            x2="140"
            y2="216"
          />
          <line
            style={{
              fill: 'none',
              stroke: `${stroke}`,
              strokeWidth: 40,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            x1="332"
            y1="456"
            x2="332"
            y2="56"
          />
          <line
            style={{
              fill: 'none',
              stroke: `${stroke}`,
              strokeWidth: 40,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            x1="292"
            y1="56"
            x2="372"
            y2="56"
          />
          <line
            style={{
              fill: 'none',
              stroke: `${stroke}`,
              strokeWidth: 40,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            x1="292"
            y1="456"
            x2="372"
            y2="456"
          />
          <path
            style={{
              fill: 'none',
              stroke: `${stroke}`,
              strokeWidth: 40,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 10,
            }}
            d="M332,376H60c-22.091,0-40-17.909-40-40V176c0-22.091,17.909-40,40-40h272"
          />
        </g>
      </svg>
    </>
  );
};

export default DynamicField;
