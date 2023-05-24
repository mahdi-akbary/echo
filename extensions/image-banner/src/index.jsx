import {
  render,
  Image,
  useSettings,
  SkeletonImage,
} from "@shopify/checkout-ui-extensions-react";
render("Checkout::Dynamic::Render", () => <App />);
function App() {
  const {
    image_url,
    accessibility_description,
    lazyloading,
    fit,
    border,
    corner_radius,
    aspect_ratio,
  } = useSettings();

  const aspectRatio = aspect_ratio == "square" ? '1/1': aspect_ratio == "portrait" ? '3/4' : aspect_ratio == "landscape" ? '4/3' : '2/1';

  return (
    <>
      {image_url ? (
        <Image
          source={image_url}
          accessibilityDescription="accessibility_description"
          loading={lazyloading ? "lazy" : "eager"}
          fit={ fit ? 'cover' : "contain"}
          border={ border ? "base" : "none"}
          cornerRadius={corner_radius}
        />
      ) : (
        <SkeletonImage inlineSize={300} blockSize={300} aspectRatio={aspectRatio} />
      )}
    </>
  );
}
