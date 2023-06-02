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
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { CircleTickMajor } from '@shopify/polaris-icons';


const PricingData = [
  {
    title: "Free plan",
    price: "0",
    description: "All features included",
    features: [
      "Up to 200 orders per month",
      "Basic support",
    ],
  },
  {
    title: "Basic",
    price: "$29.99",
    description: "Basic plan",
    features: [
      "Up to 2000 orders per month",
      "Fast email support"
    ],
  },
  {
    title: "Premium",
    subheader: "Most popular",
    price: "$59.99",
    description: "Premium plan",
    features: [
      "Unlimited orders",
      "Priority email support",
    ],
  },
];

export default function Pricing() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
        <Grid>
            { PricingData.map((pricing) => (
              <Grid.Cell columnSpan={{ xs: 12, md: 4, lg: 4, xl: 4 }}>
                <Card sectioned>
                    <Text variant="heading2xl" as="h2">{pricing.title}</Text>
                    <Text>{ pricing.price == '0' ? 'Free' : pricing.price }</Text>
                    <Text>{pricing.description}</Text>
                    <Text>{pricing.buttonText}</Text>
                    <Text>{pricing.buttonVariant}</Text>
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
