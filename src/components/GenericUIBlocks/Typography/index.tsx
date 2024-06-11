import React from 'react';

// styles
import './styles.scss'

const Typography = ({children="", style={}, variant=""}: any) => {
  const Tag = variant || 'p';
  return (
    <Tag style={style}>{children}</Tag>
  );
};

export default Typography;
