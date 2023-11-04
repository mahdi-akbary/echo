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
} from "@shopify/polaris";
import { ProductGiftList } from "./productGiftList";
import { SearchGiftProductModal } from "./searchGiftProductModal";
import { useEffect, useState } from "react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { ThresholdModal } from "./thresholdModal";
export function FreeGift () {
  const fetch = useAuthenticatedFetch();
  const [list, setList] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { isLoading: isLoadingDiscount, isRefetching: isRefetchingDiscount, refetch: refetchDiscount } = useAppQuery({
    url: "/api/products/discounts",
    reactQueryOptions: {
      onSuccess: (data) => {
        if(data?.amount)
          setDiscount(data);
      },
    },
  });

  const loadingMarkup = (
    <Card>
      <Loading />
      <SkeletonBodyText />
    </Card>
  )

  const {
    isRefetching: isRefetching,
    isLoading: isLoading,
    refetch: refetch,
  } = useAppQuery({
    url: "/api/products",
    reactQueryOptions: {
      onSuccess: (data) => {
        setList(
          data?.map((item) => [
            item?.display_name,
            item?.price,
            item?.inventory_quantity,
            <Button
              plain
              destructive
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

  const giftListMarkup = <Box position="relative">
    {isLoading || isRefetching || isDeleting ?
      <Box position="absolute" paddingBlockStart="12" insetBlockEnd="0" insetBlockStart="0" width="100%" minHeight="100%" zIndex="20" opacity="0.7" background="bg-app-hover">
        <InlineStack align="center" blockAlign="center">
          <Spinner size="small" />
        </InlineStack>
      </Box>
      : null}
    <Button
      size="slim"
      onClick={() => setSearchModalToggle(true)}
    >
      Add Product
    </Button>
    <ProductGiftList rows={list} />
  </Box>

  return (
    <BlockStack gap={{ xs: "8", sm: "4" }}>
      <InlineGrid columns={{ xs: "2fr", md: "3fr 6fr" }} gap="4">
        <Box
          paddingBlockStart="5"
          as="section"
          paddingInlineStart={{ xs: 4, sm: 0 }}
          paddingInlineEnd={{ xs: 4, sm: 0 }}
        >
          <BlockStack gap="3">
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
          paddingInlineEnd={{ xs: 4, sm: 0 }}
        >
          {
            isLoadingDiscount || isRefetchingDiscount ? loadingMarkup :
              <Card>
                <BlockStack gap="8">
                  <InlineStack align="space-between" blockAlign="center">
                    <Box>
                      <Text as="h2" variant="headingLg">
                        Threshold
                      </Text>
                      <Text
                        as="p"
                        variant="bodyMd"
                        color="success"
                        fontWeight="bold"
                      >
                        {discount?.amount ? discount?.amount : "Not set"}
                      </Text>
                    </Box>
                    <Button isLoading={isLoadingDiscount} primary onClick={() => setThresholdModalToggle(true)}>
                      Set Threshold
                    </Button>
                  </InlineStack>
                  {discount ? giftListMarkup : null}
                </BlockStack>
              </Card>
          }
        </Box>
      </InlineGrid>

      <Box padding="4"></Box>
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
