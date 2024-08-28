import { Button, Link, Typography } from '@mui/material';
import { Stack, Box } from '@mui/system';
import { Formik, FormikProps, Form } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from 'src/components/atoms/input';
import { LoginProps } from 'src/pages/auth/login';

type LoginFormProps = {
  initialValues: LoginProps;
  validationSchema: object;
  onSubmit: (values: LoginProps) => void;
};

const LoginForm = (props: LoginFormProps) => {
  const { t } = useTranslation();
  const { initialValues, validationSchema, onSubmit } = props;

  return (
    <Box paddingRight="30px">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props: FormikProps<LoginProps>) => {
          const { values, handleBlur, handleChange, errors, touched } = props;
          return (
            <Form autoComplete="off">
              <Stack
                spacing={1}
                sx={{ mt: 2 }}
              >
                <Typography variant="body1">Email</Typography>
                <Input
                  error={!!(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  // label="email"
                  name="email"
                  onBlurHandler={handleBlur}
                  onChangeHandler={handleChange}
                  type="email"
                  value={values?.email}
                  placeholder="Enter your email"
                  className="email"
                  readOnly={false}
                  id="email"
                />
              </Stack>
              <Stack
                sx={{ mt: 2 }}
                spacing={1}
              >
                <Typography variant="body1">Password</Typography>
                <Input
                  error={!!(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  // label="Password"
                  name="password"
                  onBlurHandler={handleBlur}
                  onChangeHandler={handleChange}
                  type="password"
                  value={values?.password}
                  id="password"
                  placeholder="Enter your password"
                  className={''}
                  readOnly={false}
                />
              </Stack>

              {/* <Box sx={{ mt: 3 }}>
                <Link
                  // href={paths.auth.forgot}
                  underline="hover"
                  variant="body1"
                  color="primary.main"
                  // component={RouterLink}
                >
                  Forget email?
                </Link>
              </Box> */}
              <Button
                size="medium"
                sx={{ mt: 4, p: '10px 30px', borderRadius: '8px' }}
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default LoginForm;
