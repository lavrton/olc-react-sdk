import React, { ReactNode, CSSProperties } from 'react';

// components
import Button from '../Button';
import Typography from '../Typography';
import CircularProgress from '../CircularProgress';

// cross-icon
import Cross from '../../../assets/images/modal-icons/cross'

// styles
import './styles.scss';

interface DialogProps {
  icon?: ReactNode;
  customStyles?: CSSProperties;
  open: boolean;
  handleClose: () => void;
  loading?: boolean;
  title?: string;
  subHeading?: string;
  description?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
  cancelText?: string;
  submitText?: string;
  children?: ReactNode;
}

const buttonStyles: CSSProperties = {
  color: 'var(--primaryButtonTextColor)',
  backgroundColor: 'var(--primaryButtonBgColor)',
  maxWidth: '100px',
  minHeight: '40px',
  border: '0.5px solid var(--borderColor)',
  fontSize: '14px',
};

const heading: CSSProperties = {
  fontSize: '22px',
  color: 'var(--dialogModalHeadingColor)',
  fontWeight: '600',
};

const subHeadingStyle: CSSProperties = {
  fontSize: '16px',
  color: 'var(--dialogModalTextColor)',
  fontWeight: '600',
  textAlign: 'center',
};

const progressStyles: CSSProperties = {
  width: '20px',
  height: '20px',
  border: '2px solid #fff',
};

const Dialog: React.FC<DialogProps> = ({
  icon = null,
  customStyles = {},
  open,
  handleClose,
  loading = false,
  title = "",
  subHeading = "",
  description = "",
  onSubmit,
  onCancel,
  cancelText = "",
  submitText = "",
  children = [],
}) => {
  const contentAdjust = submitText.length > 6 ? "fit-content" : "100px";

  return (
    <div
      id="myModal"
      className="modal"
      style={{display: open ? 'flex' : 'none'}}
    >
      <div className="modal-content" style={customStyles}>
        <div className="modal-header">
          <span className="close" onClick={handleClose}>
            <Cross />
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
              style={{...subHeadingStyle, fontWeight: '400', fontSize: '14px'}}
            >
              {description}
            </Typography>
          )}
          {children}
        </div>
        <div className="modal-footer">
          <Button
            onClick={onCancel}
            style={{
              ...buttonStyles,
              color: 'var(--secondaryButtonTextColor)',
              backgroundColor: 'var(--secondaryButtonBgColor)',
            }}
          >
            {cancelText}
          </Button>
          <Button
            style={{...buttonStyles, border: 'none', maxWidth: contentAdjust}}
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress style={progressStyles} /> : submitText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
