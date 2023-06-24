import {
  Page,
  Layout,
  Grid,
  Text,
  VerticalStack,
  Divider,
  Box,
  Icon,
  HorizontalStack,
  Button,
  AlphaCard,
  Image,
  Loading,
  SkeletonBodyText,
  SkeletonDisplayText,
} from "@shopify/polaris";
import { useAuthenticatedFetch, TitleBar } from "@shopify/app-bridge-react";
import { CircleTickMajor } from "@shopify/polaris-icons";
import { BILLING_PLANS } from "../../billing";
import { useState } from "react";
import { useAppQuery } from "../hooks";

import createApp from "@shopify/app-bridge";
import { Redirect } from "@shopify/app-bridge/actions";
import { getAppConfig } from "../hooks/useAuthenticatedFetch";

export default function Pricing() {
  const [currentBilling, setCurrentBilling] = useState(null);
  const [loadingUnsubscription, setLoadingUnsubscription] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(null);
  const fetch = useAuthenticatedFetch();

  const [config] = useState(getAppConfig);

  const app = createApp(config);
  const redirect = Redirect.create(app);

  const {
    isRefetching: isRefetching,
    isLoading: isLoading,
    refetch,
  } = useAppQuery({
    url: "/api/billings",
    reactQueryOptions: {
      onSuccess: (data) => {
        setCurrentBilling(data);
      },
    },
  });

  const loadingMarkup = (
    <>
      <Loading />
      <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 2, lg: 4 }}>
        <AlphaCard padding="8" background="">
          <VerticalStack gap="4">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </VerticalStack>
        </AlphaCard>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 2, lg: 4 }}>
        <AlphaCard padding="8" background="">
          <VerticalStack gap="4">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </VerticalStack>
        </AlphaCard>
      </Grid.Cell>
      <Grid.Cell columnSpan={{ xs: 4, sm: 4, md: 2, lg: 4 }}>
        <AlphaCard padding="8" background="">
          <VerticalStack gap="4">
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonBodyText />
            <SkeletonDisplayText size="medium" />
          </VerticalStack>
        </AlphaCard>
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
      refetch();
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
          <AlphaCard fullWidth>
            <HorizontalStack align="space-between">
              <VerticalStack gap="4">
                <Text variant="headingMd" fontWeight="semibold">
                  Please select a plan that suits your business
                </Text>
                <Text>
                  Select a plan that suits your business. You can upgrade or
                  downgrade at any time. <br /> Based on the number of orders
                  you receive per month, and the features you need.
                </Text>
                <HorizontalStack>{unsubscribeMarkup}</HorizontalStack>
              </VerticalStack>
              <Image
                source="https://cdn.shopify.com/s/files/1/0725/8836/2008/files/bill.png?v=1685711340"
                alt="Form postion guide"
                style={{ width: "90px", height: "90px" }}
              />
            </HorizontalStack>
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <Grid>
            {isLoading || isRefetching
              ? loadingMarkup
              : BILLING_PLANS?.map((plan, index) => (
                  <Grid.Cell
                    key={index}
                    columnSpan={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 4 }}
                  >
                    <AlphaCard
                      background={
                        currentBilling?.name === plan.name ||
                        (!currentBilling?.name && plan.amount === 0)
                          ? "bg-success-subdued"
                          : "bg"
                      }
                    >
                      <VerticalStack gap="2">
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
                      </VerticalStack>
                      <div style={{ margin: "1rem" }}></div>
                      <VerticalStack gap="3">
                        <Divider />
                        {plan.features.map((feature, index) => (
                          <HorizontalStack
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
                          </HorizontalStack>
                        ))}
                      </VerticalStack>
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
                    </AlphaCard>
                  </Grid.Cell>
                ))}
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
