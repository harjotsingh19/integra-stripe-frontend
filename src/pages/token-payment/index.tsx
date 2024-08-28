import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Elements } from '@stripe/react-stripe-js';
import { ReactNode } from 'react';
import { Logo } from 'src/components/logo';
import { Seo } from 'src/components/seo';
import CardManagementForm from 'src/sections/card-management';
import getStripe from 'src/utils/stripe-promise';

const TokenPaymentPage = () => {
  return (
    <>
      <Seo title="Payment Details" />
      <HeaderWrapper
        component="header"
        sx={{ py: 2 }}
      >
        <Logo />
      </HeaderWrapper>
      <Box
        component="main"
        display="flex"
        flexGrow="1"
      >
        <Container maxWidth="xl">
          <Elements
            stripe={getStripe()}
            // options={options}
          >
            <CardManagementForm />
          </Elements>
        </Container>
      </Box>
    </>
  );
};
export default TokenPaymentPage;
TokenPaymentPage.getLayout = (page: ReactNode) => <>{page}</>;

const HeaderWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
