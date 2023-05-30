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

import { TrustCard } from "./trustCard.jsx";
import { TrustList } from "./trustList.jsx";

render("Checkout::Dynamic::Render", () => <App />);

function App() {
  let { 
    trust1_title, 
    trust1_description, 
    trust1_icon, 
    trust2_title, 
    trust2_description, 
    trust2_icon, 
    trust3_title, 
    trust3_description, 
    trust3_icon, 
    layout, 
    image_width,
    grids 
  } = useSettings();
  
  const imageWidth = image_width === "small" ? "16%" : image_width === "medium" ? "20%" : image_width === "large" ? "32%" : image_width === "extraLarge" ? "48%" : "16%";

  const recommendationLayout = layout == 'Grids' ? 'grids' : 'rows';
  const gridLayout = grids == '1 column' ? ['fill'] : grids == '2 columns' ? ['fill', 'fill'] : grids == '3' ? ['fill', 'fill', 'fill'] : ['fill', 'fill', 'fill'];

  // Set default values for trust badges 1 
  if (!trust1_title) {
    trust1_title = "Trusted by 1000s of customers";
  }
  if (!trust1_description) {
    trust1_description = "Happy customers, end to end tracking and reliable customer service"; 
  }
  if (!trust1_icon) {
    trust1_icon = "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png";
  }

  return (
    <>
      { recommendationLayout === 'rows' ? (
        <>
          { trust1_title  && (
            <TrustCard
              title={trust1_title}
              description={trust1_description}
              icon={trust1_icon}
              imageWidth={imageWidth}
            />
          )}
          { trust2_title  && (
            <TrustCard
              title={trust2_title} 
              description={trust2_description}
              icon={trust2_icon}
              imageWidth={imageWidth}
            />
          )}
          { trust3_title  && (
            <TrustCard
              title={trust3_title}
              description={trust3_description}
              icon={trust3_icon}
              imageWidth={imageWidth}
            />
          )}
        </>

      ) : (
        <>
          { trust1_title  && (
            <TrustList
              title={trust1_title}
              description={trust1_description}
              icon={trust1_icon}
              imageWidth={imageWidth}
            />
          )}
          { trust2_title  && (
            <TrustList
              title={trust2_title}
              description={trust2_description}
              icon={trust2_icon}
              imageWidth={imageWidth}
            />
          )}
          { trust3_title  && (
            <TrustList
              title={trust3_title}
              description={trust3_description}
              icon={trust3_icon}
              imageWidth={imageWidth}
            />
          )}

        </>
      )}
    </>
  );
}
