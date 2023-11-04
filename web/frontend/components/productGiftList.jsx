import {
  Card,
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
    <Card>
      <Loading />
      <SkeletonBodyText />
    </Card>
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
