import {
  render,
  InlineLayout,
  useSettings,
  TextBlock,
  View,
  BlockSpacer,
  Text,
  Image,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

function App() {
  const { trust_title, trust_description, trust_icon, image_width } = useSettings();

  const imageWidth = image_width === "small" ? "16%" : image_width === "medium" ? "20%" : image_width === "large" ? "32%" : image_width === "extraLarge" ? "48%" : "16%";

  return (
    <InlineLayout columns={[imageWidth, "fill"]}>
      <View border="none" padding="tight">
        <Image source={trust_icon ?? "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png"} />
      </View>

      <View border="none" padding="tight">
        <Text emphasis="bold">{trust_title ?? "Trusted by 1000s of customers"}</Text>
        <BlockSpacer spacing="extraTight" />
        <TextBlock size="small" appearance="subdued">
          {trust_description ?? "We are a trusted store"}
        </TextBlock>
      </View>
    </InlineLayout>
  );
}
