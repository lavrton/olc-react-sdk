import React from 'react';

export interface CustomCSSProperties extends React.CSSProperties {
  '--font-family'?: string;
  '--scrollbar-thumb-color'?: string;
  '--primary-color'?: string;
  '--secondary-color'?: string;
  '--svg-color'?: string;
  '--svg-color-not-active'?: string;
  '--text-color'?: string;
  '--modal-background-color'?: string;
  '--notification-text-color'?: string;
  '--border-color'?: string;
  '--error-color'?: string;
}

export interface Styles {
  root: CustomCSSProperties;
}

export const customStyles: Styles = {
  root: {
    '--font-family': 'Inter',
    '--scrollbar-thumb-color': '#fb8500',
    '--primary-color': '#fb8500',
    '--secondary-color': 'red',
    '--svg-color': '#ffb703',
    '--svg-color-not-active': 'purple',
    '--text-color': '#fff',
    '--modal-background-color': '#fff',
    '--notification-text-color': "#fff",
    '--border-color': 'rgba(0, 0, 0, 0.5)',
    '--error-color': '#ff0000',
  },
};
