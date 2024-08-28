/* eslint-disable react/display-name */
import { Box, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { ICountryProps } from 'src/config';
import { Mode } from 'src/theme';
import { neutral } from 'src/theme/colors';

interface IFlagPhoneInput {
  value?: string;
  disabled: boolean;
  enableSearch: boolean;
  placeholder: string;
  isError?: boolean;
  isTouched?: boolean;
  errorMessage?: string;
  // onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // onChange: any
  onChange: (phone: string, country: ICountryProps) => void;
}

// FIXME: Do not use colors directly in the components, always use them through theme.
const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  fontSize: '1rem',
  width: '100%',
  '& .form-control': {
    width: '100% !important',
    height: '3.2rem !important',
    borderRadius: '0.375rem',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.mode === Mode.light ? neutral[200] : neutral[700],
    // Add other styles as needed
  },
}));

const FlagPhoneNumberInput = React.forwardRef<HTMLInputElement, IFlagPhoneInput>((props, ref) => {
  const { placeholder, enableSearch, value, disabled, onChange, isError, isTouched, errorMessage } =
    props;

  return (
    <Box>
      <StyledPhoneInput
        // ref={ref}
        // {...rest}
        enableSearch={enableSearch}
        country={'us'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />

      {isError || isTouched ? (
        <Box pl={2}>
          <FormHelperText error>{errorMessage}</FormHelperText>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
});

export default FlagPhoneNumberInput;
