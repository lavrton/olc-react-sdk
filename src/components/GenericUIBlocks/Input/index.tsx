import React, {ChangeEvent, FC} from 'react';

// components
import Typography from '../Typography';

// icon
import Search from '../../../assets/images/input/search';
import Cancel from '../../../assets/images/input/cancel';
import Add from '../../../assets/images/templates/add';
import CancelFile from '../../../assets/images/templates/cancel';
import PDF from '../../../assets/images/templates/pdf';
import PNG from '../../../assets/images/templates/png';
import DOC from '../../../assets/images/templates/doc';
import DOCX from '../../../assets/images/templates/docx';
import JPG from '../../../assets/images/templates/jpg';
import JPEG from '../../../assets/images/templates/jpeg';
import VideoInfo from '../../../assets/images/templates/video-info';

// styles
import './styles.scss';
import GeneralTooltip from '../GeneralTooltip';
import Button from '../Button';

const errorStyles = {
  color: 'var(--error-color)',
  fontWeight: '400',
};

const loomButtonStyles = {
  fontSize: '10px',
  fontWeight: '400',
  minWidth: '86px',
  minHeight: '22px',
  cursor: 'pointer !important',
};

interface InputProps {
  variant?: keyof JSX.IntrinsicElements;
  type: any;
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | any>
  ) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  inputIcon?: boolean;
  searchApplied?: boolean;
  onClick?: () => void;
  removeSearchInput?: () => void;
  onKeyDown?: () => void;
  builderInput?: boolean;
  gellerySearch?: boolean;
  isFileUploader?: boolean;
  videoTooltip?: boolean;
}

const Input: FC<InputProps> = ({
  variant = 'input',
  type,
  value,
  onChange,
  placeholder,
  label,
  error,
  inputIcon = false,
  onClick,
  searchApplied,
  removeSearchInput,
  onKeyDown,
  builderInput,
  gellerySearch = false,
  isFileUploader = false,
  videoTooltip = false,
}) => {
  const InputVariant = variant || 'input';

  const URLTooltip = (
    <div className="videoUrlTooltip">
      <p>
        You can use Loom to create this video. Create your free Loom account
        now.
      </p>
      <Button style={loomButtonStyles}>Open Loom</Button>
    </div>
  );

  return (
    <>
      <GeneralTooltip
        anchorSelect=".url"
        place="top-start"
        title={URLTooltip}
        openEvent={['click']}
      />
      <div
        className={`input-layout ${gellerySearch && 'gallery-input-layout'}`}
      >
        <label className="basic-label">{label ? label : ''} </label>
        {videoTooltip && (
          <>
            <span className="urlTooltip  url">
              <VideoInfo />
            </span>
          </>
        )}
        {!isFileUploader ? (
          <div
            className={`input-with-icon ${searchApplied && 'focused'} ${error ? 'errorBorder' : ''} ${gellerySearch && 'galleryInput'}`}
          >
            <InputVariant
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`basic-input ${builderInput && 'builder-input'}`}
              onKeyDown={onKeyDown}
            />
            {inputIcon && (
              <>
                {searchApplied && value?.length > 0 ? (
                  <div
                    className="cancel-input-button"
                    onClick={removeSearchInput}
                  >
                    <Cancel fill="var(--border-color)" />
                  </div>
                ) : null}
                <div
                  className="search-input-button"
                  onClick={value?.length > 0 ? onClick : () => {}}
                >
                  <Search fill="var(--primary-color)" />
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="file-upload-wrapper">
              <input type="file" id="fileInput" className="file-input" />
              <div className="upload-area">
                <div className="upload-icon">
                  <Add />
                </div>
                <label for="fileInput" className="upload-text">
                  Upload a File
                </label>{' '}
                or drag and drop
                <div className="upload-info">
                  Supported formats: .png, .jpg, .jpeg, .pdf, .doc, .docx
                </div>
              </div>
            </div>
            <div className="uploaded-files">
              <h3>Uploaded</h3>
              <div className="file-item">
                <div className="file-icon">
                  <PDF />
                </div>
                <div className="file-details">
                  <p className="file-name">My design</p>
                  <p className="file-size">5.3MB</p>
                </div>
                <div className="file-remove">
                  <CancelFile />
                </div>
              </div>
              <div className="file-item">
                <div className="file-icon">
                  <PNG />
                </div>
                <div className="file-details">
                  <p className="file-name">My design</p>
                  <p className="file-size">6.8MB</p>
                </div>
                <div className="file-remove">
                  <CancelFile />
                </div>
              </div>
              <div className="file-item">
                <div className="file-icon">
                  <DOC />
                </div>
                <div className="file-details">
                  <p className="file-name">My design</p>
                  <p className="file-size">6.8MB</p>
                </div>
                <div className="file-remove">
                  <CancelFile />
                </div>
              </div>
              <div className="file-item">
                <div className="file-icon">
                  <DOCX />
                </div>
                <div className="file-details">
                  <p className="file-name">My design</p>
                  <p className="file-size">6.8MB</p>
                </div>
                <div className="file-remove">
                  <CancelFile />
                </div>
              </div>
              <div className="file-item">
                <div className="file-icon">
                  <JPG />
                </div>
                <div className="file-details">
                  <p className="file-name">My design</p>
                  <p className="file-size">6.8MB</p>
                </div>
                <div className="file-remove">
                  <CancelFile />
                </div>
              </div>
              <div className="file-item">
                <div className="file-icon">
                  <JPEG />
                </div>
                <div className="file-details">
                  <p className="file-name">My design</p>
                  <p className="file-size">6.8MB</p>
                </div>
                <div className="file-remove">
                  <CancelFile />
                </div>
              </div>
            </div>
          </>
        )}
        {error && (
          <Typography variant="p" style={errorStyles}>
            <sup>*</sup>
            {error}
          </Typography>
        )}
      </div>
    </>
  );
};

export default Input;
