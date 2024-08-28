import { FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker as MUITimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { getHours, isBefore } from 'date-fns';
import { memo } from 'react';
import { formats } from 'src/utils/date-locale';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface ICustomTimePickerProps {
  name: string;
  label: string;
  onChange: (time: Date | null) => void;
  value: Date | null;
  error: boolean;
  helperText: string;
  disabled?: boolean;
  disablePast?: boolean;
  maxTime?: Date;
  minTime?: Date;
  iconColor?: string;
}

const TimePicker = (props: ICustomTimePickerProps): JSX.Element => {
  const {
    name,
    label,
    onChange,
    value,
    error,
    helperText,
    disablePast,
    maxTime,
    minTime,
    iconColor = 'default',
    ...rest
  } = props;

  const shouldDisableTime = (value: Date, view: string, disablePast?: boolean): boolean => {
    if (view === 'hours' && disablePast) {
      return (
        isBefore(value, new Date()) || // Check if the value is before the current date
        getHours(value) <= new Date().getHours() // Check if the hours are less than or equal to the current hours
      );
    }
    return false;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box width="100%">
        <FormControlLabel
          sx={{ margin: 0, width: '100%' }}
          control={
            <MUITimePicker
              ampm
              format={formats.timeWithTimezone}
              onChange={onChange}
              value={value}
              {...rest}
              label={label}
              sx={{ width: '100%' }}
              slotProps={{
                textField: {
                  variant: 'outlined',
                  error: !!error,
                  helperText: helperText,
                },
              }}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              maxTime={maxTime}
              minTime={minTime}
              shouldDisableTime={(value, view) => shouldDisableTime(value, view, disablePast)}
            />
          }
          label={undefined}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default memo(TimePicker);