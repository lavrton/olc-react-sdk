import React from 'react';

export interface CustomCSSProperties extends React.CSSProperties {
  '--sb-track-color'?: string;
  '--sb-thumb-color'?: string;
  '--primaryColor'?: string;
  '--svgColor'?: string;
  '--textColor'?: string;
  '--productCardBgColor'?: string;
  '--productCardBackgroundColorActive'?: string;
  '--postCardBgColor'?: string;
  '--postCardBackgroundColorActive'?: string;
  '--postCardSVGColor'?: string;
  '--inputBgColor'?: string;
  '--inputTextColor'?: string;
  '--inputBorderColor'?: string;
  '--inputSearchAppliedBg'?: string;
  '--inputSearchIcon'?: string;
  '--selectBgColor'?: string;
  '--selectTextColor'?: string;
  '--selectBorderColor'?: string;
  '--selectMenuBgColor'?: string;
  '--selectOptionTextColor'?: string;
  '--selectOptionBorderColor'?: string;
  '--selectOptionFocusedColor'?: string;
  '--selectOptionFocusedTextColor'?: string;
  '--selectOptionSelectedColor'?: string;
  '--selectOptionSelectedTextColor'?: string;
  '--topbarBgColor'?: string;
  '--sidepanelBgColor'?: string;
  '--sidepanelTextColor'?: string;
  '--sidepanelTextColorHover'?: string;
  '--sidepanelSVGColor'?: string;
  '--sidepanelSVGColorActive'?: string;
  '--sidepanelOptionHoverColor'?: string;
  '--customFieldBorderColor'?: string;
  '--customFieldTextColor'?: string;
  '--customFieldCopySVGColor'?: string;
  '--cardBgColor'?: string;
  '--cardTextColor'?: string;
  '--dialogModalBgColor'?: string;
  '--dialogModalHeadingColor'?: string;
  '--dialogModalTextColor'?: string;
  '--dialogModalSVGColor'?: string;
  '--borderColor'?: string;
  '--secondaryButtonBgColor'?: string;
  '--secondaryButtonTextColor'?: string;
  '--primaryButtonBgColor'?: string;
  '--primaryButtonTextColor'?: string;
  '--iconHoverBgColor'?: string;
  '--mainBackgroundColor'?: string;
  '--footerBgColor'?: string;
  '--red'?: string;
}

export interface Styles {
  root: CustomCSSProperties;
}

export const customStyles: Styles = {
  root: {
    // scroll bars colors
    '--sb-track-color': '#232e33',
    '--sb-thumb-color': '#fb8500',
    // core colors
    '--primaryColor': '#fb8500',
    '--svgColor': '#ffb703',
    // text colors
    '--textColor': '#fff',
    // product Card Background colors
    '--productCardBgColor': '#2C394B',
    '--productCardBackgroundColorActive': '#fff8ee',
    // post Card Background colors
    '--postCardBgColor': '#2C394B',
    '--postCardBackgroundColorActive': '#fff8ee',
    '--postCardSVGColor': '#FDECD3',
    // input colors
    '--inputBgColor': 'transparent',
    '--inputTextColor': '#fff',
    '--inputBorderColor': '#fff',
    '--inputSearchAppliedBg': 'transparent',
    '--inputSearchIcon': '#fff8ee',
    // select input & option colors
    '--selectBgColor': 'transparent',
    '--selectTextColor': '#fff',
    '--selectBorderColor': '#fff',
    '--selectMenuBgColor': '#ffb703',
    '--selectOptionTextColor': '#fff',
    '--selectOptionBorderColor': '#5454544d',
    '--selectOptionFocusedColor': '#ffb703',
    '--selectOptionFocusedTextColor': '#023047',
    '--selectOptionSelectedColor': '#ffb703',
    '--selectOptionSelectedTextColor': '#023047',
    // template builder colors
    '--topbarBgColor': '#023047',
    '--sidepanelBgColor': '#023047',
    '--sidepanelTextColor': '#fff',
    '--sidepanelTextColorHover': '#fff',
    '--sidepanelSVGColor': '#fff',
    '--sidepanelSVGColorActive': '#fff',
    '--sidepanelOptionHoverColor': '#000',
    // custom fields colors
    '--customFieldBorderColor': '#fff',
    '--customFieldTextColor': '#fff',
    '--customFieldCopySVGColor': '#fff',
    // builder Layer colors
    '--cardBgColor': '#fff',
    '--cardTextColor': '#000',
    // Dialog Modal colors
    '--dialogModalBgColor': '#023047',
    '--dialogModalHeadingColor': '#fb8500',
    '--dialogModalTextColor': '#fff',
    '--dialogModalSVGColor': '#ffb703',
    // border colors
    '--borderColor': 'rgba(0, 0, 0, 0.5)',
    // button colors
    '--secondaryButtonBgColor': '#fff',
    '--secondaryButtonTextColor': '#000',
    '--primaryButtonBgColor': '#fb8500',
    '--primaryButtonTextColor': '#fff',
    // topbar colors
    '--iconHoverBgColor': 'rgba(0, 0, 0, 0.076)',

    // background colors
    '--mainBackgroundColor': '#023047',

    // footer bg color
    '--footerBgColor': '#023047',

    // red shades
    '--red': '#ff0000',
  },
};
