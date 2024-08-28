import { Autocomplete as MUIAutocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { memo } from 'react';
import { Size } from 'src/types/common';

interface AutocompleteValue {
  label: string;
  value: string;
}

interface ICustomAutoCompleteProps {
  name: string;
  error?: boolean;
  helperText?: string;
  options?: AutocompleteValue[];
  onChangeHandler: (event: any, data: any) => void;
  value: { label: string; value: string };
  label?: string;
  multiple?: boolean;
  freeSolo?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  fullWidth?: boolean;
  className?: string;
  size?: Size;
  id: string;
  placeholder?: string;
}

const Autocomplete = React.forwardRef<HTMLInputElement, ICustomAutoCompleteProps>((props, ref) => {
  const {
    options,
    id,
    onChangeHandler,
    name,
    freeSolo,
    error,
    fullWidth,
    label,
    readonly,
    className,
    helperText,
    multiple = false,
    value,
    placeholder,
  } = props;

  // Custom equality function for Autocomplete
  const isOptionEqualToValue = (option: AutocompleteValue, value: AutocompleteValue) =>
    option.value === value.value;

  return (
    <MUIAutocomplete
      multiple={multiple}
      className={className}
      id="tags-filled"
      onChange={onChangeHandler}
      options={options ?? []}
      value={value}
      limitTags={1}
      size="medium"
      fullWidth={fullWidth}
      freeSolo={freeSolo}
      readOnly={readonly}
      isOptionEqualToValue={isOptionEqualToValue} // Customize equality check
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={label}
          error={error}
          ref={ref}
          helperText={helperText}
          name={name}
          id={id}
          data-testId={id}
          placeholder={placeholder}
          sx={{
            '& .MuiInputBase-input::placeholder': {
              color: 'black', // Replace with your desired color
            },
            '& .MuiAutocomplete-popupIndicator': {
              color: 'black', // Replace with your desired icon color
            },
          }}
        />
      )}
    />
  );
});

Autocomplete.displayName = 'Autocomplete';

export default memo(Autocomplete);