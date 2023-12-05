import { BlockStack, Icon, Modal, Select } from '@shopify/polaris';
import { DiscountsMajor, CaretDownMinor, GiftCardMajor } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { FreeGift } from './freeGift';

export function AddFunctionModal ({ open, handleClose }) {
    const [selected, setSelected] = useState('enabled');
    const [callAction, setActionCall] = useState(null);

    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );

    const options = [
        {
            label: 'Choose type',
            value: null,
            disabled: true,
            prefix: <Icon tone='subdued' source={GiftCardMajor} />,
        },
        {
            label: 'Free Gift',
            value: 'free-gift',
            prefix: <Icon tone='info' source={GiftCardMajor} />,
        },
        {
            label: 'Discount',
            value: 'discount',
            prefix: <Icon tone='info' source={DiscountsMajor} />,
        },
    ];
    return <Modal
        size="small"
        open={open}
        onClose={handleClose}
        title="Create function"
        primaryAction={{
            content: 'Set Threshold',
            onAction: () => setActionCall('setSearchModalToggle'),
        }}
        secondaryActions={[
            {
                content: 'Cancel',
                onAction: handleClose,
            },
            {
                content: 'Add Product',
                onAction: () => setActionCall('setThresholdModalToggle'),
            },

        ]}
    >
        <Modal.Section>
            <BlockStack gap="200">
                <Select
                    label="Type"
                    labelHidden
                    options={options}
                    onChange={handleSelectChange}
                    value={selected}
                />

                <FreeGift setAction={callAction} unsetAction={() => setActionCall(null)} />

            </BlockStack>
        </Modal.Section>
    </Modal>
}
