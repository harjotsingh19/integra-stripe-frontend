import PropTypes from 'prop-types';
import { FieldArray, useFormikContext, FormikValues } from 'formik';
// @mui
// import Autocomplete from '@mui/material/Autocomplete';
import { Autocomplete } from '@mui/material';

import TextField from '@mui/material/TextField';

// Define a type for your form values
interface FormValues {
  [key: string]: any;
}

// ----------------------------------------------------------------------

export default function FormikAutocomplete({
  name,
  label,
  placeholder,
  helperText,
  options,
  error,
  ...other
}: any) {
  // Use the type here
  const { setFieldValue, values } = useFormikContext<FormValues>();

  const handleChange = (event: any, newValue: any) => {
    // Remove duplicates
    const uniqueValues = Array.from(new Set(newValue));
    setFieldValue(name, uniqueValues);
  };

  return (
    <FieldArray
      name={name}
      render={() => (
        <Autocomplete
          multiple
          options={options}
          value={values[name] || []}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              variant="outlined"
              label={label}
              placeholder={placeholder}
              helperText={helperText}
              error={error}
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
          {...other}
        />
      )}
    />
  );
}
