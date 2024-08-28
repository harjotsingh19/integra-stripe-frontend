import { Box, Checkbox, Link, Stack, Typography } from '@mui/material';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormikProps } from 'formik';
import { useState } from 'react';
import ErrorMessage from 'src/components/atoms/error-message';
import Input from 'src/components/atoms/input';
import CustomModal from 'src/components/atoms/modal';
// import TermsAndConditions from '../terms-conditions';
// import { IUser } from 'src/types/user';
// import { FontSize } from 'src/types/common';

// import "./style.css"

const cardElementOptions = {
  showIcon: true,
  placeholder: 'Card Number',
};

export const enum StripeErrorCode {
  INCOMPLETE_NUMBER = 'incomplete_number',
  INCOMPLETE_EXPIRY = 'incomplete_expiry',
  INVALID_YEAR = 'invalid_expiry_year_past',
  INVALID_MONTH = 'invalid_expiry_month_past',
  INCOMPLETE_CVC = 'incomplete_cvc',
  TYPE = 'validation_error',
}

const StripeForm = (props: FormikProps<any>) => {
  const { touched, values, handleBlur, handleChange, errors, setFieldValue } = props;
  const [open, setOpen] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState<any>({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const handleStripe = async (values: any) => {
    if (!stripe || !elements) {
      return;
    }
    const cardElement: any = elements.getElement(CardNumberElement);
    const { token, error } = await stripe.createToken(cardElement, {
      name: values?.cardHolderFirstName,
      currency: 'usd',
    });
    setFieldValue('stripeToken', token?.id);
    setCardError({
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
    });

    if (error) {
      if (error?.code === StripeErrorCode.INCOMPLETE_NUMBER) {
        setCardError((prevState: any) => ({
          ...prevState,
          cardNumber: error?.message ?? '',
        }));
      }
      if (error?.code === StripeErrorCode.INCOMPLETE_EXPIRY) {
        setCardError((prevState: any) => ({
          ...prevState,
          cardExpiry: error?.message ?? '',
        }));
      }
      if (
        error?.code === StripeErrorCode.INVALID_YEAR ||
        error?.code === StripeErrorCode.INVALID_MONTH
      ) {
        setCardError((prevState: any) => ({
          ...prevState,
          cardExpiry: error?.message ?? '',
        }));
      }
      if (error?.code === StripeErrorCode.INCOMPLETE_CVC && error?.type === StripeErrorCode.TYPE) {
        setCardError((prevState: any) => ({
          ...prevState,
          cardCvv: error?.message ?? '',
        }));
      }
    }
    return token;
  };

  const handleModal = () => {
    setOpen(true);
  };

  return (
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
          2
        </Box>
        Payment Details
      </Typography>

      <Stack spacing={1}>
        <Typography>Name on Card</Typography>
        <Input
          name="nameOnCard"
          error={!!(touched?.nameOnCard && errors?.nameOnCard)}
          fullWidth
          helperText={touched?.nameOnCard && (errors?.nameOnCard as string)}
          // label="Name on Card &nbsp;"
          onBlurHandler={handleBlur}
          onChangeHandler={handleChange}
          type="text"
          value={values?.nameOnCard ?? ''}
          id="nameOnCard"
          placeholder="Name on Card"
        />
      </Stack>

      <Stack spacing={1}>
        <Typography>Card Information</Typography>
        <CardNumberElement
          options={cardElementOptions}
          id="card_number"
          onChange={handleStripe}
        />
        {cardError?.cardNumber && <ErrorMessage errorMsg={cardError?.cardNumber} />}
      </Stack>
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row' }}
        spacing={3}
      >
        <Stack
          sx={{ width: '100%' }}
          spacing={1}
        >
          <Typography>Expiry Date</Typography>
          <CardExpiryElement
            id="card_expiry"
            onChange={handleStripe}
          />
          {cardError?.cardExpiry && <ErrorMessage errorMsg={cardError?.cardExpiry} />}
        </Stack>
        <Stack
          sx={{ width: '100%' }}
          spacing={1}
        >
          <Typography>CVV Code</Typography>
          <CardCvcElement
            id="card_cvc"
            onChange={handleStripe}
            options={{
              placeholder: 'CVV',
            }}
          />
          {cardError?.cardCvv && <ErrorMessage errorMsg={cardError?.cardCvv} />}
        </Stack>
      </Stack>

      {values.showTerms && (
        <Stack paddingLeft={1}>
          <Typography variant="h6"> norte:</Typography>
          <Box paddingTop={2}>
            <Typography
              variant="body2"
              fontSize={12}
            >
              note
            </Typography>
          </Box>
        </Stack>
      )}
      {values.showTerms && (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              name="stripeTerms"
              onChange={handleChange}
              checked={values?.stripeTerms}
            />
            <Link
              fontSize={13}
              href="#"
              underline="none"
              onClick={handleModal}
            >
              terms
            </Link>
          </Box>
          <Box ml={2}>
            {!!(touched?.stripeTerms && errors?.stripeTerms) && <ErrorMessage errorMsg="error" />}
          </Box>

          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                name="authorized"
                onChange={handleChange}
                checked={!!(values && values.authorized)}
              />
              <Typography
                variant="body2"
                fontSize={12}
              >
                authorize
              </Typography>
            </Box>
            {/* <Box ml={2}>
              {!!(touched?.authorized && errors?.authorized) && (
                <ErrorMessage errorMsg={errors?.authorized} />
              )}
            </Box> */}
          </Box>
          {/* <Box paddingTop={2}>
            <Alert severity="warning">{t(tokens.termsAndConditions.paymentAlert)}</Alert>
          </Box> */}
        </Box>
      )}

      <CustomModal
        open={open}
        className="test"
        dialogTitle="Terms and conditions"
        handleClose={() => setOpen(false)}
        confirmLabel="Accept"
      >
        {/* <TermsAndConditions /> */}
      </CustomModal>
    </Stack>
  );
};

export default StripeForm;
