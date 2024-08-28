/* eslint-disable react/jsx-max-props-per-line */
import { Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { Form, Formik, FormikProps } from 'formik';
import Input from 'src/components/atoms/input';
import { useSearchParams } from 'src/hooks/use-search-params';

import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'src/components/atoms/button';
import { tokens } from 'src/locales/tokens';
import { rootReducersState } from 'src/store/reducers';
import * as Yup from 'yup';
import StripeForm from '../payment-card-form';
// import Logo from 'public/assets/images/Logo.svg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Pricing from 'src/pages/pricing';
import regex from 'src/regex';
import Types from 'src/store/constants/transactions';

export interface IInitalValues {
  email: string;
  totalToken: number;
  nameOnCard: string;
  showTerms: boolean;
  stripeToken: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('please enter valid email')
    .matches(regex.EMAIL, t(tokens.validationMessage.validEmail))
    .required(t(tokens.validationMessage.requiredEmail)),
  totalToken: Yup.number().required(t(tokens.validationMessage.requiredTokenValue)),
  nameOnCard: Yup.string().required(t(tokens.validationMessage.nameOnCard)),
});
const CardManagementForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useSearchParams();
  const emailParams = params.get('email');
  const customerId = params.get('customerId');
  const integraPublicKeyId = params.get('integraPublicKeyId');

  const [initialValues, setInitialValues] = useState<IInitalValues>({
    email: '',
    totalToken: 1,
    nameOnCard: '',
    showTerms: false,
    stripeToken: '',
  });

  useEffect(() => {
    if (emailParams) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        email: emailParams,
      }));
    }
  }, [emailParams]);

  const { tokenPrize } = useSelector((state: rootReducersState) => state.transactions);

  useEffect(() => {
    dispatch({
      type: Types.TRANSACTION_TOKEN_PRIZE,
    });
  }, []);

  const subscribe = (values: IInitalValues) => {
    dispatch({
      type: Types.TRANSACTION_INITIATE_REQUEST,
      payload: {
        emailId: values?.email,
        token: values?.stripeToken,
        customerId: customerId,
        numberOfTokens: values?.totalToken,
        tokenPrize: tokenPrize,
        integraPublicKeyId: integraPublicKeyId,
      },
    });
    // router.push(paths.payments.paymentStatus);
  };

  return (
    <Stack>
      <Typography variant="h1">Purchase Token</Typography>
      <Formik
        onSubmit={(values) => {
          subscribe(values);
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(props: FormikProps<IInitalValues>) => {
          return (
            <Form>
              <Pricing />
              <Grid
                container
                spacing={4}
              >
                <Grid
                  item
                  sm={12}
                  md={6}
                >
                  <Stack spacing={4}>
                    <Typography
                      variant="h2"
                      sx={{ lineHeight: '38px', mt: 1, display: 'flex' }}
                    >
                      <Box
                        sx={{
                          marginRight: '15px',
                          background: 'lightgray',
                          height: '35px',
                          width: '35px',
                          borderRadius: '20px',
                          textAlign: 'center',
                        }}
                      >
                        1
                      </Box>
                      Token info
                    </Typography>
                    <Stack spacing={1}>
                      <Typography>Email</Typography>
                      <Input
                        id="email"
                        error={!!(props.touched?.email && props.errors?.email)}
                        fullWidth
                        name="email"
                        // label="Legal Business Name &nbsp; "
                        onBlurHandler={props.handleBlur}
                        onChangeHandler={props.handleChange}
                        value={props.values?.email}
                        type="text"
                        placeholder="Please enter email"
                        readOnly={true}
                      />
                    </Stack>
                    <Stack spacing={1}>
                      <Typography>Number of Tokens</Typography>
                      <Input
                        id="totalToken"
                        error={!!(props.touched?.totalToken && props.errors?.totalToken)}
                        fullWidth
                        helperText={
                          (props.touched?.totalToken && (props.errors?.totalToken as string)) ||
                          `1 Token = ${tokenPrize} USD`
                        }
                        name="totalToken"
                        // label="Legal Business Name &nbsp; "
                        onBlurHandler={props.handleBlur}
                        onChangeHandler={props.handleChange}
                        value={props.values?.totalToken}
                        type="number"
                        placeholder="Please enter no. of token"
                        readOnly={false}
                      />
                    </Stack>
                  </Stack>
                </Grid>

                <Grid
                  item
                  sm={12}
                  md={6}
                >
                  <StripeForm {...props} />
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Button
                  type="submit"
                  id="submit"
                  label="Subscribe"
                  variant="contained"
                  sx={{ padding: '8px 60px' }}
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Real Time Values: (To be removed later)</Typography>
                <pre>{JSON.stringify(props.values, null, 2)}</pre>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Stack>
  );
};

export default CardManagementForm;
