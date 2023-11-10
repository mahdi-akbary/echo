import {
  Page,
  Layout,
  CalloutCard,
  BlockStack,
  InlineGrid,
  Box,
  Text,
  Divider,
  Banner,
  Card,
} from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useState } from "react";
import {
  CountChart,
  AddedProductList,
  SurveyCountChart,
  FeedbackCountChart,
  OverviewModal,
} from "../components";
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppQuery } from "../hooks";

export default function HomePage () {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [isBannerClosed, setIsBannerClosed] = useState(localStorage.getItem('isBannerClosed'));
  const [displayVideoGuide, setDisplayVideoGuide] = useState();

  const handleVideoGuideClick = () => {
    setDisplayVideoGuide(!displayVideoGuide);
  };

  const { data, error } = useAppQuery({ url: '/api/branding/is-compatible' });
  if (error) {
    // Handle the error appropriately in your UI
    console.error("Error fetching shopifyPlus:", error);
  }
  
  // Be aware that `data` might initially be `undefined` until the fetch completes
  const shopifyPlusStatus = data?.shopifyPlus;

  const bannerHtml = (shopifyPlusStatus === false && !isBannerClosed) ? <Layout.Section>
    <Card>
      <Banner onDismiss={() => {
        setIsBannerClosed(true)
        localStorage.setItem('isBannerClosed', true)
      }}>
        <p>
          Thank you for installing our app. Currently, checkout extensibility is only for Shopify Plus merchants. However, Shopify plans to expand this feature to Basic, Shopify, and Advanced plans by <strong>April 30, 2024</strong>. We will notify you once it becomes available for your store. Thank you for your patience and support.
        </p>
      </Banner>
    </Card>
  </Layout.Section> : null

  return (
    <Page >
      <Layout>
        <OverviewModal
          displayVideoGuide={displayVideoGuide}
          handleVideoGuideClick={handleVideoGuideClick}
          redirect={redirect} />
        {bannerHtml}

        <Layout.Section>
          <CalloutCard
            title="Customize the checkout on Customiser"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: "Customize checkout",
              onAction: () =>
                redirect.dispatch(
                  Redirect.Action.ADMIN_PATH,
                  "/settings/checkout/editor"
                ),
            }}
            secondaryAction={{
              content: "Video guide",
              onAction: handleVideoGuideClick,
            }}
          >
            <Text>
              Customize the checkout experience for your customers. Add AI
              product recommendations, upsells, cross-sells, trust badges, and
              more.
            </Text>
          </CalloutCard>
        </Layout.Section>

        <Layout.Section>
          <Box paddingBlockStart="500" paddingBlockEnd="300">
            <BlockStack gap="200">
              <Text variant="headingLg" as="h2">
                Dashboard & Analytics
              </Text>
              <Text as="span" color="subdued">
                Here’s what happened with your store in the past 7 days.
              </Text>
              <Divider borderWidth="0" />
            </BlockStack>
          </Box>
        </Layout.Section>

        <Layout.Section>
          <BlockStack gap={{ xs: "800", sm: "400" }}>
            <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
              <Box
                as="section"
                paddingInlineStart={{ xs: 400, sm: 0 }}
                paddingInlineEnd={{ xs: 400, sm: 0 }}
              >
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    AI Product Recommendations
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Use AI to recommend products to your customers. View
                    analytics to see how your recommendations are performing.
                  </Text>
                </BlockStack>
              </Box>
              <CountChart />
              <Box></Box>
              <AddedProductList />
            </InlineGrid>
          </BlockStack>
        </Layout.Section>

        <Layout.Section>
          <BlockStack gap={{ xs: "800", sm: "400" }}>
            <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
              <Box
                as="section"
                paddingInlineStart={{ xs: 400, sm: 0 }}
                paddingInlineEnd={{ xs: 400, sm: 0 }}
              >
                <BlockStack gap="200">
                  <Text as="h3" variant="headingMd">
                    Survey & Feedbacks
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Here you can have customer's responses at a glance.
                  </Text>
                </BlockStack>
              </Box>
              <SurveyCountChart />
              <Box></Box>
              <FeedbackCountChart />
            </InlineGrid>
            <Box padding="400"></Box>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
