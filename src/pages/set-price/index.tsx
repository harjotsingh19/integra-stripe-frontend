import { Box, Container, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Seo } from 'src/components/seo';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';
import { tokens } from 'src/locales/tokens';
import SetPriceForm from 'src/sections/set-price-form';
import * as Yup from 'yup';

export interface ISetPriceProps {
  tokenValue: string;
}

const initialValues: ISetPriceProps = {
  tokenValue: '',
};

Yup.addMethod(Yup.string, 'trimmed', function () {
  return this.transform((value) => (value && typeof value === 'string' ? value.trim() : value));
});

const validationSchema = Yup.object({
  tokenValue: Yup.string().trim().required(t(tokens.validationMessage.requiredTokenValue)),
});

const SetPrice = () => {
  const dispatch = useDispatch();

  const onSubmit = (values: ISetPriceProps, { resetForm }: any) => {
    const { tokenValue } = values;
    console.log('🚀 ~ onSubmit ~ tokenValue:', tokenValue);

    // dispatch({
    //   type: AuthTypes.RESET_PASSWORD_REQUEST,
    //   payload: { data: resetData },
    // });

    resetForm();
  };

  return (
    <>
      <Seo title="Set Token Price" />

      <Box component="main">
        <Stack sx={{ py: 6 }}>
          <Container maxWidth="xl">
            <Typography variant="h1">Set Token Price</Typography>
            <SetPriceForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            />
          </Container>
        </Stack>
      </Box>
    </>
  );
};

export default SetPrice;
SetPrice.getLayout = (page: ReactNode) => <DashboardLayout>{page}</DashboardLayout>;
