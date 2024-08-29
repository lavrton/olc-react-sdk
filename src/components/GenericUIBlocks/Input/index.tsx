import React, {ChangeEvent, FC} from 'react';

// components
import Typography from '../Typography';

// icon
import Search from '../../../assets/images/input/search';
import Cancel from '../../../assets/images/input/cancel';

// styles
import './styles.scss';

const errorStyles = {
  color: 'var(--error-color)',
  fontWeight: "400"
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
  gellerySearch?:  boolean;
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
  gellerySearch = false
}) => {
  const InputVariant = variant || 'input';

  return (
    <div className={`input-layout ${gellerySearch && "gallery-input-layout"}`}>
      <label className="basic-label">{label ? label : ''}</label>
      <div
        className={`input-with-icon ${searchApplied && 'focused'} ${error ? 'errorBorder' : ''} ${gellerySearch && "galleryInput"}`}
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
              <div className="cancel-input-button" onClick={removeSearchInput}>
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
      {error && (
        <Typography variant="p" style={errorStyles}>
          <sup>*</sup>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default Input;
