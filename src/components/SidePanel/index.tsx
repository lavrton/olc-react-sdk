import React from 'react';
import {SidePanelWrap} from 'polotno';
import type {StoreType} from 'polotno/model/store';
import {SidePanel as PolotnoSidePanel} from 'polotno/side-panel';

interface Props {
  store: StoreType;
}

const SidePanel: React.FC<Props> = (props) => {
  return (
    <SidePanelWrap>
      <PolotnoSidePanel store={props?.store as StoreType} />
    </SidePanelWrap>
  );
};


export default SidePanel;
