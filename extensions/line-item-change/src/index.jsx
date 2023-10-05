import React, { useState } from "react";
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
} from "@shopify/ui-extensions-react/checkout";
import { BlockLayout } from "@shopify/ui-extensions/checkout";

export default reactExtension("purchase.checkout.cart-line-item.render-after", () => <App />);

function App() {
  const applyCartLinesChange = useApplyCartLinesChange();
  const currentCartLine = useTarget();
  const [quantity_error, setQuantityError] = useState(null);

  const [loading, setLoading] = useState(false);

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
                    onPress={handleRemoveCartLine}>
                    Remove
                  </Button>
                </View>
              </InlineStack>

              {quantity_error && (
                <View padding="none">
                  <Text appearance="critical" size="small">
                   {quantity_error}
                  </Text>
                </View>
              )}
              <View spacing="base">
                <Divider />
              </View>
              <View>
                Hello
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
