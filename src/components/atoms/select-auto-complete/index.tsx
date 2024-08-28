import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

interface IAutoCompleteSelectProps {
  options: Option[];
  value: Option | Option[] | null;
  name: string;
  label: string;
  id?: string;
  error?: boolean;
  className?: string;
  placeholder: string;
  onChange: (field: string, value: any, shouldValidate?: boolean) => void;
  onBlur?: (event: React.FocusEvent) => void;
  helperText?: any;
}

export type Option = {
  id: string;
  label: string;
  value?: string;
};

const SelectAutoComplete = React.forwardRef<HTMLInputElement, IAutoCompleteSelectProps>(
  (props, ref) => {
    const {
      name,
      options,
      value,
      onChange,
      onBlur,
      label,
      error,
      id,
      className,
      placeholder,
      helperText,
    } = props;
    // Ensure value is an array if multiple is true
    const autoCompleteValue = Array.isArray(value) ? value : [];

    // Filter out selected options from the options list
    const filteredOptions = options.filter(
      (option) => !autoCompleteValue.some((selected) => selected.id === option.id)
    );

    return (
      <Autocomplete
        id={id}
        multiple
        options={filteredOptions}
        className={className}
        value={autoCompleteValue}
        onChange={(event, newValue) => {
          onChange(name, newValue);
        }}
        onBlur={onBlur}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            name={name}
            ref={ref}
            variant="outlined"
            error={error}
            placeholder={placeholder}
            helperText={helperText}
            data-testId={id}
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
        renderTags={(tagValue, getTagProps) =>
          tagValue.length > 2 ? (
            <>
              {tagValue.slice(0, 2).map((option, index) => {
                const { key, ...props } = getTagProps({ index });
                return (
                  <Chip
                    key={option.id}
                    label={option.label}
                    {...props}
                  />
                );
              })}
              <Chip label={`+${tagValue.length - 2} more`} />
            </>
          ) : (
            tagValue.map((option, index) => {
              const { key, ...props } = getTagProps({ index });
              return (
                <Chip
                  key={option.id}
                  label={option.label}
                  {...props}
                />
              );
            })
          )
        }
      />
    );
  }
);

SelectAutoComplete.displayName = 'SelectAutoComplete';

export default SelectAutoComplete;
