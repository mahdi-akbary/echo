import { Button, Modal, TextField } from "@shopify/polaris";
import { ProductGiftList } from "./productGiftList";
import { useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

export function SearchGiftProductModal({ isOpen, handleClose, discount }) {
  const fetch = useAuthenticatedFetch();
  const [searchFieldValue, setSearchFieldValue] = useState();
  const [list, setList] = useState([]);

  const handleSearch = async (query) => {
    if (query.length < 3) return;
    const response = await fetch("/api/products/search", {
      method: "POST",
      body: JSON.stringify({ query }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      setList(
        data.map((item) => [
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
      // setIsLoading(false);
    }
  };

  const handleProductSelect = async (product) => {
    console.log(product);
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
    } else {
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

  return (
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
          />
        </div>

        <ProductGiftList rows={list} />
      </Modal.Section>
    </Modal>
  );
}
