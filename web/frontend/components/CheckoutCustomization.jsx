import {
    Select,
    Text,
    FormLayout,
    Tabs,
    Banner,
} from '@shopify/polaris';
import { useState } from "react";
import { TabDivider } from './tabDivider';

export function CheckoutCustomization ({ activeProfile = {}, handleDataChange, selectedListOption }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedHeadingTab, setSelectedHeadingTab] = useState(0);


    // Form elements tabs
    const FromElementsTabs = [
        {
            id: 'general-1',
            content: 'General',
            accessibilityLabel: 'General',
            panelID: 'general-content-1',
        },
        {
            id: 'text-field-1',
            content: 'Text field',
            accessibilityLabel: 'Text field',
            panelID: 'text-field-content-1',
        },
        {
            id: 'select-1',
            content: 'Select',
            accessibilityLabel: 'Select',
            panelID: 'select-content-1',
        },
        {
            id: 'checkbox-1',
            content: 'Checkbox',
            accessibilityLabel: 'Checkbox',
            panelID: 'checkbox-content-1',
        },
        {
            id: 'primary-button-1',
            content: 'Primary button',
            accessibilityLabel: 'Primary button',
            panelID: 'primary-button-content-1',
        },
        {
            id: 'secondary-button-1',
            content: 'Secondary button',
            accessibilityLabel: 'Secondary button',
            panelID: 'secondary-button-content-1',
        }
    ];

    const handleTabChange = (selectedTabIndex) => {
        setSelectedTab(selectedTabIndex);
    }

    // Heading tabs

    const HeadingTabs = [
        {
            id: 'heading-1',
            content: 'Heading 1',
            accessibilityLabel: 'Heading 1',
            panelID: 'heading-1-content-1',
        },

        {
            id: 'heading-2',
            content: 'Heading 2',
            accessibilityLabel: 'Heading 2',
            panelID: 'heading-2-content-2',
        },
        {
            id: 'heading-3',
            content: 'Heading 3',
            accessibilityLabel: 'Heading 3',
            panelID: 'heading-3-content-3',
        },

    ];

    return (
        <>
            {selectedListOption === 'global-typography' ?
                <FormLayout>
                    <Select label="Letter case"
                        options={[
                            { label: 'None', value: 'NONE' },
                            { label: 'Lowercase', value: 'LOWER' },
                            { label: 'Titlecase', value: 'TITLE' },
                            { label: 'Uppercase', value: 'UPPER' }
                        ]}
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.customizations = {
                                ...temp?.customizations,
                                global: {
                                    ...temp?.customizations?.global,
                                    typography: {
                                        ...temp?.customizations?.global?.typography,
                                        letterCase: value,
                                    },
                                },
                            };
                            handleDataChange(temp)
                        }}
                        value={activeProfile?.customizations?.global?.typography?.letterCase || ''} />

                    <Select label="Letter spacing (kerning)"
                        options={[
                            { label: 'Base', value: 'BASE' },
                            { label: 'Loose', value: 'LOOSE' },
                            { label: 'Extra loose', value: 'EXTRA_LOOSE' }
                        ]}
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.customizations = {
                                ...temp?.customizations,
                                global: {
                                    ...temp?.customizations?.global,
                                    typography: {
                                        ...temp?.customizations?.global?.typography,
                                        kerning: value,
                                    },
                                },
                            };
                            handleDataChange(temp)
                        }}
                        value={activeProfile?.customizations?.global?.typography?.kerning || ''} />

                </FormLayout>
                : null}

            {selectedListOption == 'header' ?
                <FormLayout>
                    <Select
                        label="Alignment"
                        options={[
                            { label: "Default", value: '' },
                            { label: "Start", value: "START" },
                            { label: "Center", value: "CENTER" },
                            { label: "End", value: "END" },
                        ]}
                        selected={activeProfile?.customizations?.header?.alignment}
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.customizations = {
                                ...temp?.customizations,
                                header: {
                                    ...temp?.customizations?.header,
                                    alignment: value,
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.customizations?.header?.alignment || ''}
                    />

                    <Select
                        label="Position"
                        options={[
                            { label: "Full width", value: "START" },
                            {
                                label: "Order summary",
                                value: "INLINE_SECONDARY",
                            },
                            { label: "Checkout form", value: "INLINE" },
                        ]}
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.customizations = {
                                ...temp?.customizations,
                                header: {
                                    ...temp?.customizations?.header,
                                    position: value,
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.customizations?.header?.position || ''}
                    />


                </FormLayout> : null}
            {selectedListOption == 'main' ?
                <FormLayout>
                    <Select
                        label="Background color"
                        helpText="You can change the color scheme in design system tab"
                        options={[
                            { label: "Transparent", value: 'TRANSPARENT' },
                            { label: "Color scheme 1", value: "COLOR_SCHEME1" },
                            { label: "Color scheme 2", value: "COLOR_SCHEME2" },
                        ]}
                        selected={activeProfile?.customizations?.header?.alignment}
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.customizations = {
                                ...temp?.customizations,
                                main: {
                                    ...temp?.customizations?.main,
                                    colorScheme: value,
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.customizations?.main?.colorScheme || ''}
                    />

                </FormLayout> : null}
            {selectedListOption == 'order-summary' ?
                <FormLayout>
                    <Select
                        label="Background color"
                        helpText="You can change the color scheme in design system tab"
                        options={[
                            { label: "Transparent", value: 'TRANSPARENT' },
                            { label: "Color scheme 1", value: "COLOR_SCHEME1" },
                            { label: "Color scheme 2", value: "COLOR_SCHEME2" },
                        ]}
                        selected={activeProfile?.customizations?.orderSummary?.alignment}
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.customizations = {
                                ...temp?.customizations,
                                orderSummary: {
                                    ...temp?.customizations?.orderSummary,
                                    colorScheme: value,
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.customizations?.orderSummary?.colorScheme || ''}
                    />

                </FormLayout> : null}
            {selectedListOption == 'forms' ?
                <>
                    <Tabs tabs={FromElementsTabs} selected={selectedTab} onSelect={handleTabChange}></Tabs>
                    <TabDivider />
                    {FromElementsTabs[selectedTab].id === 'general-1' ? (
                        <FormLayout>
                            <Select
                                label="Border"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Full", value: "FULL" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        control: {
                                            ...temp?.customizations?.control,
                                            border: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }
                                }
                                value={activeProfile?.customizations?.control?.border || ''} />


                            <Select
                                label="Border radius"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Large", value: "LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        control: {
                                            ...temp?.customizations?.control,
                                            cornerRadius: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }
                                }
                                value={activeProfile?.customizations?.control?.cornerRadius || ''} />

                            <Select
                                label="Background color"
                                options={[
                                    { label: "Default", value: "default" },
                                    { label: "Transparent", value: "TRANSPARENT" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        control: {
                                            ...temp?.customizations?.control,
                                            color: (value === 'TRANSPARENT') ? 'TRANSPARENT' : 'Defaults',
                                        },
                                    };
                                    handleDataChange(temp);
                                }
                                }
                                value={activeProfile?.customizations?.control?.color || ''} />

                            <Select
                                label="Label position"
                                options={[
                                    { label: "Inside", value: "INSIDE" },
                                    { label: "Outside", value: "OUTSIDE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        control: {
                                            ...temp?.customizations?.control,
                                            labelPosition: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }
                                }
                                value={activeProfile?.customizations?.control?.labelPosition || ''} />

                        </FormLayout>
                    ) : null}

                    {FromElementsTabs[selectedTab].id === 'text-field-1' ? (
                        <FormLayout>
                            <Select
                                label="Input border"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Block End", value: "BLOCK_END" },
                                    { label: "Full", value: "FULL" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        checkbox: {
                                            ...temp?.customizations?.checkbox,
                                            cornerRadius: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.checkbox?.cornerRadius || ''} />

                            <Text variant="headingSm" as="h3">Typography</Text>
                            <Select
                                label="Font"
                                options={[
                                    { label: "Primary", value: "PRIMARY" },
                                    { label: "Secondary", value: "SECONDARY" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        textField: {
                                            ...temp?.customizations?.textField,
                                            typography: {
                                                ...temp?.customizations?.textField?.typography,
                                                font: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.textField?.typography?.font || ''} />

                            <Select
                                label="Letter spacing (kerning)"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        textField: {
                                            ...temp?.customizations?.textField,
                                            typography: {
                                                ...temp?.customizations?.textField?.typography,
                                                kerning: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.textField?.typography?.kerning || ''} />

                            <Select
                                label="Font size"
                                options={[
                                    { label: "Extra small", value: "EXTRA_SMALL" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Medium", value: "MEDIUM" },
                                    { label: "Large", value: "LARGE" },
                                    { label: "Extra large", value: "EXTRA_LARGE" },
                                    { label: "2X Large", value: "EXTRA_EXTRA_LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        textField: {
                                            ...temp?.customizations?.textField,
                                            typography: {
                                                ...temp?.customizations?.textField?.typography,
                                                size: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.textField?.typography?.size || ''} />

                            <Select
                                label="Letter case"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Lowercase", value: "LOWER" },
                                    { label: "Titlecase", value: "TITLE" },
                                    { label: "Uppercase", value: "UPPER" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        textField: {
                                            ...temp?.customizations?.textField,
                                            typography: {
                                                ...temp?.customizations?.textField?.typography,
                                                letterCase: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.textField?.typography?.letterCase || ''} />

                            <Select
                                label="Font weight"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Bold", value: "BOLD" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        textField: {
                                            ...temp?.customizations?.textField,
                                            typography: {
                                                ...temp?.customizations?.textField?.typography,
                                                weight: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.textField?.typography?.weight || ''} />

                        </FormLayout>
                    ) : null}

                    {FromElementsTabs[selectedTab].id === 'select-1' ? (
                        <FormLayout>
                            <Select
                                label="Select border"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Block End", value: "BLOCK_END" },
                                    { label: "Full", value: "FULL" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        select: {
                                            ...temp?.customizations?.select,
                                            border: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.select?.border || ''} />

                            <Text variant="headingSm" as="h3">Typography</Text>
                            <Select
                                label="Font"
                                options={[
                                    { label: "Primary", value: "PRIMARY" },
                                    { label: "Secondary", value: "SECONDARY" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        select: {
                                            ...temp?.customizations?.select,
                                            typography: {
                                                ...temp?.customizations?.select?.typography,
                                                font: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.select?.typography?.font || ''} />

                            <Select
                                label="Letter spacing (kerning)"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        select: {
                                            ...temp?.customizations?.select,
                                            typography: {
                                                ...temp?.customizations?.select?.typography,
                                                kerning: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.select?.typography?.kerning || ''} />

                            <Select
                                label="Font size"
                                options={[
                                    { label: "Extra small", value: "EXTRA_SMALL" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Medium", value: "MEDIUM" },
                                    { label: "Large", value: "LARGE" },
                                    { label: "Extra large", value: "EXTRA_LARGE" },
                                    { label: "2X Large", value: "EXTRA_EXTRA_LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        select: {
                                            ...temp?.customizations?.select,
                                            typography: {
                                                ...temp?.customizations?.select?.typography,
                                                size: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.select?.typography?.size || ''} />

                            <Select
                                label="Letter case"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Lowercase", value: "LOWER" },
                                    { label: "Titlecase", value: "TITLE" },
                                    { label: "Uppercase", value: "UPPER" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        select: {
                                            ...temp?.customizations?.select,
                                            typography: {
                                                ...temp?.customizations?.select?.typography,
                                                letterCase: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.select?.typography?.letterCase || ''} />

                            <Select
                                label="Font weight"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Bold", value: "BOLD" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        select: {
                                            ...temp?.customizations?.select,
                                            typography: {
                                                ...temp?.customizations?.select?.typography,
                                                weight: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.select?.typography?.weight || ''} />
                        </FormLayout>

                    ) : null}

                    {FromElementsTabs[selectedTab].id === 'checkbox-1' ? (
                        <FormLayout>
                            <Select
                                label="Border radius"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Large", value: "LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        checkbox: {
                                            ...temp?.customizations?.checkbox,
                                            cornerRadius: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.checkbox?.cornerRadius || ''} />


                        </FormLayout>
                    ) : null}

                    {FromElementsTabs[selectedTab].id === 'primary-button-1' ? (
                        <FormLayout>
                            <Select
                                label="Background"
                                options={[
                                    { label: "Solid", value: "SOLID" },
                                    { label: "None", value: "NONE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            background: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.primaryButton?.background || ''} />
                            <Select
                                label="Border"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Full", value: "FULL" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            border: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.primaryButton?.border || ''} />
                            <Select
                                label="Border radius"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Large", value: "LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            cornerRadius: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.primaryButton?.cornerRadius || ''} />

                            <Select
                                label="Block padding"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Extra tight", value: "EXTRA_TIGHT" },
                                    { label: "Tight", value: "TIGHT" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            blockPadding: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.primaryButton?.blockPadding || ''} />

                            {/* inlinePadding */}
                            <Select
                                label="Inline padding"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Extra tight", value: "EXTRA_TIGHT" },
                                    { label: "Tight", value: "TIGHT" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            inlinePadding: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.primaryButton?.inlinePadding || ''} />

                            <Text variant="headingSm" as="h3">Typography</Text>
                            <Select label="Font"
                                options={[
                                    { label: "Primary", value: "PRIMARY" },
                                    { label: "Secondary", value: "SECONDARY" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            typography: {
                                                ...temp?.customizations?.primaryButton?.typography,
                                                font: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.primaryButton?.typography?.font || ''} />

                            <Select label="Letter spacing (kerning)"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            typography: {
                                                ...temp?.customizations?.primaryButton?.typography,
                                                kerning: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.primaryButton?.typography?.kerning || ''} />
                            <Select label="Font size"
                                options={[
                                    { label: "Extra small", value: "EXTRA_SMALL" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Medium", value: "MEDIUM" },
                                    { label: "Large", value: "LARGE" },
                                    { label: "Extra large", value: "EXTRA_LARGE" },
                                    { label: "2X Large", value: "EXTRA_EXTRA_LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            typography: {
                                                ...temp?.customizations?.primaryButton?.typography,
                                                size: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.primaryButton?.typography?.size || ''} />
                            <Select label="Letter case"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Lowercase", value: "LOWER" },
                                    { label: "Titlecase", value: "TITLE" },
                                    { label: "Uppercase", value: "UPPER" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            typography: {
                                                ...temp?.customizations?.primaryButton?.typography,
                                                letterCase: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.primaryButton?.typography?.letterCase || ''} />
                            <Select label="Font weight"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Bold", value: "BOLD" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        primaryButton: {
                                            ...temp?.customizations?.primaryButton,
                                            typography: {
                                                ...temp?.customizations?.primaryButton?.typography,
                                                weight: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.primaryButton?.typography?.weight || ''} />
                        </FormLayout>
                    ) : null}


                    {FromElementsTabs[selectedTab].id === 'secondary-button-1' ? (
                        <FormLayout>
                            <Select
                                label="Background"
                                options={[
                                    { label: "Solid", value: "SOLID" },
                                    { label: "None", value: "NONE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            background: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.secondaryButton?.background || ''} />
                            <Select
                                label="Border"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Full", value: "FULL" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            border: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.secondaryButton?.border || ''} />
                            <Select
                                label="Border radius"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Large", value: "LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            cornerRadius: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.secondaryButton?.cornerRadius || ''} />

                            <Select
                                label="Block padding"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Extra tight", value: "EXTRA_TIGHT" },
                                    { label: "Tight", value: "TIGHT" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            blockPadding: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.secondaryButton?.blockPadding || ''} />

                            {/* inlinePadding */}
                            <Select
                                label="Inline padding"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Extra tight", value: "EXTRA_TIGHT" },
                                    { label: "Tight", value: "TIGHT" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            inlinePadding: value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.secondaryButton?.inlinePadding || ''} />

                            <Text variant="headingSm" as="h3">Typography</Text>
                            <Select label="Font"
                                options={[
                                    { label: "Primary", value: "PRIMARY" },
                                    { label: "Secondary", value: "SECONDARY" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            typography: {
                                                ...temp?.customizations?.secondaryButton?.typography,
                                                font: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.secondaryButton?.typography?.font || ''} />

                            <Select label="Letter spacing (kerning)"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            typography: {
                                                ...temp?.customizations?.secondaryButton?.typography,
                                                kerning: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.secondaryButton?.typography?.kerning || ''} />
                            <Select label="Font size"
                                options={[
                                    { label: "Extra small", value: "EXTRA_SMALL" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Medium", value: "MEDIUM" },
                                    { label: "Large", value: "LARGE" },
                                    { label: "Extra large", value: "EXTRA_LARGE" },
                                    { label: "2X Large", value: "EXTRA_EXTRA_LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            typography: {
                                                ...temp?.customizations?.secondaryButton?.typography,
                                                size: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.secondaryButton?.typography?.size || ''} />
                            <Select label="Letter case"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Lowercase", value: "LOWER" },
                                    { label: "Titlecase", value: "TITLE" },
                                    { label: "Uppercase", value: "UPPER" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            typography: {
                                                ...temp?.customizations?.secondaryButton?.typography,
                                                letterCase: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.secondaryButton?.typography?.letterCase || ''} />
                            <Select label="Font weight"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Bold", value: "BOLD" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        secondaryButton: {
                                            ...temp?.customizations?.secondaryButton,
                                            typography: {
                                                ...temp?.customizations?.secondaryButton?.typography,
                                                weight: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.secondaryButton?.typography?.weight || ''} />


                        </FormLayout>
                    ) : null}
                </> : null}
            {selectedListOption == 'headings' ?
                <>
                    <Tabs tabs={HeadingTabs} selected={selectedHeadingTab} onSelect={(value) => setSelectedHeadingTab(value)} />
                    <TabDivider />
                    {HeadingTabs[selectedHeadingTab].id === 'heading-1' ? (
                        <FormLayout>
                            <Select label="Font"
                                options={[
                                    { label: "Primary", value: "PRIMARY" },
                                    { label: "Secondary", value: "SECONDARY" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel1: {
                                            ...temp?.customizations?.headingLevel1,
                                            typography: {
                                                ...temp?.customizations?.headingLevel1?.typography,
                                                font: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel1?.typography?.font || ''} />

                            <Select label="Letter spacing (kerning)"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel1: {
                                            ...temp?.customizations?.headingLevel1,
                                            typography: {
                                                ...temp?.customizations?.headingLevel1?.typography,
                                                kerning: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel1?.typography?.kerning || ''} />

                            <Select label="Font size"
                                options={[
                                    { label: "Extra small", value: "EXTRA_SMALL" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Medium", value: "MEDIUM" },
                                    { label: "Large", value: "LARGE" },
                                    { label: "Extra large", value: "EXTRA_LARGE" },
                                    { label: "2X Large", value: "EXTRA_EXTRA_LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel1: {
                                            ...temp?.customizations?.headingLevel1,
                                            typography: {
                                                ...temp?.customizations?.headingLevel1?.typography,
                                                size: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.headingLevel1?.typography?.size || ''} />

                            <Select label="Letter case"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Lowercase", value: "LOWER" },
                                    { label: "Titlecase", value: "TITLE" },
                                    { label: "Uppercase", value: "UPPER" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel1: {
                                            ...temp?.customizations?.headingLevel1,
                                            typography: {
                                                ...temp?.customizations?.headingLevel1?.typography,
                                                letterCase: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel1?.typography?.letterCase || ''} />

                            <Select label="Font weight"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Bold", value: "BOLD" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel1: {
                                            ...temp?.customizations?.headingLevel1,
                                            typography: {
                                                ...temp?.customizations?.headingLevel1?.typography,
                                                weight: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel1?.typography?.weight || ''} />

                        </FormLayout>
                    ) : null}

                    {HeadingTabs[selectedHeadingTab].id === 'heading-2' ? (
                        <FormLayout>
                            {/* Auto complete the rest like heading 1 above */}
                            <Select label="Font"
                                options={[
                                    { label: "Primary", value: "PRIMARY" },
                                    { label: "Secondary", value: "SECONDARY" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel2: {
                                            ...temp?.customizations?.headingLevel2,
                                            typography: {
                                                ...temp?.customizations?.headingLevel2?.typography,
                                                font: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel2?.typography?.font || ''} />
                            <Select label="Letter spacing (kerning)"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel2: {
                                            ...temp?.customizations?.headingLevel2,
                                            typography: {
                                                ...temp?.customizations?.headingLevel2?.typography,
                                                kerning: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel2?.typography?.kerning || ''} />

                            <Select label="Font size"
                                options={[
                                    { label: "Extra small", value: "EXTRA_SMALL" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Medium", value: "MEDIUM" },
                                    { label: "Large", value: "LARGE" },
                                    { label: "Extra large", value: "EXTRA_LARGE" },
                                    { label: "2X Large", value: "EXTRA_EXTRA_LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel2: {
                                            ...temp?.customizations?.headingLevel2,
                                            typography: {
                                                ...temp?.customizations?.headingLevel2?.typography,
                                                size: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel2?.typography?.size || ''} />
                            <Select label="Letter case"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Lowercase", value: "LOWER" },
                                    { label: "Titlecase", value: "TITLE" },
                                    { label: "Uppercase", value: "UPPER" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel2: {
                                            ...temp?.customizations?.headingLevel2,
                                            typography: {
                                                ...temp?.customizations?.headingLevel2?.typography,
                                                letterCase: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel2?.typography?.letterCase || ''} />
                            <Select label="Font weight"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Bold", value: "BOLD" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel2: {
                                            ...temp?.customizations?.headingLevel2,
                                            typography: {
                                                ...temp?.customizations?.headingLevel2?.typography,
                                                weight: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel2?.typography?.weight || ''} />

                        </FormLayout>
                    ) : null}

                    {HeadingTabs[selectedHeadingTab].id === 'heading-3' ? (
                        <FormLayout>
                            {/* Auto complete the rest like heading 1 above */}
                            <Select label="Font"
                                options={[
                                    { label: "Primary", value: "PRIMARY" },
                                    { label: "Secondary", value: "SECONDARY" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel3: {
                                            ...temp?.customizations?.headingLevel3,
                                            typography: {
                                                ...temp?.customizations?.headingLevel3?.typography,
                                                font: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel3?.typography?.font || ''} />
                            <Select label="Letter spacing (kerning)"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Loose", value: "LOOSE" },
                                    { label: "Extra loose", value: "EXTRA_LOOSE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel3: {
                                            ...temp?.customizations?.headingLevel3,
                                            typography: {
                                                ...temp?.customizations?.headingLevel3?.typography,
                                                kerning: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel3?.typography?.kerning || ''} />

                            <Select label="Font size"
                                options={[
                                    { label: "Extra small", value: "EXTRA_SMALL" },
                                    { label: "Small", value: "SMALL" },
                                    { label: "Base", value: "BASE" },
                                    { label: "Medium", value: "MEDIUM" },
                                    { label: "Large", value: "LARGE" },
                                    { label: "Extra large", value: "EXTRA_LARGE" },
                                    { label: "2X Large", value: "EXTRA_EXTRA_LARGE" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel3: {
                                            ...temp?.customizations?.headingLevel3,
                                            typography: {
                                                ...temp?.customizations?.headingLevel3?.typography,
                                                size: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel3?.typography?.size || ''} />
                            <Select label="Letter case"
                                options={[
                                    { label: "None", value: "NONE" },
                                    { label: "Lowercase", value: "LOWER" },
                                    { label: "Titlecase", value: "TITLE" },
                                    { label: "Uppercase", value: "UPPER" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel3: {
                                            ...temp?.customizations?.headingLevel3,
                                            typography: {
                                                ...temp?.customizations?.headingLevel3?.typography,
                                                letterCase: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel3?.typography?.letterCase || ''} />
                            <Select label="Font weight"
                                options={[
                                    { label: "Base", value: "BASE" },
                                    { label: "Bold", value: "BOLD" },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        headingLevel3: {
                                            ...temp?.customizations?.headingLevel3,
                                            typography: {
                                                ...temp?.customizations?.headingLevel3?.typography,
                                                weight: value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp);

                                }}
                                value={activeProfile?.customizations?.headingLevel3?.typography?.weight || ''} />

                        </FormLayout>
                    ) : null}
                </> : null}
            {selectedListOption == 'comming-soon...' ?

                <Banner title="Under development">
                    <p>
                        This feature is under development, we will release it soon. You can still customize your checkout using the other settings.
                    </p>
                </Banner>
                : null}

        </>

    );
}
