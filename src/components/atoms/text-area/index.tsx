/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';
import React from 'react';
import { Box } from '@mui/system';
import { memo } from 'react';

interface InputProps {
  id: string;
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string;
  label: string;
  name: string;
  className?: string;
  onBlurHandler?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  disabled?: boolean;
  placeholder: string;
  rows?: number;
  maxRows?: number;
  minRows?: number;
  readOnly?: boolean;
}

const TextArea = (props: InputProps) => {
  const {
    name,
    id,
    rows = 4,
    maxRows,
    minRows,
    label,
    error,
    value,
    helperText,
    disabled = false,
    placeholder,
    onBlurHandler,
    onChangeHandler,
    readOnly,
    className,
    fullWidth,
  } = props;
  return (
    <Box>
      <TextField
        id={id}
        name={name}
        onBlur={onBlurHandler}
        className={className}
        onChange={onChangeHandler}
        data-testId={id}
        label={label}
        fullWidth={fullWidth}
        placeholder={placeholder}
        variant="filled"
        type="text"
        multiline
        maxRows={maxRows}
        minRows={minRows}
        rows={rows}
        disabled={disabled}
        helperText={helperText}
        size="medium"
        aria-readonly={readOnly}
        error={error}
        value={value}
      />
    </Box>
  );
};

export default memo(TextArea);
