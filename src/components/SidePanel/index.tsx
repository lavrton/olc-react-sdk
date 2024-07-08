import React from 'react';

// Polotno Imports
import { SidePanelWrap } from 'polotno';
import type { StoreType } from 'polotno/model/store';
import {SidePanel as PolotnoSidePanel, DEFAULT_SECTIONS} from 'polotno/side-panel';

// Custom Sections
import customTemplateSection from './templates/customTemplateSection';
import customFieldSection from './customFields/customFieldSection';


interface Props {
  store: StoreType;
}

const SidePanel: React.FC<Props> = (props) => {
    const sections = DEFAULT_SECTIONS.filter(
      (section) => !['photos', 'size', 'templates'].includes(section.name)
  );
  
  return (
    <SidePanelWrap>
      <PolotnoSidePanel store={props.store} sections={[customTemplateSection, ...sections, customFieldSection]} defaultSection="text" />
    </SidePanelWrap>
  );
};


export default SidePanel;
