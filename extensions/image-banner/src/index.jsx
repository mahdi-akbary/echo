import {
  reactExtension,
  Image,
  useSettings,
  SkeletonImage,
} from "@shopify/ui-extensions-react/checkout";

export default reactExtension("purchase.checkout.block.render", () => <App />);

function App() {
  const {
    image_url,
    accessibility_description,
    lazyloading,
    fit,
    border,
    corner_radius,
  } = useSettings();

  return (
    <>
      {image_url ? (
        <Image
          source={image_url}
          accessibilityDescription={accessibility_description}
          loading={lazyloading ? "lazy" : "eager"}
          fit={fit ? "cover" : "contain"}
          border={border ? "base" : "none"}
          cornerRadius={corner_radius}
        />
      ) : (
        <SkeletonImage inlineSize={300} blockSize={300} />
      )}
    </>
  );
}
