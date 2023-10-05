import React, { useEffect, useState } from "react";
import {
  reactExtension,
  Button,
  Link,
  View,
  Popover,
  Stepper,
  InlineStack,
  useApplyCartLinesChange,
  useTarget,
  Text,
  Spinner,
  BlockSpacer,
  BlockStack,
  Divider,
  Select,
  useApi,
} from "@shopify/ui-extensions-react/checkout";
import { BlockLayout } from "@shopify/ui-extensions/checkout";

export default reactExtension(
  "purchase.checkout.cart-line-item.render-after",
  () => <App />
);

function App() {
  const { query } = useApi();
  const applyCartLinesChange = useApplyCartLinesChange();
  const currentCartLine = useTarget();
  const [quantityError, setQuantityError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [variantError, setVariantError] = useState(null);
  
  const [variants, setVariants] = useState(currentCartLine.variants);

  const changeCartLine = async (data) => {
    setLoading(true);
    const result = await applyCartLinesChange(data);
    if (result.type == "error") {
      setQuantityError(result.message);
      setLoading(false);
    }
    if (result.type == "success") {
      setQuantityError(null);
      setLoading(false);
    }
  };

  const handleChange = async (value) => {
    await changeCartLine({
      type: "updateCartLine",
      id: currentCartLine.id,
      quantity: value,
    });
  };

  const handleRemoveCartLine = async () => {
    await changeCartLine({
      type: "removeCartLine",
      id: currentCartLine.id,
      quantity: currentCartLine.quantity,
    });
  };

  const handleVariantChange = async (value) => {
    await changeCartLine({
      type: "updateCartLine",
      id: currentCartLine.id,
      merchandiseId: value,
      quantity: currentCartLine.quantity,
    });
  }

  // Use the query to get the product variants based on the product id using the Shopify graphql
  useEffect(() => {
    async function getVariants() {
      const result = await query(
        `query getVariants($id: ID!) {
          product(id: $id) {
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }`,
        { 
          variables: { id: currentCartLine.merchandise?.product?.id }, 
        }
      );
      setVariants(result.data.product.variants.edges);
    }
    getVariants();
  }, [query]);

  
  return (
    <InlineStack spacing="base" blockAlignment="center">
      <Text size="small">Quantity: {currentCartLine.quantity}</Text>
      <Link
        overlay={
          <Popover position="blockEnd">
            <BlockStack padding="base" spacing="base">
              <InlineStack>
                <View maxInlineSize={200}>
                  <Stepper
                    min={1}
                    disabled={loading}
                    label="Quantity"
                    value={currentCartLine.quantity}
                    onChange={handleChange}
                  />
                </View>
                <View maxInlineSize={200}>
                  <Button
                    disabled={loading}
                    appearance="critical"
                    kind="secondary"
                    onPress={handleRemoveCartLine}
                  >
                    Remove
                  </Button>
                </View>
              </InlineStack>

              {quantityError && (
                <View padding="none">
                  <Text appearance="critical" size="small">
                    {quantityError}
                  </Text>
                </View>
              )}
              <View spacing="base">
                <Divider />
              </View>
              <View>
                {/* Display variant selector here */}
                { true && variants?.length > 1 && (
                  <Select
                    label="Variant"
                    value={ currentCartLine.merchandise.id }
                    disabled={loading}
                    onChange={handleVariantChange}
                    options={variants?.map((variant) => {
                      return {
                        label: variant.node.title,
                        value: variant.node.id,
                      };
                    })} />
                )}

              </View>
            </BlockStack>
          </Popover>
        }
      >
        <Text size="small">Change</Text>
      </Link>
      {loading ? <Spinner size="small" appearance="accent" /> : null}
    </InlineStack>
  );
}
