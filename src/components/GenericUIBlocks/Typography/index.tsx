import React from 'react';

// styles
import './styles.scss'

const Typography = (props: any) => {
  const {children = '', style = {}, variant = '', className = ''}= props;
  const Tag = variant || 'p';
  return <Tag className={className || ''} style={style}>{children}</Tag>;
};

export default Typography;
