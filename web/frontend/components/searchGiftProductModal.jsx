import { Modal, TextField } from "@shopify/polaris";
import { ProductGiftList } from "./productGiftList";
import { useState } from "react";

export function SearchGiftProductModal({isOpen, handleClose}) {
  const [textFieldValue, setTextFieldValue] = useState(null);

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
        <TextField
          label=""
          type="text"
          value={textFieldValue}
          onChange={(value) => setTextFieldValue(value)}
          prefix="Search"
          autoComplete="off"
        />

        <ProductGiftList />
      </Modal.Section>
    </Modal>
  );
}
