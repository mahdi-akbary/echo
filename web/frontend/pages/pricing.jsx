import {
  Page,
  Layout,
  Grid,
  Text,
  BlockStack,
  Divider,
  Box,
  Icon,
  InlineStack,
  Button,
  Card,
  Image,
  Loading,
  SkeletonBodyText,
  SkeletonDisplayText,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { CircleTickMajor } from "@shopify/polaris-icons";
import { BILLING_PLANS } from "../../billing";
import { useState } from "react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export default function Pricing () {
  const [currentBilling, setCurrentBilling] = useState(null);
  const [loadingUnsubscription, setLoadingUnsubscription] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(null);
  const fetch = useAuthenticatedFetch();

  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const { refetch: refetchBillings, isLoading: isLoading, isRefetching: isRefetching } = useAppQuery({
    url: "/api/billings", reactQueryOptions: {
      onSuccess: (data) => {
        setCurrentBilling(data);
      },
    },
  });

  const appFeatures = [
    "AI Product Recommendation",
    "Custom Image Banners",
    "Trust Badges",
    "Custom Fields in Checkout",
    "Quantity Modifier",
    "Free Gift with Purchase",
    "Customer Survey in Checkout",
    "Customer Feedback on Thank You Page"
  ]

  const loadingMarkup = (
    <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
      <Loading />
      <Grid.Cell >
        <Card padding="500" background="">
          <BlockStack gap="200">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </BlockStack>
        </Card>
      </Grid.Cell>
      <Grid.Cell >
        <Card padding="500" background="">
          <BlockStack gap="200">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </BlockStack>
        </Card>
      </Grid.Cell>
      <Grid.Cell >
        <Card padding="500" background="">
          <BlockStack gap="200">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </BlockStack>
        </Card>
      </Grid.Cell>
    </Grid>
  );

  const onSubmit = async (data) => {
    const response = await fetch("/api/billings", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const { redirectUrl } = await response.json();
      setLoadingSubscription(null);
      if (redirectUrl) {
        redirect.dispatch(Redirect.Action.REMOTE, redirectUrl);
      }
    }
  };

  const handleUnsubscribe = async () => {
    const url = "/api/billings/unsubscribe";
    const method = "POST";
    const response = await fetch(url, {
      method,
      body: JSON.stringify({ subscriptionId: currentBilling?.id }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setLoadingUnsubscription(false);
      setCurrentBilling(null);
      refetchBillings;
    }
  };

  const unsubscribeMarkup = currentBilling?.name ? (
    <Button
      tone="critical"
      loading={loadingUnsubscription}
      onClick={async () => {
        setLoadingUnsubscription(true);
        await handleUnsubscribe();
      }}
    >
      Unsubscribe
    </Button>
  ) : null;
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <InlineStack align="space-between">
              <BlockStack gap="200">
                <Text variant="headingMd" fontWeight="semibold">
                  Please select a plan that suits your business
                </Text>
                <Text>
                  Select a plan that suits your business. You can upgrade or
                  downgrade at any time. <br /> Based on the number of orders
                  you receive per month, and the features you need.
                </Text>

                <InlineStack>{unsubscribeMarkup}</InlineStack>
              </BlockStack>
              <Image
                source="https://cdn.shopify.com/s/files/1/0725/8836/2008/files/bill.png?v=1685711340"
                alt="Billing guide"
                style={{ width: "90px", height: "90px" }}
              />
            </InlineStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          { isLoading || isRefetching ? loadingMarkup : 
          <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
            {BILLING_PLANS?.map((plan, index) => (
              <Grid.Cell
                key={index}>
                <Card
                  background={
                    currentBilling?.name === plan.name ||
                      (!currentBilling?.name && plan.amount === 0)
                      ? "bg-surface-success"
                      : "bg"
                  }
                >
                  <BlockStack gap="100">
                    <Text variant="headingLg" as="h2">
                      {plan.name}
                    </Text>
                    <Text
                      tone="success"
                      fontWeight="bold"
                      variant="bodyLg"
                    >
                      {plan.amount == "0" ? "Free" : "$" + plan.amount}
                      <Text
                        tone="subdued"
                        as="span"
                        fontWeight="medium"
                        variant="bodyMd"
                      >
                        / month
                      </Text>
                    </Text>
                    <Text>{plan.description}</Text>
                  </BlockStack>
                  <div style={{ margin: "0.5rem" }}></div>
                  <BlockStack gap="150">
                    <Divider />
                    {plan.features.map((feature, index) => (
                      <InlineStack
                        key={index}
                        blockAlign="center"
                        gap="100"
                        wrap={false}
                      >
                        <Box as="span" width="20px">
                          <Icon source={CircleTickMajor} tone="success" />
                        </Box>
                        <Box as="span" width="100%">
                          <Text>{feature}</Text>
                        </Box>
                      </InlineStack>
                    ))}
                  </BlockStack>
                  <div style={{ margin: "1rem" }}></div>
                  {currentBilling?.name === plan.name ||
                    (!currentBilling?.name && plan.amount === 0) ? (
                    <Button variant="primary" fullWidth disabled>
                      Your current plan
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      fullWidth
                      loading={loadingSubscription == plan.id}
                      disabled={loadingUnsubscription}
                      onClick={async () => {
                        setLoadingSubscription(plan.id);
                        if (plan.amount > 0)
                          await onSubmit({ id: plan.id });
                        else await handleUnsubscribe();
                      }}
                    >
                      {currentBilling?.amount > plan.amount
                        ? "Downgrade plan"
                        : "Upgrade plan"}
                    </Button>
                  )}
                </Card>
              </Grid.Cell>
            ))}
          </Grid>
          }
        </Layout.Section>

        <Layout.Section>
          <Card fullWidth>
            <InlineStack align="space-between">
              <BlockStack gap="150">
                <Text variant="headingMd" fontWeight="semibold">
                  All plans come with a 7-day free trial and includes the following features:
                </Text>

                {appFeatures.map((feature, index) => (
                  <InlineStack
                    key={index}
                    blockAlign="center"
                    gap="100"
                    wrap={false}>

                    <Box as="span" width="20px">
                      <Icon source={CircleTickMajor} tone="success" />
                    </Box>
                    <Box as="span" width="100%">
                      <Text>{feature}</Text>
                    </Box>
                  </InlineStack>
                ))}

              </BlockStack>
              <Image
                source="https://cdn.shopify.com/s/files/1/0793/1333/8655/files/team-work.png?v=1695088038"
                alt="Features guide"
                style={{ width: "90px", height: "90px" }}
              />
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
