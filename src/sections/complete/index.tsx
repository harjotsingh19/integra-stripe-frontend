import { Button, CircularProgress, Stack, Typography } from '@mui/material';

import ErrorIcon from '@mui/icons-material/Error';
import VerifiedIcon from '@mui/icons-material/Verified';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'src/hooks/use-search-params';
import Types from 'src/store/constants/transactions';
import { rootReducersState } from 'src/store/reducers';

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg
        width={0}
        height={0}
      >
        <defs>
          <linearGradient
            id="my_gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#e01cd5"
            />
            <stop
              offset="100%"
              stopColor="#1CB5E0"
            />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />
    </React.Fragment>
  );
}

const PaymentVerification: React.FC = () => {
  const dispatch = useDispatch();

  const params = useSearchParams();
  const sessionId = params.get('session_id');
  const { isVerifiedPayment } = useSelector((state: rootReducersState) => state.transactions);

  useEffect(() => {
    if (sessionId) {
      dispatch({
        type: Types.PAYMENT_VERIFICATION,
        payload: {
          session_id: sessionId,
        },
      });
    }
  }, [sessionId]);

  const renderPaymentSuccess = (
    <Stack
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >
      <VerifiedIcon
        color="success"
        fontSize="large"
      />
      <Typography variant="h2">Payment verfied successfully</Typography>
      <Typography variant="h6">Please close this tab</Typography>
    </Stack>
  );

  const renderPaymentFail = (
    <Stack
      spacing={4}
      justifyContent="center"
      alignItems="center"
    >
      <ErrorIcon
        color="warning"
        fontSize="large"
      />
      <Typography variant="h2">Payment verification failed</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Contact Us
      </Button>
    </Stack>
  );

  return (
    <Stack
      // display="flex"
      spacing={4}
      justifyContent="center"
      alignItems="center"
      mt={10}
    >
      <Typography
        variant="h1"
        color="primary"
      >
        Payment Completed
      </Typography>

      {isVerifiedPayment === true && renderPaymentSuccess}
      {isVerifiedPayment === false && renderPaymentFail}
      {isVerifiedPayment === null && (
        <Stack
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
          <GradientCircularProgress />
          <Typography variant="h2">Verification in Progress...</Typography>
          <Typography variant="h6">Please wait until the status changes</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default PaymentVerification;
