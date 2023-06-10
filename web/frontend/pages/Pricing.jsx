import {
  Card, Page, Layout, Grid, Text, VerticalStack, Divider, Box, Icon, HorizontalStack, Button, CalloutCard, AlphaCard
} from "@shopify/polaris";
import { useNavigate, useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { CircleTickMajor } from '@shopify/polaris-icons';
import { BILLING_PLANS } from "../../billing";
import { useState } from "react";
import { useAppQuery } from "../hooks";

export default function Pricing () {
  const [loading, setLoading] = useState(false);
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();

  const { data: currentBilling, isRefetching: isRefetching, isLoading: isLoading, refetch } = useAppQuery({
    url: "/api/billings"
  });


  const onSubmit = async (data) => {
    setLoading(true)
    const response = await fetch('/api/billings', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const { url } = await response.json();
      if (url) {
        navigate(url)
        setLoading(false)
      }
    }
  };

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <CalloutCard
            title="Please select a plan that suits your business"
            illustration="https://cdn.shopify.com/s/files/1/0725/8836/2008/files/bill.png?v=1685711340"
            primaryAction={{
              content: 'Select plan',
              url: '#',
            }}>
            <Text>
              Select a plan that suits your business. You can upgrade or downgrade at any time. <br /> Based on the number of orders you receive per month, and the features you need.
            </Text>

          </CalloutCard>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            {BILLING_PLANS?.map((plan, index) => (
              <Grid.Cell key={index} columnSpan={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}>
                <AlphaCard background={currentBilling?.name === plan.name || (!currentBilling && plan.amount === 0) ? 'bg-success-subdued' : 'bg'}>
                  <VerticalStack gap='2'>
                    <Text variant="heading2xl" as="h2">{plan.name}</Text>
                    <Text color="success" fontWeight="bold" variant="bodyLg">
                      {plan.amount == '0' ? 'Free' : '$' + plan.amount}
                      <Text as="span" color="subdued" fontWeight="medium" variant="bodyMd">
                        / month
                      </Text>
                    </Text>
                    <Text>{plan.description}</Text>
                  </VerticalStack>
                  <div style={{ margin: '1rem' }}></div>
                  <VerticalStack gap="3">
                    <Divider />
                    {plan.features.map((feature, index) => (
                      <HorizontalStack key={index} blockAlign='center' gap='3' wrap={false}>
                        <Box as="span" width="15px">
                          <Icon source={CircleTickMajor} color='success' />
                        </Box>
                        <Box as="span" width="100%">
                          <Text>{feature}</Text>
                        </Box>
                      </HorizontalStack>
                    ))}
                  </VerticalStack>
                  <div style={{ margin: '1rem' }}></div>
                  {
                    currentBilling?.name === plan.name || (!currentBilling && plan.amount === 0) ?
                      <Button primary fullWidth disabled >Your current plan</Button> :
                      <Button primary fullWidth onClick={async () => (await onSubmit({ id: plan.id }))}>
                        {currentBilling?.amount > plan.amount ? 'Downgrade plan' : 'Upgrade plan'}
                      </Button>
                  }
                </AlphaCard>
              </Grid.Cell>
            ))
            }

          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
