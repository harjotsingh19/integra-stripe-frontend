import React, { memo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/system';

interface SelectOption {
  value: string | number;
  label: string;
}
type SelectProps = {
  className?: string;
  options: SelectOption[];
  value: string;
  name: string;
  errorMsg?: string;
  onChangeHandler: (event: SelectChangeEvent) => void;
  onBlurHandler?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  id: string;
  height?: number;
  textColor?: string;
};
const SelectInput = (props: SelectProps) => {
  const {
    className,
    options,
    value,
    name,
    id,
    onChangeHandler,
    onBlurHandler,
    disabled,
    placeholder,
    height,
    textColor = 'black',
  } = props;

  return (
    <Box width="100%">
      <FormControl
        fullWidth
        className={className}
      >
        <Select
          value={value}
          id={id}
          onChange={onChangeHandler}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          name={name}
          onBlur={onBlurHandler}
          disabled={disabled}
          data-testid={id}
          placeholder={placeholder}
          sx={{
            height: height,
            color: textColor, // text color for the selected text and placeholder
            '.MuiSelect-icon': { color: textColor }, // color of the dropdown icon
          }}
        >
          {options &&
            options.map(
              (
                item: {
                  value: string | number | readonly string[];
                  label?: string;
                },
                index: React.Key | null
              ) => (
                <MenuItem
                  key={index}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              )
            )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default memo(SelectInput);
