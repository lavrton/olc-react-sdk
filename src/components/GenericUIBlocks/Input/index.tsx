import React, {ChangeEvent, FC} from 'react';

// components
import Typography from '../Typography';

// icon
import Search from '../../../assets/images/input/search';
import Cancel from '../../../assets/images/input/cancel';

// styles
import './styles.scss';

const errorStyles = {
  color: '#FF0000',
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
}) => {
  const InputVariant = variant || 'input';

  return (
    <div className="input-layout">
      <label className="basic-label">{label ? label : ''}</label>
      <div className={`input-with-icon ${searchApplied && 'focused'}`}>
        <InputVariant
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="basic-input"
          onKeyDown={onKeyDown}
        />
        {inputIcon && (
          <>
            {searchApplied && value.length > 0 ? (
              <div className="cancel-input-button" onClick={removeSearchInput}>
                <Cancel fill="var(--inputSearchIcon)" />
              </div>
            ) : null}
            <div
              className="search-input-button"
              onClick={value.length > 0 ? onClick : () => {}}
            >
              <Search fill="#ED5C2F" />
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
