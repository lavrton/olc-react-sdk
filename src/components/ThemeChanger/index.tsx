// src/components/ThemeChanger.tsx
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
// import {setTheme} from '../store/themeActions';
import {resetTheme, setTheme} from '../../redux/actions/themeActions';
// import {ThemeState} from '../store/themeReducer';
import {ThemeState} from '../../redux/reducers/themeReducer';
import Dialog from '../GenericUIBlocks/Dialog';

const ThemeChanger: React.FC = (props: any) => {
  const {open, handleClose} = props;
  const [primaryColor, setPrimaryColor] = useState('#ed5c2f');
  const [secondaryColor, setSecondaryColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const dispatch = useDispatch();

  const themeModalstyles = {
    maxWidth: '400px',
  };

  const handleThemeChange = () => {
    const newTheme: ThemeState = {
      primaryColor,
      secondaryColor,
      backgroundColor,
    };
    dispatch(setTheme(newTheme));
  };

  const handleResetTheme = () => {
    dispatch(resetTheme());
  };
  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      cancelText="Reset Theme"
      submitText="Change Theme"
      onCancel={handleResetTheme}
      onSubmit={handleThemeChange}
      customStyles={themeModalstyles}
      title="Custom Color Selection"
    >
      <div style={{marginBottom: '80px'}}>
        <div>
          <label>Select Text Color</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
          />
        </div>
        <div>
          <label>Secondary Color:</label>
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
          />
        </div>
        <div>
          <label>Background Color:</label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default ThemeChanger;
