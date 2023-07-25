import {
  AlphaCard,
  Box,
  Button,
  HorizontalGrid,
  HorizontalStack,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import { ProductGiftList } from "./productGiftList";
import { SearchGiftProductModal } from "./searchGiftProductModal";
import { useEffect, useState } from "react";
import { useAppQuery } from "../hooks";
import { ThresholdModal } from "./thresholdModal";
export function FreeGift() {
  const [list, setList] = useState([]);
  const [discount, setDiscount] = useState(null);

  const {
    isRefetching: isRefetching,
    isLoading: isLoading,
    refetch: fetch,
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
              onClick={async () => await handleProductSelect(item?.node)}
            >
              Delete
            </Button>,
          ])
        );
      },
    },
  });
  const { refetch: refetchDiscount } = useAppQuery({
    url: "/api/products/discounts",
    reactQueryOptions: {
      onSuccess: (data) => {
        console.log(data, "<<");
        setDiscount(data);
      },
    },
  });

  const [searchModalToggle, setSearchModalToggle] = useState(false);

  const [thresholdModalToggle, setThresholdModalToggle] = useState(false);

  return (
    <VerticalStack gap={{ xs: "8", sm: "4" }}>
      <HorizontalGrid columns={{ xs: "2fr", md: "3fr 6fr" }} gap="4">
        <Box
          paddingBlockStart="5"
          as="section"
          paddingInlineStart={{ xs: 4, sm: 0 }}
          paddingInlineEnd={{ xs: 4, sm: 0 }}
        >
          <VerticalStack gap="3">
            <Text as="h3" variant="headingMd">
              Checkout Free Gifts
            </Text>
            <Text as="p" variant="bodyMd">
              Giving free gifts to customers if their purchase price reaches a
              certain threshold is so cool, here you'r able to select the free
              gifts and set thresholds accordingly.
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
            <VerticalStack gap="6">
              <HorizontalStack align="space-between" blockAlign="center">
                <Box>
                  <Text as="h2" variant="headingLg">
                    Threshold
                  </Text>
                  <Text as="p" variant="bodyMd" color="success" fontWeight="bold">
                    {discount?.amount ? discount?.amount : "Not set"}
                  </Text>
                </Box>
                <Button primary onClick={() => setThresholdModalToggle(true)}>
                  Set Threshold
                </Button>
              </HorizontalStack>
              {discount ? (
                <VerticalStack>
                  <Button
                    size="slim"
                    onClick={() => setSearchModalToggle(true)}
                  >
                    Add Product
                  </Button>
                  <ProductGiftList rows={list} />
                </VerticalStack>
              ) : null}
            </VerticalStack>
          </AlphaCard>
        </Box>
      </HorizontalGrid>

      <Box padding="4"></Box>
      <SearchGiftProductModal
        isOpen={searchModalToggle}
        handleClose={setSearchModalToggle}
      />
      <ThresholdModal
        isOpen={thresholdModalToggle}
        handleClose={setThresholdModalToggle}
        discount={discount}
        refetch={refetchDiscount}
      />
    </VerticalStack>
  );
}
