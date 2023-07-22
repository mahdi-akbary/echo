import { AlphaCard, Button, DataTable, Loading, SkeletonBodyText } from "@shopify/polaris";
export function ProductGiftList({
  //   rows = [],
  isSelectable = false,
  isLoading = false,
}) {
  const rows = [
    ["Emerald Silk Gown", "$875.00", 124689, 140, <Button>HI</Button>],
    ["Mauve Cashmere Scarf", "$230.00", 124533, 83, <Button>HI</Button>],
    [
      "Navy Merino Wool Blazer with khaki chinos and yellow belt",
      "$445.00",
      124518,
      32,
      <Button>HI</Button>,
    ],
  ];

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
          columnContentTypes={["text", "numeric", "numeric", "numeric", "text"]}
          headings={["Product", "Price", "SKU Number", "Net quantity", ""]}
          rows={rows}
        />
      )}
    </>
  );
}
