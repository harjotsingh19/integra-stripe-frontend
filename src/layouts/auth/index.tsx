import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import type { FC, ReactNode } from 'react';
// import { Logo } from 'src/components/logo';
// import Logo from 'public/assets/images/Logo.svg';
import { Logo } from 'src/components/logo';
import { withGuestGuard } from 'src/hocs/with-guest-guard';

const TOP_NAV_HEIGHT = 72;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
}));

interface LayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<LayoutProps> = withGuestGuard((props) => {
  const { children } = props;

  return (
    <LayoutRoot>
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
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </LayoutRoot>
  );
});

AuthLayout.propTypes = {
  children: PropTypes.node,
};

const HeaderWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
