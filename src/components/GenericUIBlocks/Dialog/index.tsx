import React, { ReactNode, CSSProperties, useRef, useEffect } from 'react';

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
  isGallery?: boolean;
}

const buttonStyles: CSSProperties = {
  color: '#fff',
  backgroundColor: 'var(--primary-color)',
  maxWidth: '100px',
  minHeight: '40px',
  border: '0.5px solid var(--border-color)',
  fontSize: '14px',
};

const heading: CSSProperties = {
  fontSize: '22px',
  color: 'var(--primary-color)',
  fontWeight: '600',
};

const subHeadingStyle: CSSProperties = {
  fontSize: '16px',
  color: 'var(--text-color)',
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
  isGallery=false
}) => {
  const contentAdjust = submitText.length > 6 ? "fit-content" : "100px";

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !loading) {
      handleClose();
    }
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div
      id="myModal"
      className={`modal ${isGallery && 'galleryModal'}`}
      style={{display: open ? 'flex' : 'none'}}
    >
      <div className="modal-content" style={customStyles} ref={modalRef}>
        <div className="modal-header">
          <span className="close" onClick={handleClose}>
            <Cross />
          </span>
        </div>
        <div className="modal-body" style={{
          padding: isGallery ? '0px' : "2px 16px"
        }}>
          {icon && <div className="modal-icon">{icon}</div>}
          <Typography variant="p" style={{...heading, fontSize: isGallery && "28px"}}>
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
          {!isGallery &&  
          <>
          <Button
            onClick={onCancel}
            style={{
              ...buttonStyles,
              color: 'var(--text-color)',
              backgroundColor: '#fff',
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
          </>
          }
        </div>
      </div>
    </div>
  );
};

export default Dialog;
