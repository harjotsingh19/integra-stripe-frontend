import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Seo } from 'src/components/seo';
import { LAST_NAME_LENGTH, PASSWORD_LENGTH } from 'src/config/constants';
import { AuthContextType } from 'src/contexts/auth/jwt/auth-context';
import { useAuth } from 'src/hooks/use-auth';
import { AuthLayout } from 'src/layouts/auth';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';
import regex from 'src/regex';
import LoginForm from 'src/sections/auth/login';
import { LOADER_CLOSE, SNACKBAR_OPEN } from 'src/store/constants/common';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

export interface LoginProps {
  email: string;
  password: string;
  deviceId: string;
}

const initialValues: LoginProps = {
  email: '',
  password: '',
  deviceId: uuidv4(),
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('please enter valid email')
    .matches(regex.EMAIL, t(tokens.validationMessage.validEmail))
    .max(LAST_NAME_LENGTH.MAX)
    .required(t(tokens.validationMessage.requiredEmail)),
  password: Yup.string()
    .trim()
    .min(PASSWORD_LENGTH.MIN, t(tokens.validationMessage.passwordMinimumLength))
    .max(PASSWORD_LENGTH.MAX, t(tokens.validationMessage.passwordMaximumLength))
    // .matches(regex.PASSWORD, t(tokens.validationMessage.passwordRegexFail))
    .required(t(tokens.validationMessage.passwordRequired)),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { signIn } = useAuth<AuthContextType>();
  const onSubmit = async (values: LoginProps) => {
    try {
      await signIn(values.email, values.password, values.deviceId);
      router.push(paths.index);
    } catch (err) {
      dispatch({ type: LOADER_CLOSE });
      dispatch({
        type: SNACKBAR_OPEN,
        payload: { open: true, message: err.data.message, severity: 'error' },
      });
    }
  };

  return (
    <>
      <Seo title="Login" />
      <Grid
        container
        spacing={6}
        sx={{ height: '100%' }}
      >
        <Grid
          item
          sm={12}
          md={6}
          lg={6}
        >
          <Stack
            height="100%"
            py={10}
          >
            <Typography
              variant="h1"
              sx={{ lineHeight: 2 }}
            >
              Log In to your account
            </Typography>
            <LoginForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            />
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          {/* <Box
              sx={{
                height: '100%',
                backgroundImage: `url('/assets/images/loginimg.webp')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right',
                backgroundSize: 'contain',
                overflow: 'hidden',
                borderRadius: '12px',
                display: { sm: 'none', md: 'block', lg: 'block', xl: 'block' },
              }}
            /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
Login.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
