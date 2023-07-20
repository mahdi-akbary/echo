import { Card, Page, Layout, TextContainer, Text, VerticalStack, HorizontalGrid, Box, Divider, AlphaCard } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export default function Settings () {
  return (
    <Page>
      <TitleBar
        title="Settings"
        primaryAction={{
          content: "Primary action",
          onAction: () => console.log("Primary action"),
        }}
        secondaryActions={[
          {
            content: "Secondary action",
            onAction: () => console.log("Secondary action"),
          },
        ]}
      />
      <Layout>
        <Layout.Section>
          <Box paddingBlockStart='5'>
            <VerticalStack gap={'2'} >
              <Text variant="headingLg" as="h2">
                Extension settings
              </Text>
              <Text as="span" color="subdued">
                Here’s what you need to setup some extensions based on your needs. please refer to `How to use` for more information
              </Text>

              <Divider borderWidth="1" />
            </VerticalStack>
          </Box>
        </Layout.Section>
        <Layout.Section>
          <VerticalStack gap={{ xs: "8", sm: "4" }}>
            <HorizontalGrid columns={{ xs: "2fr", md: "3fr 6fr" }} gap="4">
              <Box
                paddingBlockStart='5'
                as="section"
                paddingInlineStart={{ xs: 4, sm: 0 }}
                paddingInlineEnd={{ xs: 4, sm: 0 }}>
                <VerticalStack gap="3">
                  <Text as="h3" variant="headingMd">
                    Checkout Free Gifts
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Giving free gifts to customers if their purchase price reaches a certain threshold is so cool, here you'r able to select the free gifts and set thresholds accordingly.
                  </Text>
                </VerticalStack>
              </Box>
              <Box
                paddingBlockStart='5'
                
                as="section"
                paddingInlineStart='5'
                paddingInlineEnd={{ xs: 4, sm: 0 }}>
                <VerticalStack gap="3">

                  
                  <AlphaCard>
                  <Text as="h3" >
                    Threshold: {'0'}
                  </Text>
                  </AlphaCard>
                </VerticalStack>
              </Box>

              {/* <CountChart /> */}
              <Box></Box>
              {/* <AddedProductList /> */}
            </HorizontalGrid>
            <Box padding="4"></Box>
          </VerticalStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
