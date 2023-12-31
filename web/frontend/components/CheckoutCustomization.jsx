import {
    Select,
    Text,
    FormLayout,
    Tabs,
    BlockStack,
    TextField,
    Button,
    Image,
    Box,
    InlineStack,
} from '@shopify/polaris';
import { useState } from "react";
import { TabDivider } from './tabDivider';
import { FileUpload } from './fileUpload';
import { useAuthenticatedFetch } from '../hooks';
import Template1 from "../assets/template-1.png"
import Template2 from "../assets/template-2.png"
import Template3 from "../assets/template-3.png"
import { ColorPickerInput } from './colorPickerInput';

export function CheckoutCustomization ({ activeProfile = {}, handleDataChange, selectedListOption, setToastActive, refetchProfile }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedGlobalTab, setSelectedGlobalTab] = useState(0);
    const [selectedHeadingTab, setSelectedHeadingTab] = useState(0);
    const [templatePrimaryColor, setTemplatePrimaryColor] = useState(null);
    const fetch = useAuthenticatedFetch();
    const globalSectionTabs = [
        {
            id: 'typography',
            content: 'Typography',
            accessibilityLabel: 'Typography',
            panelID: 'typography-content-1',
        },
        {
            id: 'corner-radius',
            content: 'Corner radius',
            accessibilityLabel: 'Corner radius',
            panelID: 'corner-radius-content-1',
        }
    ]

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

    const [loadingTemplate, setLoadingTemplate] = useState(false)

    const applyTemplate = async (template) => {
        setLoadingTemplate(true)
        const response = await fetch("/api/branding/set-template", {
            method: "POST",
            body: JSON.stringify({ id: activeProfile?.id, template: template, primaryColor: templatePrimaryColor }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            setLoadingTemplate(false)
            const res = await response.json();
            refetchProfile()
            setToastActive(true)
        }
    }

    return (
        <>
            {selectedListOption === 'global' ?
                <FormLayout>
                    <BlockStack gap="100">
                        <Text as="h4" variant="bodyLg">
                            Global
                        </Text>
                        <Text variant='bodySm' tone='subdued'>
                            The input fields used to update the global customizations.
                        </Text>
                    </BlockStack>
                    <Tabs tabs={globalSectionTabs} selected={selectedGlobalTab} onSelect={(index => setSelectedGlobalTab(index))}></Tabs>
                    <TabDivider />
                    <BlockStack gap="200">
                        {globalSectionTabs[selectedGlobalTab].id === 'typography' ? (<>
                            <Select label="Letter case"
                                helpText="Customize the letter case."
                                options={[
                                    { label: 'Not set', value: null },
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
                                                letterCase: value === 'Not set' ? null : value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp)
                                }}
                                value={activeProfile?.customizations?.global?.typography?.letterCase || ''} />

                            <Select label="Letter spacing (kerning)"
                                helpText="Set the space between letters."
                                options={[
                                    { label: 'Not set', value: null },
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
                                                kerning: value === 'Not set' ? null : value,
                                            },
                                        },
                                    };
                                    handleDataChange(temp)
                                }}
                                value={activeProfile?.customizations?.global?.typography?.kerning || ''} />
                        </>) : null}
                        {globalSectionTabs[selectedGlobalTab].id === 'corner-radius' ? (
                            <Select label="Cornor radius"
                                helpText="The global corner radius ."
                                options={[
                                    { label: 'Not set', value: null },
                                    { label: 'None', value: 'NONE' },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.customizations = {
                                        ...temp?.customizations,
                                        global: {
                                            ...temp?.customizations?.global,
                                            cornerRadius: value === 'Not set' ? null : value,
                                        },
                                    };
                                    handleDataChange(temp)
                                }}
                                value={activeProfile?.customizations?.global?.cornerRadius || ''} />
                        ) : null}
                    </BlockStack>
                </FormLayout>
                : null}

            {selectedListOption == 'favicon' ?
                <FormLayout>
                    <BlockStack gap="100">
                        <Text as="h4" variant="bodyLg">
                            Favicon
                        </Text>
                        <Text variant='bodySm' tone='subdued'>
                            The input field used to update a checkout branding favicon.
                        </Text>
                    </BlockStack>
                    <TabDivider />
                    <FileUpload onFileIdGenerated={(id) => {
                        const temp = activeProfile;
                        temp.customizations = {
                            ...temp?.customizations,
                            favicon: {
                                mediaImageId: id,
                            },
                        }
                        handleDataChange(temp)
                    }} url={activeProfile?.customizations?.favicon?.image?.url} />

                </FormLayout> : null}

            {selectedListOption == 'header' ?
                <FormLayout>
                    <BlockStack gap="100">
                        <Text as="h4" variant="bodyLg">
                            Header
                        </Text>
                        <Text variant='bodySm' tone='subdued'>
                            This property group applies to the header layout containing your brand's name and logo
                        </Text>
                    </BlockStack>
                    <TabDivider />
                    <BlockStack gap="200">
                        <Select
                            label="Alignment"
                            helpText="The header alignment."
                            options={[
                                { label: "Not set", value: null },
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
                                        alignment: value === 'Not set' ? null : value,
                                    },
                                };
                                handleDataChange(temp);
                            }}
                            value={activeProfile?.customizations?.header?.alignment || ''}
                        />

                        <Select
                            label="Position"
                            helpText="The header position."
                            options={[
                                { label: "Not set", value: null },
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
                                        position: value === 'Not set' ? null : value,
                                    },
                                };
                                handleDataChange(temp);
                            }}
                            value={activeProfile?.customizations?.header?.position || ''}
                        />

                        <BlockStack gap="150">
                            <Text variant='bodyMd'>Banner</Text>
                            <Text variant='bodySm' tone='subdued'>The banner will appear in the header only if the position is in full width.</Text>
                            <FileUpload onFileIdGenerated={(id) => {
                                const temp = activeProfile;
                                temp.customizations = {
                                    ...temp?.customizations,
                                    header: {
                                        ...temp?.customizations?.header,
                                        banner: {
                                            mediaImageId: id
                                        },
                                    },
                                }
                                handleDataChange(temp)
                            }} url={activeProfile?.customizations?.header?.banner?.image?.url} />
                        </BlockStack>

                        <BlockStack gap="050">
                            <Text variant='bodyMd'>Logo</Text>
                            <Text variant='bodySm' tone='subdued'>To set the logo.</Text>
                            <FileUpload onFileIdGenerated={(id) => {
                                const temp = activeProfile;
                                temp.customizations = {
                                    ...temp?.customizations,
                                    header: {
                                        ...temp?.customizations?.header,
                                        logo: {
                                            ...temp?.customizations?.header.logo,
                                            image: {
                                                mediaImageId: id
                                            }
                                        },
                                    },
                                }
                                handleDataChange(temp)
                            }} url={activeProfile?.customizations?.header?.logo?.image?.url} />
                        </BlockStack>
                        <TextField
                            label="Logo max width"
                            helpText="The maximum width of the logo."
                            type="number"
                            onChange={(value) => {
                                const temp = activeProfile;
                                temp.customizations = {
                                    ...temp?.customizations,
                                    header: {
                                        ...temp?.customizations?.header,
                                        logo: {
                                            ...temp?.customizations?.header.logo,
                                            maxWidth: value
                                        },
                                    },
                                }
                                handleDataChange(temp);
                            }}
                            value={activeProfile?.customizations?.header?.logo?.maxWidth}
                            autoComplete="off"
                        />

                    </BlockStack>
                </FormLayout> : null}
            {selectedListOption == 'main' ?
                <FormLayout>
                    <BlockStack gap="100">
                        <Text as="h4" variant="bodyLg">
                            Main
                        </Text>
                        <Text variant='bodySm' tone='subdued'>
                            The input fields used to update the main area customizations.
                        </Text>
                    </BlockStack>
                    <TabDivider />
                    <Select
                        label="Background color"
                        helpText="The selected color scheme for the main area of the checkout."
                        options={[
                            { label: 'Not set', value: null },
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
                                    colorScheme: value === 'Not set' ? null : value,
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.customizations?.main?.colorScheme || ''}
                    />

                    <BlockStack gap="150">
                        <Text variant='bodyMd'>Background image</Text>
                        <Text variant='bodySm' tone='subdued'>The background image of the main area (must not be of SVG format).</Text>
                        <FileUpload onFileIdGenerated={(id) => {
                            const temp = activeProfile;
                            temp.customizations = {
                                ...temp?.customizations,
                                main: {
                                    ...temp?.customizations?.main,
                                    backgroundImage: {
                                        mediaImageId: id
                                    },
                                },
                            }
                            handleDataChange(temp)
                        }} url={activeProfile?.customizations?.main?.backgroundImage?.image?.url} />
                    </BlockStack>

                </FormLayout> : null}
            {selectedListOption == 'order-summary' ?
                <FormLayout>
                    <BlockStack gap="100">
                        <Text as="h4" variant="bodyLg">
                            Order Summary
                        </Text>
                        <Text variant='bodySm' tone='subdued'>
                            The input fields used to update the order summary customizations.
                        </Text>
                    </BlockStack>
                    <TabDivider />
                    <Select
                        label="Background color"
                        helpText="The selected color scheme for the order summary area of the checkout."
                        options={[
                            { label: 'Not set', value: null },
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
                                    colorScheme: value === 'Not set' ? null : value,
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.customizations?.orderSummary?.colorScheme || ''}
                    />

                    <BlockStack gap="150">
                        <Text variant='bodyMd'>Background image</Text>
                        <Text variant='bodySm' tone='subdued'>The background image of the order summary (must not be of SVG format).</Text>
                        <FileUpload onFileIdGenerated={(id) => {
                            const temp = activeProfile;
                            temp.customizations = {
                                ...temp?.customizations,
                                orderSummary: {
                                    ...temp?.customizations?.orderSummary,
                                    backgroundImage: {
                                        mediaImageId: id
                                    },
                                },
                            }
                            handleDataChange(temp)
                        }} url={activeProfile?.customizations?.orderSummary?.backgroundImage?.image?.url} />
                    </BlockStack>

                </FormLayout> : null}
            {selectedListOption == 'forms' ?
                <>
                    <BlockStack gap="100">
                        <Text as="h4" variant="bodyLg">
                            Form Controls
                        </Text>
                        <Text variant='bodySm' tone='subdued'>
                            The input fields used to update the form controls and buttons customizations.
                        </Text>
                    </BlockStack>
                    <Tabs tabs={FromElementsTabs} selected={selectedTab} onSelect={handleTabChange}></Tabs>
                    <TabDivider />
                    {FromElementsTabs[selectedTab].id === 'general-1' ? (
                        <FormLayout>
                            <BlockStack gap="200">
                                <Select
                                    label="Border"
                                    helpText="The border used for form controls."
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "None", value: "NONE" },
                                        { label: "Full", value: "FULL" },
                                    ]}
                                    onChange={(value) => {
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            control: {
                                                ...temp?.customizations?.control,
                                                border: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }
                                    }
                                    value={activeProfile?.customizations?.control?.border || ''} />


                                <Select
                                    label="Corner radius"
                                    helpText="The corner radius used for form controls."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                cornerRadius: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }
                                    }
                                    value={activeProfile?.customizations?.control?.cornerRadius || ''} />

                                <Select
                                    label="Background color"
                                    helpText="Set to TRANSPARENT to define transparent form controls. If null, form controls inherit colors from their scheme settings."
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "Transparent", value: "TRANSPARENT" },
                                    ]}
                                    onChange={(value) => {
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            control: {
                                                ...temp?.customizations?.control,
                                                color: (value === 'TRANSPARENT') ? 'TRANSPARENT' : null,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }
                                    }
                                    value={activeProfile?.customizations?.control?.color || ''} />

                                <Select
                                    label="Label position"
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "Inside", value: "INSIDE" },
                                        { label: "Outside", value: "OUTSIDE" },
                                    ]}
                                    onChange={(value) => {
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            control: {
                                                ...temp?.customizations?.control,
                                                labelPosition: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }
                                    }
                                    value={activeProfile?.customizations?.control?.labelPosition || ''} />
                            </BlockStack>
                        </FormLayout>
                    ) : null}

                    {FromElementsTabs[selectedTab].id === 'text-field-1' ? (
                        <FormLayout>
                            <BlockStack gap="200">
                                <Select
                                    label="Border"
                                    helpText="The border used for text fields."
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "None", value: "NONE" },
                                        { label: "Block End", value: "BLOCK_END" },
                                        { label: "Full", value: "FULL" },
                                    ]}
                                    onChange={(value) => {
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            textField: {
                                                ...temp?.customizations?.textField,
                                                border: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.textField?.border || ''} />

                                <Select
                                    label="Font"
                                    helpText="The font customizations used for text fields."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    font: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.textField?.typography?.font || ''} />

                                <Select
                                    label="Letter spacing (kerning)"
                                    helpText="The kerning customizations used for text fields."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    kerning: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.textField?.typography?.kerning || ''} />

                                <Select
                                    label="Font size"
                                    helpText="The font size customizations used for text fields."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    size: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.textField?.typography?.size || ''} />

                                <Select
                                    label="Letter case"
                                    helpText="The letter case customizations used for text fields."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    letterCase: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.textField?.typography?.letterCase || ''} />

                                <Select
                                    label="Font weight"
                                    helpText="The font weight customizations used for text fields."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    weight: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.textField?.typography?.weight || ''} />
                            </BlockStack>
                        </FormLayout>
                    ) : null}

                    {FromElementsTabs[selectedTab].id === 'select-1' ? (
                        <FormLayout>
                            <BlockStack gap="200">
                                <Select
                                    label="Border"
                                    helpText="The border used for selects."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                border: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.select?.border || ''} />

                                <Select
                                    label="Font"
                                    helpText="The font customizations used for selects."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    font: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.select?.typography?.font || ''} />

                                <Select
                                    label="Letter spacing (kerning)"
                                    helpText="The kerning customizations used for selects."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    kerning: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.select?.typography?.kerning || ''} />

                                <Select
                                    label="Font size"
                                    helpText="The font size customizations used for selects."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    size: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.select?.typography?.size || ''} />

                                <Select
                                    label="Letter case"
                                    helpText="The letter case customizations used for selects."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    letterCase: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.select?.typography?.letterCase || ''} />

                                <Select
                                    label="Font weight"
                                    helpText="The font weight customizations used for selects."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    weight: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.select?.typography?.weight || ''} />
                            </BlockStack>
                        </FormLayout>

                    ) : null}

                    {FromElementsTabs[selectedTab].id === 'checkbox-1' ? (
                        <FormLayout>
                            <Select
                                label="Corner radius"
                                helpText="The corner radius used for checkboxes."
                                options={[
                                    { label: 'Not set', value: null },
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
                                            cornerRadius: value === 'Not set' ? null : value,
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.customizations?.checkbox?.cornerRadius || ''} />


                        </FormLayout>
                    ) : null}

                    {FromElementsTabs[selectedTab].id === 'primary-button-1' ? (
                        <FormLayout>
                            <BlockStack gap="200">
                                <Select
                                    label="Background"
                                    helpText="The background style used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "Solid", value: "SOLID" },
                                        { label: "None", value: "NONE" },
                                    ]}
                                    onChange={(value) => {
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            primaryButton: {
                                                ...temp?.customizations?.primaryButton,
                                                background: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.background || ''} />
                                <Select
                                    label="Border"
                                    helpText="The border used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "None", value: "NONE" },
                                        { label: "Full", value: "FULL" },
                                    ]}
                                    onChange={(value) => {
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            primaryButton: {
                                                ...temp?.customizations?.primaryButton,
                                                border: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.border || ''} />
                                <Select
                                    label="Corner radius"
                                    helpText="The corner radius used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                cornerRadius: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.cornerRadius || ''} />

                                <Select
                                    label="Block padding"
                                    helpText="The block padding used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                blockPadding: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.blockPadding || ''} />

                                <Select
                                    label="Inline padding"
                                    helpText="The inline padding used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                inlinePadding: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.inlinePadding || ''} />

                                <Select label="Font"
                                    helpText="The font used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    font: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.typography?.font || ''} />

                                <Select label="Letter spacing (kerning)"
                                    helpText="The kerning used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    kerning: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.typography?.kerning || ''} />
                                <Select label="Font size"
                                    helpText="The font size used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    size: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.typography?.size || ''} />
                                <Select label="Letter case"
                                    helpText="The letter case used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    letterCase: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.typography?.letterCase || ''} />
                                <Select label="Font weight"
                                    helpText="The font weight used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    weight: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.primaryButton?.typography?.weight || ''} />
                            </BlockStack>
                        </FormLayout>
                    ) : null}


                    {FromElementsTabs[selectedTab].id === 'secondary-button-1' ? (
                        <FormLayout>
                            <BlockStack gap="200">
                                <Select
                                    label="Background"
                                    helpText="The background style used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "Solid", value: "SOLID" },
                                        { label: "None", value: "NONE" },
                                    ]}
                                    onChange={(value) => {
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            secondaryButton: {
                                                ...temp?.customizations?.secondaryButton,
                                                background: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.background || ''} />
                                <Select
                                    label="Border"
                                    helpText="The border used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "None", value: "NONE" },
                                        { label: "Full", value: "FULL" },
                                    ]}
                                    onChange={(value) => {
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            secondaryButton: {
                                                ...temp?.customizations?.secondaryButton,
                                                border: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.border || ''} />
                                <Select
                                    label="Corner radius"
                                    helpText="The corner radius used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                cornerRadius: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.cornerRadius || ''} />

                                <Select
                                    label="Block padding"
                                    helpText="The block padding used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                blockPadding: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.blockPadding || ''} />

                                <Select
                                    label="Inline padding"
                                    helpText="The inline padding used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                inlinePadding: value === 'Not set' ? null : value,
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.inlinePadding || ''} />

                                <Select label="Font"
                                    helpText="The font used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    font: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.typography?.font || ''} />

                                <Select label="Letter spacing (kerning)"
                                    helpText="The kerning used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    kerning: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.typography?.kerning || ''} />
                                <Select label="Font size"
                                    helpText="The font size used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    size: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.typography?.size || ''} />
                                <Select label="Letter case"
                                    helpText="The letter case used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    letterCase: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.typography?.letterCase || ''} />
                                <Select label="Font weight"
                                    helpText="The font weight used for buttons."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    weight: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.secondaryButton?.typography?.weight || ''} />

                            </BlockStack>
                        </FormLayout>
                    ) : null}
                </> : null}
            {selectedListOption == 'headings' ?
                <>
                    <BlockStack gap="100">
                        <Text as="h4" variant="bodyLg">
                            Headings
                        </Text>
                        <Text variant='bodySm' tone='subdued'>
                            The input fields for heading level customizations.
                        </Text>
                    </BlockStack>
                    <Tabs tabs={HeadingTabs} selected={selectedHeadingTab} onSelect={(value) => setSelectedHeadingTab(value)} />
                    <TabDivider />
                    {HeadingTabs[selectedHeadingTab].id === 'heading-1' ? (
                        <FormLayout>
                            <BlockStack gap="200">
                                <Select label="Font"
                                    helpText="The font customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    font: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel1?.typography?.font || ''} />

                                <Select label="Letter spacing (kerning)"
                                    helpText="The kerning customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    kerning: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel1?.typography?.kerning || ''} />

                                <Select label="Font size"
                                    helpText="The font size customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    size: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);
                                    }}
                                    value={activeProfile?.customizations?.headingLevel1?.typography?.size || ''} />

                                <Select label="Letter case"
                                    helpText="The letter case customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    letterCase: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel1?.typography?.letterCase || ''} />

                                <Select label="Font weight"
                                    helpText="The font weight customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    weight: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel1?.typography?.weight || ''} />
                            </BlockStack>
                        </FormLayout>
                    ) : null}

                    {HeadingTabs[selectedHeadingTab].id === 'heading-2' ? (
                        <FormLayout>
                            <BlockStack gap="200">
                                <Select label="Font"
                                    helpText="The font customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
                                        { label: "Primary", value: "PRIMARY" },
                                        { label: "Secondary", value: "SECONDARY" },
                                    ]}
                                    onChange={(value) => {
                                        console.log(value)
                                        const temp = activeProfile;
                                        temp.customizations = {
                                            ...temp?.customizations,
                                            headingLevel2: {
                                                ...temp?.customizations?.headingLevel2,
                                                typography: {
                                                    ...temp?.customizations?.headingLevel2?.typography,
                                                    font: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel2?.typography?.font || ''} />
                                <Select label="Letter spacing (kerning)"
                                    helpText="The kerning customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    kerning: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel2?.typography?.kerning || ''} />

                                <Select label="Font size"
                                    helpText="The font size customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    size: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel2?.typography?.size || ''} />
                                <Select label="Letter case"
                                    helpText="The letter case customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    letterCase: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel2?.typography?.letterCase || ''} />
                                <Select label="Font weight"
                                    helpText="The font weight customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    weight: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel2?.typography?.weight || ''} />
                            </BlockStack>
                        </FormLayout>
                    ) : null}

                    {HeadingTabs[selectedHeadingTab].id === 'heading-3' ? (
                        <FormLayout>
                            <BlockStack gap="200">
                                <Select label="Font"
                                    helpText="The font customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    font: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel3?.typography?.font || ''} />
                                <Select label="Letter spacing (kerning)"
                                    helpText="The kerning customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    kerning: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel3?.typography?.kerning || ''} />

                                <Select label="Font size"
                                    helpText="The font size customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    size: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel3?.typography?.size || ''} />
                                <Select label="Letter case"
                                    helpText="The letter case customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    letterCase: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel3?.typography?.letterCase || ''} />
                                <Select label="Font weight"
                                    helpText="The font weight customizations used for headings."
                                    options={[
                                        { label: 'Not set', value: null },
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
                                                    weight: value === 'Not set' ? null : value,
                                                },
                                            },
                                        };
                                        handleDataChange(temp);

                                    }}
                                    value={activeProfile?.customizations?.headingLevel3?.typography?.weight || ''} />
                            </BlockStack>
                        </FormLayout>
                    ) : null}
                </> : null}
            {selectedListOption == 'template-1' ?
                <BlockStack gap="200" inlineAlign='end'>
                    <Box width='100%'>
                        <InlineStack align='space-between' >
                            <ColorPickerInput
                                label="Primary color"
                                helpText="The primary color of the brand"
                                onChange={(value) => setTemplatePrimaryColor(value)}
                                inputColor={
                                    templatePrimaryColor ?
                                        templatePrimaryColor :
                                        activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.background
                                }
                            />
                            <Button variant='primary' onClick={async () => await applyTemplate('template-1')} loading={loadingTemplate}>Apply</Button>

                        </InlineStack>
                    </Box>
                    <Image source={Template1} alt='template' width="100%" />
                </BlockStack>
                : null}

            {selectedListOption == 'template-2' ?
                <BlockStack gap="200" inlineAlign='end'>
                    <Box width='100%'>
                        <InlineStack align='space-between' >
                            <ColorPickerInput
                                label="Primary color"
                                helpText="The primary color of the brand"
                                onChange={(value) => setTemplatePrimaryColor(value)}
                                inputColor={
                                    templatePrimaryColor ?
                                        templatePrimaryColor :
                                        activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.background
                                }
                            />
                            <Button variant='primary' onClick={async () => await applyTemplate('template-2')} loading={loadingTemplate}>Apply</Button>

                        </InlineStack>
                    </Box>
                    <Image source={Template2} alt='template' width="100%" />
                </BlockStack>
                : null}

                {selectedListOption == 'template-3' ?
                <BlockStack gap="200" inlineAlign='end'>
                    <Box width='100%'>
                        <InlineStack align='space-between' >
                            <ColorPickerInput
                                label="Primary color"
                                helpText="The primary color of the brand"
                                onChange={(value) => setTemplatePrimaryColor(value)}
                                inputColor={
                                    templatePrimaryColor ?
                                        templatePrimaryColor :
                                        activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.background
                                }
                            />
                            <Button variant='primary' onClick={async () => await applyTemplate('template-3')} loading={loadingTemplate}>Apply</Button>

                        </InlineStack>
                    </Box>
                    <Image source={Template3} alt='template' width="100%" />
                </BlockStack>
                : null}

        </>

    );
}
