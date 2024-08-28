import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  ListItemText,
  Stack,
  styled,
  Switch,
  Typography,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'src/hooks/use-search-params';
import { SNACKBAR_OPEN } from 'src/store/actions/common';
import Types from 'src/store/constants/transactions';
import { rootReducersState } from 'src/store/reducers';

// const plans = [
//   { name: 'Personal', priceMonthly: 25, priceYearly: 180, totalToken: 174, planAllowed: true },
//   { name: 'Standard', priceMonthly: 60, priceYearly: 480, totalToken: 600, planAllowed: true },
//   { name: 'Pro', priceMonthly: 100, priceYearly: 840, totalToken: 1500, planAllowed: true },
//   {
//     name: 'Enterprise',
//     priceMonthly: null,
//     priceYearly: null,
//     totalToken: null,
//     planAllowed: false,
//   },
// ];

const HighlightCard = styled(Card)({
  transition: 'transform 0.3s, box-shadow 0.3s',
  userSelect: 'none',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  },
});

const Pricing: React.FC = () => {
  const dispatch = useDispatch();
  const [isYearly, setIsYearly] = useState(false);
  const { pricingPlans } = useSelector((state: rootReducersState) => state.transactions);
  const params = useSearchParams();
  // const emailParams = params.get('email');
  const emailParams = atob(params.get('email') || '');
  const nameParams = atob(params.get('name') || '');
  const integraPublicKeyId = atob(params.get('integraPublicKeyId') || '');

  // const customerId = params.get('customerId');
  // const integraPublicKeyId = params.get('integraPublicKeyId');
  // const nameParams = params.get('name');
  const orgIdParams = params.get('org_id');

  const handleToggle = () => {
    setIsYearly(!isYearly);
  };

  useEffect(() => {
    dispatch({
      type: Types.PRICING_PLANS,
    });
  }, []);

  const filteredPlans = pricingPlans.filter(
    (plan: any) => plan.period === (isYearly ? 'year' : 'month')
  );

  const processedPlans = filteredPlans.map((plan: any) => {
    const price = isYearly ? plan.amount * 12 : plan.amount;

    return {
      name: plan.name,
      description: plan.description,
      price: price,
      totalToken: plan.numberOfTokens,
      //tokens: selectedPlan.totalToken,
      planAllowed: plan.name !== 'Enterprise',
      priceId: plan.priceId,
      productId: plan.productId,
    };
  });

  // Add the "Enterprise" plan at the end
  processedPlans.push({
    name: 'Enterprise',
    price: null,
    totalToken: null,
    description: 'For access to Enterprise Plan of enterprise tokens please contact us',
    planAllowed: false,
    priceId: null,
    productId: null,
  });

  const planSelection = async (selectedPlan: any) => {
    dispatch({
      type: Types.PLAN_CHECKOUT,
      payload: {
        emailId: emailParams,
        //tokens: selectedPlan.numberOfTokens,
        tokens: selectedPlan.totalToken,
        integraPublicKeyId: integraPublicKeyId,
        priceId: selectedPlan.priceId, // Replace with your actual price ID
        name: nameParams,
        organizationid: orgIdParams,
      },
    });
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography
        variant="h1"
        component="div"
        gutterBottom
      >
        Pricing Plans
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'center', mb: 5 }}
      >
        <FormGroup
          row
          sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography
            variant="body1"
            sx={{ marginRight: 2 }}
          >
            Monthly Billing
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={isYearly}
                onChange={handleToggle}
                color="primary"
              />
            }
            label=""
            sx={{ mr: 0 }}
          />
          <Typography
            variant="body1"
            //   sx={{ marginLeft: 1 }}
          >
            Yearly Billing
          </Typography>
        </FormGroup>
        <Chip
          label="Save 25%"
          variant="filled"
          color={isYearly ? 'primary' : 'default'}
        />
      </Stack>

      <Grid
        container
        spacing={4}
      >
        {processedPlans.map((plan: any, index: number) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={index}
          >
            <HighlightCard>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  // alignItems="center"
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="h4"
                        component="div"
                      >
                        {plan.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {plan.description}
                      </Typography>
                    }
                  />

                  <Chip
                    label="Recommended"
                    variant="filled"
                    color="primary"
                    size="small"
                    sx={{ mb: 2, opacity: plan.name === 'Pro' ? 1 : 0 }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  component="div"
                  sx={{ opacity: plan.price === null ? 0 : 1, my: 2 }}
                >
                  {/* ${isYearly ? plan.priceYearly : plan.priceMonthly} / {isYearly ? 'year' : 'month'} */}
                  ${plan.price} / {isYearly ? 'year' : 'month'}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{ opacity: plan.totalToken === null ? 0 : 1 }}
                >
                  Total Token : {plan.totalToken}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    if (!plan.planAllowed) {
                      return;
                    }
                    if (!emailParams || !integraPublicKeyId || !nameParams || !orgIdParams) {
                      dispatch({
                        type: SNACKBAR_OPEN,
                        payload: {
                          open: true,
                          message: 'Not a valid request',
                          severity: 'success',
                        },
                      });
                      return;
                    }
                    planSelection(plan);
                  }}
                >
                  {!plan.planAllowed ? 'Contact Us' : 'Choose Plan'}
                </Button>
              </CardContent>
            </HighlightCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Pricing;
