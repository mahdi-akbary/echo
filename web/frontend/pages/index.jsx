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
  TextContainer
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useState } from "react";
import { CountChart, AddedProductList } from "../components";
import { Redirect } from "@shopify/app-bridge/actions";

export default function HomePage () {
  const { smUp } = useBreakpoints();
  const [displayVideoGuide, setDisplayVideoGuide] = useState();

  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleVideoGuideClick = () => {
    setDisplayVideoGuide(!displayVideoGuide);
  }
  return (
    <Page>
      <TitleBar title="Dashboard" primaryAction={null} />
      <Layout>

        <Modal
          open={displayVideoGuide}
          onClose={handleVideoGuideClick}
          title="Reach more shoppers with Instagram product tags"
          primaryAction={{
            content: 'Add Instagram',
            onAction: handleVideoGuideClick,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: handleVideoGuideClick,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>

        <Layout.Section>
          <CalloutCard title="Customize the checkout on Customiser"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Customize checkout',
              onAction: () => redirect.dispatch(Redirect.Action.ADMIN_PATH, '/settings/checkout/editor'),
            }}
            secondaryAction={{
              content: 'Video guide',
              onAction: handleVideoGuideClick,
            }}
          >
            <p>
              Customize the checkout experience for your customers. Add AI product recommendations, upsells, cross-sells, trust badges, and more.
            </p>
          </CalloutCard>
        </Layout.Section>
        <Layout.Section>
          <VerticalStack gap={'1'} >
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
                paddingInlineEnd={{ xs: 4, sm: 0 }}>
                <VerticalStack gap="4">
                  <Text as="h3" variant="headingMd">
                    AI Product Recommendations
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Use AI to recommend products to your customers. View analytics to see how your recommendations are performing.
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

      </Layout>


    </Page>
  );
}
