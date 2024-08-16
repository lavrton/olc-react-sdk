import React from 'react';

// Polotno and third party imports
import { SidePanelWrap } from 'polotno';
import type { StoreType } from 'polotno/model/store';
import { SidePanel as PolotnoSidePanel, DEFAULT_SECTIONS } from 'polotno/side-panel';

// Custom Sections / Components
import customTemplateSection from './Templates/customTemplateSection';
import customFieldSection from './CustomFields/customFieldSection';


interface Props {
  store: StoreType;
  currentTemplateType: string;
  platformName?: string | null;
  defaultCategory?: string[];
  onGetOneTemplate?: (payload: any) => Promise<any>;
  onGetTemplates?: (payload: any) => Promise<any>;
  onGetCustomFields?: () => Promise<any>;
}

const SidePanel: React.FC<Props> = (props) => {
  const sections =
    props.currentTemplateType === "Real Penned Letter"
      ? DEFAULT_SECTIONS.filter((section) => section.name === "")
      : DEFAULT_SECTIONS.filter(
        (section) => !["photos", "size", "templates"].includes(section.name)
      );

  return (
    <SidePanelWrap>
      <PolotnoSidePanel store={props.store}
        sections={[
          ...(props.currentTemplateType !== "Real Penned Letter"
            ? [{ ...customTemplateSection, Panel: (panelProps: any) => <customTemplateSection.Panel {...panelProps} platformName={props.platformName} defaultCategory={props.defaultCategory} onGetTemplates={props.onGetTemplates} onGetOneTemplate={props.onGetOneTemplate}/> }]
            : []),
          ...sections,
          { ...customFieldSection, Panel: (panelProps: any) => <customFieldSection.Panel {...panelProps} onGetCustomFields={props.onGetCustomFields} /> },
        ]}
        defaultSection="text" />
    </SidePanelWrap>
  );
};


export default SidePanel;
