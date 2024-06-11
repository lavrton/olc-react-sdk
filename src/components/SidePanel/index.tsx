import React from 'react';
import { SidePanelWrap } from 'polotno';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import type { StoreType } from 'polotno/model/store';
import {SidePanel as PolotnoSidePanel, DEFAULT_SECTIONS} from 'polotno/side-panel';
import CustomSection from './customTemplateSection';

interface Props {
  store: StoreType;
}

const SidePanel: React.FC<Props> = (props) => {
    const sections = DEFAULT_SECTIONS.filter(
      (section) => !['photos', 'size', 'templates'].includes(section.name)
  );
  
  return (
    <SidePanelWrap>
      <PolotnoSidePanel store={props.store} sections={[CustomSection, ...sections]} defaultSection="text" />
    </SidePanelWrap>
  );
};


export default SidePanel;
