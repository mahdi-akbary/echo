import { Modal, TextField } from "@shopify/polaris";
import { useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

export function ThresholdModal({ isOpen, handleClose, discount, refetch }) {
  const fetch = useAuthenticatedFetch();
  const [threshold, setThreshold] = useState(discount?.amount ?? '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const url = discount?.id
      ? `/api/products/discounts/${discount?.id}`
      : `/api/products/discounts`;

    const response = await fetch(url, {
      method: discount?.id ? "PUT" : "POST",
      body: JSON.stringify({ amount: threshold, discountId: discount?.discount_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      refetch();
      setLoading(false);
      handleClose();
    } else {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose()}
      title="Set Threshold"
      primaryAction={{
        content: "Save",
        onAction: handleSubmit,
        loading: loading,
        disabled: threshold < 0 || threshold == ''
      }}
      secondaryActions={[
        {
          content: "Close",
          onAction: () => handleClose(),
        },
      ]}
    >
      <Modal.Section>
        <TextField
          label="Threshold amount"
          type="number"
          value={threshold}
          onChange={(value) => setThreshold(value)}
          autoComplete="off"
        />
      </Modal.Section>
    </Modal>
  );
}
