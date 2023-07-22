import {
  AlphaCard,
  Button,
  DataTable,
  Loading,
  SkeletonBodyText,
} from "@shopify/polaris";
export function ProductGiftList({
  rows = [],
  isSelectable = false,
  isLoading = false,
}) {
  
  const loadingMarkup = (
    <AlphaCard>
      <Loading />
      <SkeletonBodyText />
    </AlphaCard>
  );

  return (
    <>
      {isLoading ? (
        loadingMarkup
      ) : (
        <DataTable
          columnContentTypes={["text", "numeric", "numeric", "text"]}
          headings={["Product", "Price", "Quantity", ""]}
          rows={rows}
        />
      )}
    </>
  );
}
