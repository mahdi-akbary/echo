import { Box, Button, Modal, TextField, Toast } from "@shopify/polaris";
import { ProductGiftList } from "./productGiftList";
import { useRef, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

export function SearchGiftProductModal ({ isOpen, handleClose, discount, refetch }) {
  const fetch = useAuthenticatedFetch();
  const [searchFieldValue, setSearchFieldValue] = useState();
  const [list, setList] = useState([]);
  const [data, setData] = useState([]);
  let ref = useRef(null);

  const [loading, setLoading] = useState(false);
  const [selectLoading, setSelectLoading] = useState(null);

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
      const responseData = await response.json();
      setData(responseData);
      handleSetList(responseData)
    } else {
      setLoading(false);
    }
  };

  const handleSetList = (data) => {
    setList(
      data.filter(item => item?.node?.product?.status == 'ACTIVE')
        .map((item, i) => [
          item?.node?.displayName,
          item?.node?.price,
          item?.node?.inventoryQuantity,
          <Button
            variant="plain"
            loading={i == ref.current}
            onClick={async () => {
              ref.current = i; 
              await handleProductSelect(item?.node, i)
            }}
          >
            select
          </Button>,
        ])
    );
  }

  const [toastContent, setToastContent] = useState({ content: null });

  const toastMarkup = toastContent.content && (
    <Toast {...toastContent} onDismiss={() => setToastContent({ content: null })} />
  );

  const handleProductSelect = async (product, index) => {
    console.log(index)
    setSelectLoading(index)
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
      setList([])
      setSearchFieldValue('')
      setSelectLoading(null)
      ref.current = null
      setToastContent({ content: 'Saved!' })
      refetch()
      handleClose(false)
    } else {
      const data = await response.json();
      setToastContent({ content: data.message })
      setSelectLoading(null)
    }
  };

  const handleKeyPress = async (event) => {
    const enterKeyPressed = event.keyCode === 13;
    if (enterKeyPressed) {
      event.preventDefault();
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
            connectedRight={<Button loading={loading} onClick={async () => await handleSearch(searchFieldValue)}>Search</Button>}
          />
        </div>
        <Box position="relative">
          <ProductGiftList rows={list} />
        </Box>
      </Modal.Section>
    </Modal>
  </>
  );
}
