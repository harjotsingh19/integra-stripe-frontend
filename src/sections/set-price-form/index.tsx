/* eslint-disable react/jsx-max-props-per-line */
import { Button, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Form, Formik, FormikProps } from 'formik';
import Input from 'src/components/atoms/input';
import { ISetPriceProps } from 'src/pages/set-price';

interface ISetPriceFormProps {
  initialValues: ISetPriceProps;
  validationSchema: object;
  onSubmit: (values: ISetPriceProps, resetForm: any) => void;
}

const SetPriceForm = (props: ISetPriceFormProps) => {
  const { initialValues, validationSchema, onSubmit } = props;

  return (
    <Box width="fit-content">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<ISetPriceFormProps['initialValues']>) => {
          const { values, handleBlur, handleChange, errors, touched, resetForm } = props;
          return (
            <Form autoComplete="off">
              <Stack
                direction="row"
                spacing={2}
              >
                <TextField
                  defaultValue="1 Token"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <Typography
                  color="text.secondary"
                  variant="body1"
                  sx={{ pt: 2 }}
                >
                  =
                </Typography>

                <Input
                  id="tokenValue"
                  error={!!(touched.tokenValue && errors.tokenValue)}
                  helperText={touched.tokenValue && errors.tokenValue}
                  name="tokenValue"
                  onBlurHandler={handleBlur}
                  onChangeHandler={handleChange}
                  value={values.tokenValue}
                  type="number"
                  placeholder="Please enter value"
                  className="tokenValue"
                  readOnly={false}
                  startAdornment="$"
                />
              </Stack>

              <Stack
                spacing={3}
                alignItems="center"
              >
                <Button
                  // fullWidth
                  size="large"
                  sx={{ mt: 5, width: 'fit-content', borderRadius: '8px' }}
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default SetPriceForm;
