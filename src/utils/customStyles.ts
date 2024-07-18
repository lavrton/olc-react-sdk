import React from 'react';

export interface CustomCSSProperties extends React.CSSProperties {
  '--font-family'?: string;
  '--sb-thumb-color'?: string;
  '--primaryColor'?: string;
  '--secondaryColor'?: string;
  '--svgColor'?: string;
  '--svgColorNotActive'?: string;
  '--mainBackgroundColor'?: string;
  '--textColor'?: string;
  '--borderColor'?: string;
  '--errorColor'?: string;
}

export interface Styles {
  root: CustomCSSProperties;
}

export const customStyles: Styles = {
  root: {
    '--font-family': "Inter",
    '--sb-thumb-color': '#fb8500',
    '--primaryColor': '#fb8500',
    '--secondaryColor': 'red',
    '--svgColor': '#ffb703',
    '--svgColorNotActive': 'purple',
    '--textColor': '#fff',
    '--borderColor': 'rgba(0, 0, 0, 0.5)',
    '--mainBackgroundColor': '#023047',
    '--errorColor': '#ff0000',
  },
};
