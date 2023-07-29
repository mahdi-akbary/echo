import { Box, Button, HorizontalStack, Modal, Spinner, TextField, Toast } from "@shopify/polaris";
import { ProductGiftList } from "./productGiftList";
import { useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

export function SearchGiftProductModal ({ isOpen, handleClose, discount, refetch }) {
  const fetch = useAuthenticatedFetch();
  const [searchFieldValue, setSearchFieldValue] = useState();
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(false);

  const handleSearch = async (query) => {
    if (query.length < 3) return;
    setLoading(true)
    const response = await fetch("/api/products/search", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setLoading(false)
      const data = await response.json();
      setList(
        data.filter(item => item?.node?.product?.status == 'ACTIVE')
        .map((item) => [
          item?.node?.displayName,
          item?.node?.price,
          item?.node?.inventoryQuantity,
          <Button
            plain
            onClick={async () => await handleProductSelect(item?.node)}
          >
            select
          </Button>,
        ])
      );
    } else {
      setLoading(false);
    }
  };

  const [toastContent, setToastContent] = useState({ content: null });

  const toastMarkup = toastContent.content && (
    <Toast {...toastContent} onDismiss={() => setToastContent({ content: null })} />
  );

  const handleProductSelect = async (product) => {
    setSelectLoading(true)
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({
        ...product,
        discountId: discount?.discount_id,
        discountAmount: discount?.amount,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setSelectLoading(false)
      setToastContent({ content: 'Saved!' })
      refetch()
      handleClose(false)
    } else {
      const data = await response.json();
      console.log(data)
      setToastContent({ content: data.message })
      setSelectLoading(false)
    }
  };

  const handleKeyPress = async (event) => {
    const enterKeyPressed = event.keyCode === 13;
    if (enterKeyPressed) {
      event.preventDefault();
      console.log(searchFieldValue);
      await handleSearch(searchFieldValue);
    }
  };

  return (<>
    {toastMarkup}
    <Modal
      open={isOpen}
      onClose={() => handleClose(false)}
      title="Select gift product"
      secondaryActions={[
        {
          content: "Close",
          onAction: () => handleClose(false),
        },
      ]}
    >
      <Modal.Section>
        <div onKeyDown={handleKeyPress}>
          <TextField
            label=""
            type="text"
            value={searchFieldValue}
            onChange={(value) => setSearchFieldValue(value)}
            prefix="Search"
            autoComplete="off"
            connectedRight={<Button loading={loading} onClick={async () => await handleSearch(searchFieldValue)}>Submit</Button>}
          />
        </div>
        <Box position="relative">
          {selectLoading ?
            <Box position="absolute" paddingBlockStart="12" insetBlockEnd="0" insetBlockStart="0" width="100%" minHeight="100%" zIndex="20" opacity="0.7" background="bg-app-hover">
              <HorizontalStack align="center" blockAlign="center">
                <Spinner size="small" />
              </HorizontalStack>
            </Box>
            : null}
          <ProductGiftList rows={list} />
        </Box>
      </Modal.Section>
    </Modal>
  </>
  );
}
