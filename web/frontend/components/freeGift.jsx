import {
  Card,
  Box,
  Button,
  InlineGrid,
  InlineStack,
  Loading,
  SkeletonBodyText,
  Spinner,
  Text,
  BlockStack,
  SkeletonDisplayText,
} from "@shopify/polaris";
import { ProductGiftList } from "./productGiftList";
import { SearchGiftProductModal } from "./searchGiftProductModal";
import { useState } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { ThresholdModal } from "./thresholdModal";
export function FreeGift () {
  const fetch = useAuthenticatedFetch();
  const [list, setList] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { isLoading: isLoadingDiscount, isRefetching: isRefetchingDiscount, refetch: refetchDiscount } = useAppQuery({
    url: "/api/products/discounts", reactQueryOptions: {
      onSuccess: (data) => {
        if (data?.amount)
          setDiscount(data);
      },
    },
  });

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
        setList(
          data?.map((item) => [
            item?.display_name,
            item?.price,
            item?.inventory_quantity,
            <Button
              variant="plain"
              tone="critical"
              onClick={async () => { await handleProductDelete(item) }}
            >
              Delete
            </Button>,
          ])
        );
      },
    },
  });
  const handleProductDelete = async (item) => {

    setIsDeleting(true)
    const response = await fetch(`/api/products/${item?.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setIsDeleting(false)
      refetch();
    } else {
      setIsDeleting(false)
      refetch();
    }
  }
  const [searchModalToggle, setSearchModalToggle] = useState(false);

  const [thresholdModalToggle, setThresholdModalToggle] = useState(false);

  const addProductMarkup = <Button size="slim" onClick={() => setSearchModalToggle(true)}> Add Product </Button>
  const giftListMarkup = <Box position="relative">
    {isLoading || isRefetching || isDeleting ?
      <SkeletonBodyText />
      : <ProductGiftList rows={list} />}
  </Box>

  return (
    <BlockStack gap={{ xs: "800", sm: "400" }}>
      <InlineGrid columns={{ xs: "2fr", md: "3fr 6fr" }} gap="500">
        <Box
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
        </Box>
        <Box
          paddingBlockStart="5"
          as="section"
          paddingInlineStart="5"
          paddingInlineEnd={{ xs: 400, sm: 0 }}
        >
          {
            isLoadingDiscount || isRefetchingDiscount ? loadingMarkup :
              <Card>
                <BlockStack gap="300">
                  <InlineStack align="space-between" blockAlign="center">
                    <Box>
                      <Text as="h2" variant="headingMd" fontWeight="bold" tone="subdued">
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
                    </Box>
                    <InlineStack gap="200" blockAlign="center">
                      {addProductMarkup}
                      <Button isLoading={isLoadingDiscount} variant="primary" onClick={() => setThresholdModalToggle(true)}>
                        Set Threshold
                      </Button>
                    </InlineStack>
                  </InlineStack>
                  {discount ? giftListMarkup : null}
                </BlockStack>
              </Card>
          }
        </Box>
      </InlineGrid>

      <SearchGiftProductModal
        isOpen={searchModalToggle}
        handleClose={setSearchModalToggle}
        discount={discount}
        refetch={refetch}
      />
      <ThresholdModal
        isOpen={thresholdModalToggle}
        handleClose={setThresholdModalToggle}
        discount={discount}
        refetch={refetchDiscount}
      />
    </BlockStack>
  );
}
