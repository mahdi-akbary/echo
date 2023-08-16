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
  HorizontalGrid,
  Popover,
  ColorPicker,
  TextField,
  rgbString,
  hsbToRgb,
  rgbToHex,
} from "@shopify/polaris";
import {
  useAuthenticatedFetch,
  TitleBar,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import { useAppQuery } from "../hooks";
import { ColorPickerInput } from "../components";

export default function Branding() {
  const fetch = useAuthenticatedFetch();
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/branding",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  console.log(data);

  const getBillings = async () => {
    setIsLoading(true);
    const response = await fetch("/api/billings", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      setCurrentBilling(data);
    }
    setIsLoading(false);
  };

  const loadingMarkup = (
    <>
      <Loading />
      <AlphaCard background="">
        <VerticalStack gap="4">
          <SkeletonBodyText />
          <SkeletonBodyText />
          <SkeletonBodyText />
          <SkeletonDisplayText size="medium" />
        </VerticalStack>
      </AlphaCard>
    </>
  );

  const updateBrand = async () => {
    const response = await fetch("/api/branding", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res, "<<<<<<");
    }
  };

  return (
    <Page fullWidth>
      <TitleBar title="Branding" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <AlphaCard fullWidth>
            <HorizontalStack align="space-between">
              <VerticalStack gap="4">
                <Text variant="headingMd" fontWeight="semibold">
                  You can customize the appearance of the checkout
                </Text>
                <Text>
                  Select a plan that suits your business. You can upgrade or
                  downgrade at any time. <br /> Based on the number of orders
                  you receive per month, and the features you need.
                </Text>
              </VerticalStack>
              <Box>
                <Button primary size="large" onClick={updateBrand}>
                  {" "}
                  activate{" "}
                </Button>
              </Box>
            </HorizontalStack>
          </AlphaCard>
        </Layout.Section>
        <Layout.Section>
          <HorizontalGrid columns={{ xs: "2fr", md: "3fr 6fr" }} gap="4">
            <Box
              paddingBlockStart="5"
              as="section"
              paddingInlineStart={{ xs: 4, sm: 0 }}
              paddingInlineEnd={{ xs: 4, sm: 0 }}
            >
              <VerticalStack gap="3">
                <Text as="h3" variant="headingMd">
                  Coloring
                </Text>
                <Text as="p" variant="bodyMd">
                  Here you can update the colors.
                </Text>
              </VerticalStack>
            </Box>
            <Box
              paddingBlockStart="5"
              as="section"
              paddingInlineStart="5"
              paddingInlineEnd={{ xs: 4, sm: 0 }}
            >
              <AlphaCard>
                <ColorPickerInput />
              </AlphaCard>
            </Box>
          </HorizontalGrid>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
