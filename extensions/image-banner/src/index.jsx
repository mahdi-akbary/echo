import { 
  render, 
  Image,
  useSettings,
  SkeletonImage,
  } from "@shopify/checkout-ui-extensions-react";
render("Checkout::Dynamic::Render", () => <App />);
function App() {
  const { image_url } = useSettings();
  return (
    <>
      {image_url ? (
        <Image source={image_url} />
      ) : (
        <SkeletonImage inlineSize={300} blockSize={300}  />
      )}
    </>
  );
}
