import React from 'react'

// styles
import './styles.scss'

// components
import Button from '../Button';

// images
import Delete from '../../../assets/modal-icons/del'
import Typography from '../Typography';

const buttonStyles = {
  color: 'white',
  backgroundColor: '#ed5c2f',
  maxWidth: '100px',
  minHeight: '40px',
  border: '0.5px solid rgba(48, 48, 48, 0.5)',
};

const heading = {
  fontSize: '22px',
  color: '#ed5c2f',
  fontWeight: "700"
};

const subHeadingStyle = {
  fontSize: '16px',
  color: 'black',
  fontWeight: "700",
  textAlign: 'center'
};

const Dialog = (props: any) => {
  const {
    customStyles,
    open,
    handleClose,
    title,
    subHeading,
    desscription,
    onSubmit,
    onCancel,
    cancelText,
    submitText,
  } = props;
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
          <Delete />
          <Typography variant="p" style={heading}>
            {title}
          </Typography>
          <Typography variant="p" style={subHeadingStyle}>
            {subHeading}
          </Typography>
          <Typography
            variant="p"
            style={{...subHeadingStyle, fontWeight: '400'}}
          >
            {desscription}
          </Typography>
        </div>
        <div className="modal-footer">
          <Button
            onClick={onCancel}
            style={{...buttonStyles, color: 'black', backgroundColor: 'white'}}
          >
            {cancelText}
          </Button>
          <Button style={{...buttonStyles, border: 'none'}} onClick={onCancel}>
            {submitText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog