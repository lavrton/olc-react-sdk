// src/components/CustomSection.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab,  } from 'polotno/side-panel';
// import FaShapes from '@meronex/icons/fa/FaShapes';
import type { StoreType } from 'polotno/model/store';
import type { TemplatesSection } from 'polotno/side-panel';

type SideSection = typeof TemplatesSection;

const section: SideSection = {
  name: 'custom',
  Tab: observer((props: { store: StoreType; active: boolean; onClick: () => void }) => (
    <SectionTab name="Custom" {...props}>
      {/* <FaShapes style={{ marginRight: 8 }} /> */}
      Custom
    </SectionTab>
  )) as SideSection['Tab'],

  Panel: observer(({ store }: { store: StoreType }) => (
    <div>
      <p>Here we will define our own custom tab.</p>
      <p>Elements on the current page: {store.activePage?.children.length}</p>
    </div>
  )) as SideSection['Panel'],
};

export default section;
