import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PolotnoContainer, WorkspaceWrap } from 'polotno';
import { createStore } from 'polotno/model/store';
import merge from 'deepmerge';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { Workspace } from 'polotno/canvas/workspace';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import SidePanel from '../SidePanel';
import { fetchTemplates } from '../../redux/actions/templateActions';
import { AppDispatch } from '../../redux/store';

interface Props {
  apiKey: string;
  secret: string;
  ui?: {
    sidePanel: object | null;
  };
  containerStyle?: React.CSSProperties;
}

const TemplateBuilder: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch(); 

  useEffect(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  const store = createStore({
    key: props.secret,
    showCredit: false,
  });

  const containerStyle = merge(
    {
      width: '100vw',
      height: '100vh',
    },
    props.containerStyle || {}
  );

  return (
    <>
      {/* <div>{data}</div> */}
    <PolotnoContainer style={containerStyle}>
      <SidePanel store={store} />
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
    </>
   
  );
};

export default TemplateBuilder;


