import React from 'react';

export interface CustomCSSProperties extends React.CSSProperties {
  '--font-family'?: string;
  '--scrollbar-thumb-color'?: string;
  '--primaryColor'?: string;
  '--secondaryColor'?: string;
  '--svgColor'?: string;
  '--svgColorNotActive'?: string;
  '--textColor'?: string;
  '--modalBackgroundColor'?: string;
  '--notificationTextColor'?: string;
  '--borderColor'?: string;
  '--errorColor'?: string;
}

export interface Styles {
  root: CustomCSSProperties;
}

export const customStyles: Styles = {
  root: {
    '--font-family': 'Inter',
    '--scrollbar-thumb-color': '#fb8500',
    '--primaryColor': '#fb8500',
    '--secondaryColor': 'red',
    '--svgColor': '#ffb703',
    '--svgColorNotActive': 'purple',
    '--textColor': '#fff',
    '--modalBackgroundColor': '#fff',
    '--notificationTextColor': "#fff",
    '--borderColor': 'rgba(0, 0, 0, 0.5)',
    '--errorColor': '#ff0000',
  },
};
