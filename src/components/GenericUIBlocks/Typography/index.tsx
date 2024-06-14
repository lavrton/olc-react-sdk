import React from 'react';

// styles
import './styles.scss'

const Typography = ({
  children = '',
  style = {},
  variant = '',
  className={},
}: any) => {
  const Tag = variant || 'p';
  return <Tag className={className} style={style}>{children}</Tag>;
};

export default Typography;
