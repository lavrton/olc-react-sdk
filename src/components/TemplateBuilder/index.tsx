import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { PolotnoContainer, WorkspaceWrap } from 'polotno';
import { createStore } from 'polotno/model/store';
import merge from 'deepmerge';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { Workspace } from 'polotno/canvas/workspace';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import SidePanel from '../SidePanel';
import { toJS } from 'mobx'; // Import toJS from MobX
import { setData } from '../../redux/actions/appActions'; // Correct import
import { AppState } from '../../redux/reducers';
import { AppDispatch } from '../../redux/store'; // Import AppDispatch


interface TemplateBuilderUI {
  sidePanel: object | null;
}

interface Props {
  apiKey: string;
  secret: string;
  ui?: TemplateBuilderUI;
  containerStyle?: React.CSSProperties;
}

const TemplateBuilder: React.FC<Props> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: AppState) => state.dummy.data);

  useEffect(() => {
    dispatch(setData('Redux Thunk is working!'));
  }, [dispatch]);

  const store = createStore({
    key: props.secret,
    showCredit: false,
  });

  const containerStyle = merge({
    width: '100vw', height: '100vh',
  }, props.containerStyle || {});

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

TemplateBuilder.propTypes = {
  apiKey: PropTypes.string.isRequired,
  secret: PropTypes.string.isRequired,
/*ui: PropTypes.shape({
    //sidePanel: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  }),*/
  containerStyle: PropTypes.object,
};

export default TemplateBuilder;


