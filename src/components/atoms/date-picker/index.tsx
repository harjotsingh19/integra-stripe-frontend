import { FormControlLabel } from '@mui/material';
import { DatePicker as MUIDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { memo } from 'react';
import { formats } from 'src/utils/date-locale';

interface IDatePickerProps {
  name: string;
  label: string;
  className?: string;
  onChangeHandler?: (date: Date | null) => void;
  values: Date | null;
  error?: boolean;
  id: string;
  helperText?: string | false;
  disabled?: boolean;
  readonly?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
  format?: string;
  minDate?: Date | null;
}

const DatePicker = (props: IDatePickerProps): JSX.Element => {
  const {
    name,
    label,
    onChangeHandler,
    values,
    error,
    helperText,
    id,
    className,
    disabled,
    readonly,
    disableFuture,
    disablePast,
    format = formats?.date,
    minDate,
  } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControlLabel
        sx={{
          margin: 0,
          width: '100%',
          height: 'auto',
        }}
        name={name}
        control={
          <MUIDatePicker
            className={className}
            onChange={onChangeHandler}
            value={values}
            label={label}
            disableFuture={disableFuture}
            disablePast={disablePast}
            disabled={disabled}
            readOnly={readonly}
            data-testId={id}
            format={format}
            minDate={minDate ?? undefined}
            slotProps={{
              textField: {
                variant: 'outlined',
                error: !!error,
                helperText: helperText,
              },
            }}
            sx={{
              height: '100%',
              width: '100%',
              svg: {
                color: 'black',
              },
            }}
          />
        }
        label={undefined}
      />
    </LocalizationProvider>
  );
};

export default memo(DatePicker);
