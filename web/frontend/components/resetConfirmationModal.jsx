import { BlockStack, Modal, Text, TextField } from "@shopify/polaris";
import { useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

export function ResetConfirmationModal ({ isOpen, handleClose, profileId, refetch }) {
  const fetch = useAuthenticatedFetch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/branding/reset', {
      method: "POST",
      body: JSON.stringify({ id: profileId }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      refetch();
      setLoading(false);
      handleClose(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => handleClose(false)}
      title="Reset Checkout"
      primaryAction={{
        content: "Reset to default",
        destructive: true,
        onAction: handleSubmit,
        loading: loading,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => handleClose(false),
        },
      ]}
    >
      <Modal.Section>
        <BlockStack gap="200">
          <Text tone="critical">Warning!</Text>
          <Text> Any changes made to the checkout design will be removed and reverted to the Shopify defaults.
            If that's fine please proceed.
          </Text>
        </BlockStack>
      </Modal.Section>
    </Modal>
  );
}
