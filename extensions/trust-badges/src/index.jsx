import {
  render,
  useSettings,
  Grid,
  BlockLayout,
  Heading,
  BlockSpacer,
} from "@shopify/checkout-ui-extensions-react";

import { TrustCard } from "./trustCard.jsx";
import { TrustList } from "./trustList.jsx";

render("Checkout::Dynamic::Render", () => <App />);

function App() {
  let {
    title,
    trust_title1,
    trust_description1,
    trust_icon1,
    trust_title2,
    trust_description2,
    trust_icon2,
    trust_title3,
    trust_description3,
    trust_icon3,
    layout,
    image_width,
    grids,
  } = useSettings();

  const imageWidth =
    image_width === "small"
      ? "16%"
      : image_width === "medium"
      ? "20%"
      : image_width === "large"
      ? "32%"
      : image_width === "extraLarge"
      ? "48%"
      : "16%";

  const recommendationLayout = layout == "Grids" ? "grids" : "rows";
  const gridLayout =
    grids == "1 column"
      ? ["fill"]
      : grids == "2 columns"
      ? ["fill", "fill"]
      : grids == "3 columns"
      ? ["fill", "fill", "fill"]
      : grids == "4 columns"
      ? ["fill", "fill", "fill", "fill"]
      : ["fill", "fill", "fill"];

  // Set default values for trust badges 1
  if (!trust_title1) {
    trust_title1 = "Trusted by 1000s of customers";
  }
  if (!trust_description1) {
    trust_description1 =
      "Happy customers, end to end tracking and reliable customer service";
  }
  if (!trust_icon1) {
    trust_icon1 =
      "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png";
  }

  // Set default values for trust badges 1
  // if (!trust_title2) {
  //   trust_title2 = "Free shipping on all orders";
  // }
  // if (!trust_description2) {
  //   trust_description2 = "Free shipping on all orders over $50";
  // }
  // if (!trust_icon2) {
  //   trust_icon2 = "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png";
  // }

  return (
    <>
      <Heading>{title}</Heading>
      <BlockSpacer />
      {recommendationLayout === "rows" ? (
        <BlockLayout spacing={"base"}>
          {trust_title1 && (
            <TrustCard
              title={trust_title1}
              description={trust_description1}
              icon={trust_icon1}
              imageWidth={imageWidth}
            />
          )}
          {trust_title2 && (
            <TrustCard
              title={trust_title2}
              description={trust_description2}
              icon={trust_icon2}
              imageWidth={imageWidth}
            />
          )}
          {trust_title3 && (
            <TrustCard
              title={trust_title3}
              description={trust_description3}
              icon={trust_icon3}
              imageWidth={imageWidth}
            />
          )}
        </BlockLayout>
      ) : (
        <Grid spacing="tight" columns={gridLayout}>
          {trust_title1 && (
            <TrustList
              title={trust_title1}
              description={trust_description1}
              icon={trust_icon1}
              imageWidth={imageWidth}
            />
          )}
          {trust_title2 && (
            <TrustList
              title={trust_title2}
              description={trust_description2}
              icon={trust_icon2}
              imageWidth={imageWidth}
            />
          )}
          {trust_title3 && (
            <TrustList
              title={trust_title3}
              description={trust_description3}
              icon={trust_icon3}
              imageWidth={imageWidth}
            />
          )}
        </Grid>
      )}
    </>
  );
}
