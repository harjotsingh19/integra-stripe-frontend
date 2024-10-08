import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { useFormikContext } from 'formik';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyDSuUNuBbVSgNBbEM9m6ArWvMfLBqbt9ow';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };
const geocoder = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

interface GoogleMapsAutocompleteProps {
  name: string;
  label: string;
  fullWidth?: boolean;
  value?: any | null;
  error?: string;
  touched?: boolean;
  onBlur?: (event: React.FocusEvent<any, Element>) => void;
  onChange: (event: any, data: any) => void;
  placeholder: string;
}

const GoogleMapsAutocomplete: React.FC<GoogleMapsAutocompleteProps> = ({
  name,
  label,
  fullWidth = false,
  value,
  error,
  touched,
  onBlur,
  onChange,
  placeholder,
}) => {
  const { setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request: { input: string }, callback: (results?: readonly PlaceType[]) => void) => {
        (autocompleteService.current as any).getPlacePredictions(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
      geocoder.current = new (window as any).google.maps.Geocoder();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const getLatLng = (address: string) => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      if (geocoder.current) {
        (geocoder.current as any).geocode({ address: address }, (results: any, status: any) => {
          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;
            resolve({ lat: location.lat(), lng: location.lng() });
          } else {
            reject('Geocode was not successful for the following reason: ' + status);
          }
        });
      } else {
        reject('Geocoder not initialized');
      }
    });
  };

  return (
    <Autocomplete
      id="google-map-demo"
      sx={{ width: fullWidth ? '100%' : 300 }}
      getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      onChange={async (event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        onChange(event, newValue);

        if (newValue) {
          try {
            const { lat, lng } = await getLatLng(newValue.description);
            const latStr = lat.toString();
            const lngStr = lng.toString();
            setFieldValue('latitude', latStr);
            setFieldValue('longitude', lngStr);
          } catch (error) {
            console.error(error);
          }
        }
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth={fullWidth}
          error={touched && Boolean(error)}
          helperText={touched && error}
          onBlur={onBlur}
          placeholder={placeholder}
          variant="outlined"
          sx={{
            '& .MuiAutocomplete-popupIndicator': {
              color: 'black', // Replace with your desired icon color
            },
          }}
        />
      )}
      renderOption={(props, option) => {
        const matches = option.structured_formatting?.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting?.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length])
        );

        return (
          <li {...props}>
            <Grid
              container
              alignItems="center"
            >
              <Grid
                item
                sx={{ display: 'flex', width: 44 }}
              >
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {option.structured_formatting?.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
};

export default GoogleMapsAutocomplete;
