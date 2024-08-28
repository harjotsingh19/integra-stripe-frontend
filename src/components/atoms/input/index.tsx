/* eslint-disable react/prop-types */
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import React, { memo } from 'react';

type Position = 'end' | 'start';
type Icon = {
  position: Position;
  icon: React.ReactNode;
};
type InputProps = {
  id: string;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string | boolean;
  placeholder: string;
  label?: string;
  name: string;
  className?: string;
  onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  type: 'text' | 'password' | 'email' | 'number';
  disabled?: boolean;
  icon?: Icon;
  readOnly?: boolean;
  maxLength?: any;
  rows?: number;
  sx?: any;
  startAdornment?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    name,
    id,
    label,
    type = 'text',
    helperText,
    disabled = false,
    icon,
    placeholder,
    className,
    fullWidth,
    onChangeHandler,
    onBlurHandler,
    readOnly = false,
    error,
    value,
    maxLength,
    rows,
    sx,
    startAdornment,
    ...others
  } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      id={id}
      name={name}
      label={label}
      ref={ref}
      type={showPassword ? 'text' : type}
      disabled={disabled}
      helperText={helperText}
      variant="outlined"
      placeholder={placeholder}
      fullWidth={fullWidth}
      data-testid={id}
      size="medium"
      sx={sx}
      onChange={onChangeHandler}
      rows={rows}
      onBlur={onBlurHandler}
      className={className}
      aria-readonly={readOnly}
      InputProps={{
        readOnly: readOnly,
        endAdornment: (type === 'password' || (icon && icon.position === 'end')) && (
          <InputAdornment position="end">
            {type === 'password' ? (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                sx={{ mr: -1.5 }}
              >
                {showPassword ? (
                  <VisibilityOutlinedIcon style={{ color: 'black' }} />
                ) : (
                  <VisibilityOffOutlinedIcon style={{ color: 'black' }} />
                )}
              </IconButton>
            ) : (
              icon?.icon
            )}
          </InputAdornment>
        ),
        startAdornment: ((icon && icon.position === 'start') || startAdornment) && (
          <InputAdornment position="start">
            {icon ? (
              <IconButton
                aria-label={label}
                disableRipple
              >
                {icon.icon}
              </IconButton>
            ) : (
              startAdornment
            )}
          </InputAdornment>
        ),
      }}
      error={error}
      value={value}
      inputProps={{ maxLength: maxLength }}
      onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
      {...others}
    />
  );
});

Input.displayName = 'Input';

export default memo(Input);
