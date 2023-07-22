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
import { useState } from "react";
export function FreeGift() {
  const [searchModalToggle, setSearchModalToggle] = useState(false);

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
            <VerticalStack gap="5">
              <HorizontalStack align="space-between">
                <HorizontalStack align="start" gap="2">
                  <Button onClick={() => setSearchModalToggle(true)}>
                    Add Product
                  </Button>
                  <Button>Edit Threshold</Button>
                </HorizontalStack>
                <Box>
                  <Text as="h2" variant="headingXl">
                    Threshold
                  </Text>
                  <Text as="p" variant="bodyLg" color="success">
                    0.00
                  </Text>
                </Box>
              </HorizontalStack>
              <ProductGiftList />
            </VerticalStack>
          </AlphaCard>
        </Box>
      </HorizontalGrid>

      <Box padding="4"></Box>
      <SearchGiftProductModal
        isOpen={searchModalToggle}
        handleClose={setSearchModalToggle}
      />
    </VerticalStack>
  );
}
