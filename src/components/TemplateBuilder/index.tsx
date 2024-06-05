import React, {CSSProperties} from 'react';
import PropTypes from 'prop-types';
import {PolotnoContainer, WorkspaceWrap} from 'polotno';
import {createStore} from 'polotno/model/store';
import merge from 'deepmerge';
import {Toolbar} from 'polotno/toolbar/toolbar';
import {Workspace} from 'polotno/canvas/workspace';
import {ZoomButtons} from 'polotno/toolbar/zoom-buttons';
import SidePanel from '../SidePanel';

interface TemplateBuilderUI {
  sidePanel: object | null;
}

interface Props {
  apiKey: string;
  secret: string;
  ui?: TemplateBuilderUI;
  containerStyle?: CSSProperties;
}

const TemplateBuilder: React.FC<Props> = (props) => {
  const store = createStore({
    key: props.secret,
    showCredit: false,
  });

  const containerStyle = merge({
    width: '100vw', height: '100vh',
  }, props.containerStyle || {});

  return (
    <PolotnoContainer style={containerStyle}>
      <SidePanel store={store} />
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

TemplateBuilder.propTypes = {
  apiKey: PropTypes.string.isRequired,
  secret: PropTypes.string.isRequired,
  /*ui: PropTypes.shape({
    //sidePanel: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),*/
  containerStyle: PropTypes.object,
};


export default TemplateBuilder;
