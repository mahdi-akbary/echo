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
import { useAuthenticatedFetch, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { CircleTickMajor } from "@shopify/polaris-icons";
import { BILLING_PLANS } from "../../billing";
import { useEffect, useState } from "react";
import { Redirect } from "@shopify/app-bridge/actions";

export default function Pricing () {
  const [currentBilling, setCurrentBilling] = useState(null);
  const [loadingUnsubscription, setLoadingUnsubscription] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(null);
  const fetch = useAuthenticatedFetch();
  const [isLoading, setIsLoading] = useState(false);

  const app = useAppBridge();
  const redirect = Redirect.create(app);
  useEffect(() => getBillings(), [])

  const getBillings = async () => {
    setIsLoading(true)
    const response = await fetch("/api/billings", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      const data = await response.json()
      setCurrentBilling(data);
    }
    setIsLoading(false)
  };

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
    <>
      <Loading />
      <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3 }}>
        <Card padding="8" background="">
          <BlockStack gap="4">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </BlockStack>
        </Card>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3 }}>
        <Card padding="8" background="">
          <BlockStack gap="4">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </BlockStack>
        </Card>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 3, sm: 3, md: 3, lg: 3 }}>
        <Card padding="8" background="">
          <BlockStack gap="4">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </BlockStack>
        </Card>
      </Grid.Cell>
    </>
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
      await getBillings();
    }
  };

  const unsubscribeMarkup = currentBilling?.name ? (
    <Button
      destructive
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
    <Page fullWidth>
      <TitleBar title="Pricing" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card fullWidth>
            <InlineStack align="space-between">
              <BlockStack gap="2">
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
          <Grid columns={{xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
            {isLoading
              ? loadingMarkup
              : BILLING_PLANS?.map((plan, index) => (
                <Grid.Cell
                  key={index}>
                  <Card
                    background={
                      currentBilling?.name === plan.name ||
                        (!currentBilling?.name && plan.amount === 0)
                        ? "bg-success-subdued"
                        : "bg"
                    }
                  >
                    <BlockStack gap="2">
                      <Text variant="heading2xl" as="h2">
                        {plan.name}
                      </Text>
                      <Text
                        color="success"
                        fontWeight="bold"
                        variant="bodyLg"
                      >
                        {plan.amount == "0" ? "Free" : "$" + plan.amount}
                        <Text
                          as="span"
                          color="subdued"
                          fontWeight="medium"
                          variant="bodyMd"
                        >
                          / month
                        </Text>
                      </Text>
                      <Text>{plan.description}</Text>
                    </BlockStack>
                    <div style={{ margin: "1rem" }}></div>
                    <BlockStack gap="3">
                      <Divider />
                      {plan.features.map((feature, index) => (
                        <InlineStack
                          key={index}
                          blockAlign="center"
                          gap="3"
                          wrap={false}
                        >
                          <Box as="span" width="15px">
                            <Icon source={CircleTickMajor} color="success" />
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
                      <Button primary fullWidth disabled>
                        Your current plan
                      </Button>
                    ) : (
                      <Button
                        primary
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
        </Layout.Section>

        <Layout.Section>
          <Card fullWidth>
            <InlineStack align="space-between" gap="3">
              <BlockStack gap="2">
                <Text variant="headingMd" fontWeight="semibold">
                  All plans come with a 7-day free trial and includes the following features:
                </Text>

                {appFeatures.map((feature, index) => (
                  <InlineStack
                    key={index}
                    blockAlign="center"
                    gap="3"
                    wrap={false}>

                    <Box as="span" width="15px">
                      <Icon source={CircleTickMajor} color="success" />
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
