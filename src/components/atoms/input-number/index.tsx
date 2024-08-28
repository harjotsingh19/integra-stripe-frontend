import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { SxProps, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { ChangeEvent, FocusEvent } from 'react';

type TProps = {
  name: string;
  label: string;
  placeholder: string;
  fullWidth: boolean;
  id: string;
  className?: string;
  sx?: SxProps;
  value: any;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  disabled?: boolean;
  helperText?: string | boolean;
};

const NumberInput = (props: TProps) => {
  const {
    name,
    label,
    placeholder,
    id,
    className,
    fullWidth,
    onBlur,
    onChange,
    error,
    value,
    disabled,
    helperText,
  } = props;

  return (
    <>
      <TextField
        name={name}
        placeholder={placeholder}
        id={id}
        className={className}
        fullWidth={fullWidth}
        type="number"
        variant="outlined"
        helperText={helperText}
        sx={{
          fontSize: '15px',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                marginRight: '-5px',
              }}
            >
              <AttachMoneyIcon
                sx={{
                  height: '0.7em',
                  color: '#111927',
                }}
              />
            </InputAdornment>
          ),
        }}
        onBlur={onBlur}
        onChange={onChange}
        error={error}
        value={value}
        disabled={disabled}
      />
    </>
  );
};

export default NumberInput;
