import {
  Card,
  Box,
  Button,
  InlineGrid,
  InlineStack,
  Loading,
  SkeletonBodyText,
  Text,
  BlockStack,
  SkeletonDisplayText,
  Toast,
  Banner,
} from "@shopify/polaris";
import { ProductGiftList } from "./productGiftList";
import { useEffect, useState } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { ThresholdModal } from "./thresholdModal";
import { ResourcePicker } from '@shopify/app-bridge-react';
export function FreeGift ({ setAction, unsetAction }) {


  const fetch = useAuthenticatedFetch();
  const [list, setList] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [productVariantIds, setProductVariantsIds] = useState([]);

  const [searchModalToggle, setSearchModalToggle] = useState(false);
  const [thresholdModalToggle, setThresholdModalToggle] = useState(false);

  const actions = { setSearchModalToggle, setThresholdModalToggle }

  const { isLoading: isLoadingDiscount, isRefetching: isRefetchingDiscount, refetch: refetchDiscount } = useAppQuery({
    url: "/api/products/discounts", reactQueryOptions: {
      onSuccess: (data) => {
        if (data?.amount)
          setDiscount(data);
      },
    },
  });

  useEffect(() => {
    if (setAction) {
      actions[setAction](true)
    }
  }, [setAction]);

  const loadingMarkup = (
    <Card>
      <Loading />
      <BlockStack gap="200">
        <InlineStack align="space-between">
          <SkeletonBodyText lines={1} />
          <SkeletonDisplayText size="medium" />
        </InlineStack>
        <SkeletonBodyText />
      </BlockStack>
    </Card>
  )

  const { isRefetching: isRefetching, isLoading: isLoading, refetch: refetch } = useAppQuery({
    url: "/api/products", reactQueryOptions: {
      onSuccess: (data) => {
        setProductVariantsIds(data?.map((item) => ({ id: item?.variant_id })))
        setList(
          data?.map((item) => [
            item?.display_name,
            item?.price,
            item?.inventory_quantity
          ])
        );
      },
    },
  });


  const addProductMarkup =
    // discount?.amount ?
    false ?
      <Button size="slim" onClick={() => setSearchModalToggle(true)}> Add Product </Button> :
      null

  const giftListMarkup = <Box position="relative">
    {isLoading || isRefetching || isSaving ?
      <SkeletonBodyText />
      : <ProductGiftList rows={list} />}
  </Box>

  const [toastContent, setToastContent] = useState({ content: null });

  const toastMarkup = toastContent.content && (
    <Toast {...toastContent} onDismiss={() => setToastContent({ content: null })} />
  );

  const handleVariantSelection = async ({ selection }) => {
    setSearchModalToggle(false)
    setIsSaving(true)
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        variants: selection,
        discountId: discount?.discount_id,
        discountAmount: discount?.amount,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setToastContent({ content: 'Saved!' })
      setIsSaving(false)
      refetch()
    } else {
      setIsSaving(false)
      const data = await response.json();
      setToastContent({ content: data.message })
    }
  }

  return (
    <BlockStack gap={{ xs: "800", sm: "400" }}>
      <Banner>
        <p>
          Free gifts with purchase provide added value, motivating customers to buy and boosting conversion rates.
        </p>
      </Banner>
      {/* <InlineGrid columns={{ xs: "2fr", md: "3fr 6fr" }} gap="500"> */}
      {/* <Box
          paddingBlockStart="050"
          as="section"
          paddingInlineStart={{ xs: 400, sm: 0 }}
          paddingInlineEnd={{ xs: 400, sm: 0 }}
        >
          <BlockStack gap="200">
            <Text as="h3" variant="headingMd">
              Checkout Free Gifts
            </Text>
            <Text as="p" variant="bodyMd">
              Free gifts with purchase provide added value, motivating customers to buy and boosting conversion rates.
            </Text>
          </BlockStack>
        </Box> */}
      <Box
        paddingBlockStart="5"
        as="section"
        paddingInlineStart="5"
        paddingInlineEnd={{ xs: 400, sm: 0 }}
      >
        {
          isLoadingDiscount || isRefetchingDiscount ? loadingMarkup :
            <Card>
              <BlockStack>
                <Box background="bg-surface-brand-active" padding="150">
                  <InlineStack align="space-between" blockAlign="center">
                    {/* <Box> */}
                    <Text as="h2" variant="headingMd" fontWeight="bold">
                      Threshold
                    </Text>
                    <Text
                      as="p"
                      variant="bodyLg"
                      tone="success"
                      fontWeight="bold"
                    >
                      {discount?.amount ? discount?.amount : "Not set"}
                    </Text>
                    {/* </Box> */}
                    {/* <InlineStack gap="200" blockAlign="center">
                    {addProductMarkup}
                    <Button isLoading={isLoadingDiscount} variant="primary" onClick={() => setThresholdModalToggle(true)}>
                      Set Threshold
                    </Button>
                  </InlineStack> */}
                  </InlineStack>
                </Box>
                {discount ? giftListMarkup : null}
              </BlockStack>
            </Card>
        }
      </Box>
      {/* </InlineGrid> */}

      <ThresholdModal
        isOpen={thresholdModalToggle}
        handleClose={() => {
          setThresholdModalToggle(false)
          unsetAction()
        }}
        discount={discount}
        refetch={refetchDiscount}
      />
      <ResourcePicker
        initialSelectionIds={productVariantIds}
        onSelection={handleVariantSelection}
        resourceType="ProductVariant"
        open={searchModalToggle}
        onCancel={() => {
          setSearchModalToggle(false)
          unsetAction()
        }} />
      {toastMarkup}
    </BlockStack>

  );
}
