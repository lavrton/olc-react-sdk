import React, { CSSProperties, ReactNode } from 'react';

// styles
import './styles.scss';

interface TypographyProps {
  children?: ReactNode;
  style?: CSSProperties;
  variant?: keyof JSX.IntrinsicElements;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({ children = '', style = {}, variant = 'p', className = '' }) => {
  const Tag = variant || 'p';
  return <Tag className={className} style={style}>{children}</Tag>;
};

export default Typography;
