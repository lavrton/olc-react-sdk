import React from 'react'

// styles
import './styles.scss'

// components
import Button from '../Button';

// images
import Delete from '../../../assets/modal-icons/delete.svg'
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

const subHeading = {
  fontSize: '16px',
  color: 'black',
  fontWeight: "700",
  textAlign: 'center'
};

const Dialog = ({open={}, handleClose={}, customStyles={}}: any) => {
  return (
    <div
      id="myModal"
      className="modal"
      style={{
        display: open && 'flex',
      }}
    >
      <div className="modal-content" style={customStyles}>
        <div className="modal-header">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        <div className="modal-body">
          <img src={Delete} alt="delete" />
          <Typography variant="p" style={heading}>
            Delete Template
          </Typography>
          <Typography variant="p" style={{...subHeading, fontWeight: '700'}}>
            Are you sure you want to delete this Template?
          </Typography>
          <Typography variant="p" style={{...subHeading, fontWeight: '400'}}>
            This template will be deleted from your Templates list but will
            still be included in associated orders.
          </Typography>
        </div>
        <div className="modal-footer">
          <Button
            style={{...buttonStyles, color: 'black', backgroundColor: 'white'}}
          >
            No
          </Button>
          <Button
            style={{...buttonStyles, border: 'none'}}
            onClick={handleClose}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog