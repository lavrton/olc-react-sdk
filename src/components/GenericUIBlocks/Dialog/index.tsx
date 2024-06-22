import React from 'react';

// components
import Button from '../Button';
import Typography from '../Typography';
import CircularProgress from '../CircularProgress';

// styles
import './styles.scss';

const buttonStyles = {
  color: '#ffffff',
  backgroundColor: '#ed5c2f',
  maxWidth: '100px',
  minHeight: '40px',
  border: '0.5px solid rgba(48, 48, 48, 0.5)',
  fontSize: '14px',
};

const heading = {
  fontSize: '22px',
  color: '#ed5c2f',
  fontWeight: '700',
};

const subHeadingStyle = {
  fontSize: '16px',
  color: 'black',
  fontWeight: '700',
  textAlign: 'center',
};

const progressStyles = {
  width: '20px',
  height: '20px',
};

const Dialog = (props: any) => {
  const {
    icon = null,
    customStyles = {},
    open = {},
    handleClose = () => {},
    loading = false,
    title = '',
    subHeading = '',
    description = '',
    onSubmit = {},
    onCancel = {},
    cancelText = '',
    submitText = '',
    children = [],
  } = props;

  const contentAdjust = submitText.length > 6 ? 'fit-content' : '100px';
  return (
    <div
      id="myModal"
      className="modal"
      style={{display: open ? 'flex' : 'none'}}
    >
      <div className="modal-content" style={customStyles}>
        <div className="modal-header">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-icon">{icon}</div>
          <Typography variant="p" style={heading}>
            {title}
          </Typography>
          {subHeading && (
            <Typography variant="p" style={subHeadingStyle}>
              {subHeading}
            </Typography>
          )}
          {description && (
            <Typography
              variant="p"
              style={{...subHeadingStyle, fontWeight: '400'}}
            >
              {description}
            </Typography>
          )}
          {children}
        </div>
        <div className="modal-footer">
          <Button
            onClick={onCancel}
            style={{...buttonStyles, color: 'black', backgroundColor: 'white'}}
          >
            {cancelText}
          </Button>
          <Button
            style={{...buttonStyles, border: 'none', maxWidth: contentAdjust}}
            onClick={onSubmit}
          >
            {loading ? <CircularProgress style={progressStyles} /> : submitText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
