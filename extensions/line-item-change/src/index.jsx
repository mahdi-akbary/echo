import React, { useState } from "react";
import {
  render,
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
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::CartLineDetails::RenderAfter", () => <App />);

function App() {
  const applyCartLinesChange = useApplyCartLinesChange();
  const currentCartLine = useTarget();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const changeCartLine = async (data) => {
    setLoading(true);
    const result = await applyCartLinesChange(data);
    if (result.type == "error") {
      setError(result.message);
      setLoading(false);
    }
    if (result.type == "success") {
      setError(null);
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
            <InlineStack spacing="none">
              <View maxInlineSize={200} padding="base">
                <Stepper
                  min={1}
                  disabled={loading}
                  label="Quantity"
                  value={currentCartLine.quantity}
                  onChange={handleChange}
                />
              </View>
              <View maxInlineSize={200} padding="base">
                <Button
                  disabled={loading}
                  appearance="critical"
                  kind="secondary"
                  onPress={handleRemoveCartLine}
                >
                  Remove
                </Button>
              </View>
              {error && (
                <View>
                  <BlockSpacer spacing="extraTight" />
                  <Text appearance="critical" size="small" padding="extraTight">
                    {error}
                  </Text>
                </View>
              )}
            </InlineStack>
          </Popover>
        }
      >
        <Text size="small">Change</Text>
      </Link>
      {loading ? <Spinner size="small" appearance="accent" /> : null}
    </InlineStack>
  );
}
