import {
  Card, Page, 
  Layout, 
  Grid, 
  TextContainer, 
  Text,
  VerticalStack,
  Divider,
  Box,
  Icon,
  HorizontalStack,
  Button,
  CalloutCard,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { CircleTickMajor } from '@shopify/polaris-icons';


const PricingData = [
  {
    title: "Free plan",
    price: "0",
    description: "For small businesses",
    features: [
      "Up to 200 orders per month",
      "Countdown timer",
      "Product recommendations",
      "Trust badges",
      "Custom image banner",
      "Basic support",
    ],
  },
  {
    title: "Basic",
    price: "$29.99",
    description: "For growing businesses",
    features: [
      "Up to 2000 orders per month",
      "Countdown timer",
      "Product recommendations",
      "Trust badges",
      "Custom image banner",
      "Fast email support"
    ],
  },
  {
    title: "Premium",
    subheader: "Most popular",
    price: "$59.99",
    description: "For large businesses",
    features: [
      "Unlimited orders",
      "Countdown timer",
      "Product recommendations",
      "Trust badges",
      "Custom image banner",
      "Priority email support",
    ],
  },
];

export default function Pricing() {
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
            { PricingData.map((pricing) => (
              <Grid.Cell columnSpan={{ xs: 12, md: 4, lg: 4, xl: 4 }}>
                <Card sectioned>
                    <VerticalStack gap='2'>
                      <Text variant="heading2xl" as="h2">{pricing.title}</Text>
                      <Text color="success" fontWeight="bold" variant="bodyLg">
                        { pricing.price == '0' ? 'Free' : pricing.price } 
                        <Text as="span" color="subdued" fontWeight="medium" variant="bodyMd">
                          / month
                        </Text>
                      </Text>
                      <Text>{pricing.description}</Text>
                    </VerticalStack>
                    <div style={{margin: '1rem' }}></div>
                    <VerticalStack gap="3">
                      <Divider />
                      { pricing.features.map((feature, index) => (
                        <HorizontalStack key={index} blockAlign='center' gap='3' wrap={false}>
                          <Box as="span" width="15px">
                            <Icon source={ CircleTickMajor } color='success' />
                          </Box>
                          <Box as="span" width="100%">
                            <Text>{ feature }</Text>
                          </Box>
                        </HorizontalStack>
                      ))}
                    </VerticalStack>
                    <div style={{margin: '1rem' }}></div>

                    <Button primary fullWidth>Select plan</Button>

                </Card>
              </Grid.Cell>
            ))
            }

        </Grid>

          
        </Layout.Section>
      </Layout>
    </Page>
  );
}
