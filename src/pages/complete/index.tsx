import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';
import { Logo } from 'src/components/logo';
import { Seo } from 'src/components/seo';
import PaymentVerification from 'src/sections/complete';

const PricingPage = () => {
  return (
    <>
      <Seo title="Payment Verification" />
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
          <PaymentVerification />
        </Container>
      </Box>
    </>
  );
};
export default PricingPage;
PricingPage.getLayout = (page: ReactNode) => <>{page}</>;

const HeaderWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
