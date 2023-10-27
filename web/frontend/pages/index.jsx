import {
  Page,
  Layout,
  CalloutCard,
  VerticalStack,
  HorizontalGrid,
  Box,
  Text,
  Divider,
  useBreakpoints,
  Modal,
  TextContainer,
  Spinner,
  Banner,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import {
  CountChart,
  AddedProductList,
  SurveyCountChart,
  FeedbackCountChart,
} from "../components";
import { Redirect } from "@shopify/app-bridge/actions";

export default function HomePage () {
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const [displayVideoGuide, setDisplayVideoGuide] = useState();

  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleVideoGuideClick = () => {
    setDisplayVideoGuide(!displayVideoGuide);
  };
  return (
    <Page fullWidth>
      <TitleBar title="Dashboard" primaryAction={null} />
      <Layout>
        <Modal
        large
          open={displayVideoGuide}
          onClose={handleVideoGuideClick}
          title="An Overview"
          secondaryActions={[
            {
              content: "Learn more",
              onAction: () => {
                redirect.dispatch(
                  Redirect.Action.APP,
                  "/how-to-use"
                )
                handleVideoGuideClick()
              }
            },
          ]}
        >
          <Modal.Section>
            <Box
              position="relative"
              width= "100%"
              minHeight={`500px`}
            >
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  zIndex: 1,
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              >
                <Spinner size="large" />
              </div>
              <iframe
                src="https://www.loom.com/embed/6b259d6d5363409fb50f02cc9e628968?sid=e53f57c6-3386-48bf-82f9-2da4d710abcf?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
                frameBorder="0"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "500px",
                  zIndex: 2,
                  position: "relative",
                }}
              ></iframe>
            </Box>
          </Modal.Section>
        </Modal>

        <Layout.Section>
          <div style={{
            paddingBottom: "1rem",
          }}>
            <Banner status="info">
              <p>
              Thank you for installing our app. Currenlty, checkout extensibility is only available for Shopify Plus merchants. Shopify has announced that checkout extensions will be available for <strong>Basic</strong>, <strong>Shopify</strong>, and <strong>Advanced</strong> plans by <strong>April 30, 2024</strong>. Until then, you can keep the app installed and we will inform you once it's available for your store. We appreciate your patience and support.
              </p>
            </Banner>
          </div>

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
          <VerticalStack gap={"1"}>
            <Text variant="headingLg" as="h2">
              Dashboard & Analytics
            </Text>
            <Text as="span" color="subdued">
              Here’s what’s happening with your store in the past 7 days.
            </Text>
            <Divider borderWidth="0" />
          </VerticalStack>
        </Layout.Section>
        <Layout.Section>
          <VerticalStack gap={{ xs: "8", sm: "4" }}>
            <HorizontalGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="4">
              <Box
                as="section"
                paddingInlineStart={{ xs: 4, sm: 0 }}
                paddingInlineEnd={{ xs: 4, sm: 0 }}
              >
                <VerticalStack gap="4">
                  <Text as="h3" variant="headingMd">
                    AI Product Recommendations
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Use AI to recommend products to your customers. View
                    analytics to see how your recommendations are performing.
                  </Text>
                </VerticalStack>
              </Box>
              <CountChart />
              <Box></Box>
              <AddedProductList />
            </HorizontalGrid>
            <Box padding="4"></Box>
          </VerticalStack>
        </Layout.Section>

        <Layout.Section>
          <VerticalStack gap={{ xs: "8", sm: "4" }}>
            <HorizontalGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="4">
              <Box
                as="section"
                paddingInlineStart={{ xs: 4, sm: 0 }}
                paddingInlineEnd={{ xs: 4, sm: 0 }}
              >
                <VerticalStack gap="4">
                  <Text as="h3" variant="headingMd">
                    Survey & Feedbacks
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Here you can have customer's responses at a glance.
                  </Text>
                </VerticalStack>
              </Box>
              <SurveyCountChart />
              <Box></Box>
              <FeedbackCountChart />
            </HorizontalGrid>
            <Box padding="4"></Box>
          </VerticalStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
