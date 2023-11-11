import {
    Text,
    TextField,
    Select,
    FormLayout,
    BlockStack,
    Tabs,
    Banner,
    Box,
} from '@shopify/polaris';
import { ColorPickerInput, TabDivider } from "../components";
import { FONTS } from "../components/fonts";
import { useEffect, useState } from 'react';

export function DesignSystem ({ activeProfile = {}, handleDataChange, selectedListOption, customFonts = [] }) {
    const SchemeOneTabs = [
        {
            id: 'colors',
            content: 'Base',
            accessibilityLabel: 'Base',
            panelID: 'colors-content-1',
        },
        {
            id: 'form-control',
            content: 'Form Control',
            accessibilityLabel: 'Form Control',
            panelID: 'form-control-content-2',
        },
        {
            id: 'primary-button',
            content: 'Primary Button',
            accessibilityLabel: 'Primary Button',
            panelID: 'primary-button-content-3',
        },
        {
            id: 'secondary-button',
            content: 'Secondary Button',
            accessibilityLabel: 'Secondary Button',
            panelID: 'secondary-button-content-3',
        },

    ];
    const SchemeTwoTabs = [
        {
            id: 'colors',
            content: 'Base',
            accessibilityLabel: 'Base',
            panelID: 'colors-content-1',
        },
        {
            id: 'form-control',
            content: 'Form Control',
            accessibilityLabel: 'Form Control',
            panelID: 'form-control-content-2',
        },
        {
            id: 'primary-button',
            content: 'Primary Button',
            accessibilityLabel: 'Primary Button',
            panelID: 'primary-button-content-3',
        },
        {
            id: 'secondary-button',
            content: 'Secondary Button',
            accessibilityLabel: 'Secondary Button',
            panelID: 'secondary-button-content-3',
        },

    ];
    const typographyTabs = [
        {
            id: 'primary',
            content: 'Primary',
            accessibilityLabel: 'Primary',
            panelID: 'primary-content-1',
        },
        {
            id: 'secondary',
            content: 'Secondary',
            accessibilityLabel: 'Secondary',
            panelID: 'secondary-content-3',
        },
        {
            id: 'font',
            content: 'Font',
            accessibilityLabel: 'Font',
            panelID: 'font-content-3',
        },

    ];
    const normalizedFonts = customFonts.map(font => ({ label: font.url?.split("/")?.pop(".")?.split(".")[0], value: font.id }))
    const customFontMarkup = <Box paddingBlockStart="300">
        <Banner title="Custom Font">
            <p>
                For your custom font to be listed, Please head to the <strong> Content -{'>'} Files </strong>section of your store and upload your file that has to be in <strong>.woff</strong> format.
            </p>
        </Banner>
    </Box>

    const [primaryCustomFontSelected, setPrimaryCustomFontSelected] = useState(null);
    const [secondaryCustomFontSelected, setSecondaryCustomFontSelected] = useState(null);
    const getCustomFont = (sourceString) => {
        if (sourceString?.includes('files')) {
            const selectedFont = sourceString.split("/")?.pop(".")?.split(".")[0]
            const font = customFonts.find(font => font.url?.includes(selectedFont))
            return font.id
        }
        return null
    }

    useEffect(() => {
        setPrimaryCustomFontSelected(getCustomFont(activeProfile?.designSystem?.typography?.primary?.base?.sources))
        setSecondaryCustomFontSelected(getCustomFont(activeProfile?.designSystem?.typography?.secondary?.base?.sources))
    }, [activeProfile])

    const [selectedSchemeOneTab, setSelectedSchemeOneTab] = useState(0);
    const [selectedSchemeTwoTab, setSelectedSchemeTwoTab] = useState(0);
    const [selectedTypographyTab, setSelectedTypographyTab] = useState(0);
    return (< >
        {selectedListOption === 'global-colors' ? (
            <FormLayout>
                <BlockStack gap="100">
                    <Text as="h4" variant="bodyLg">
                        Global colors
                    </Text>
                    <Text variant='bodySm' tone='subdued'>
                        A group of global colors for customizing the overall look and feel of the user interface.
                    </Text>
                </BlockStack>
                <TabDivider />
                <BlockStack gap="500">

                    <ColorPickerInput
                        helpText="A color strongly associated with the merchant, currently used for elements like primary and secondary buttons."
                        label="Brand"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    global: {
                                        ...temp?.designSystem?.colors?.global,
                                        brand: value,
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.global?.brand
                        }
                    />

                    <ColorPickerInput
                        helpText="A color used for interaction, like links and focus states."
                        label="Accent"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    global: {
                                        ...temp?.designSystem?.colors?.global,
                                        accent: value,
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.global?.accent
                        }
                    />

                    <ColorPickerInput
                        helpText="A semantic color used for components that communicate successful actions."
                        label="Success"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    global: {
                                        ...temp?.designSystem?.colors?.global,
                                        success: value,
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.global?.success
                        }
                    />

                    <ColorPickerInput
                        helpText="A semantic color used for components that communicate informative content."
                        label="Info"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    global: {
                                        ...temp?.designSystem?.colors?.global,
                                        info: value,
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={activeProfile?.designSystem?.colors?.global?.info}
                    />

                    <ColorPickerInput
                        helpText="A semantic color used for components that display content that requires attention."
                        label="Warning"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    global: {
                                        ...temp?.designSystem?.colors?.global,
                                        warning: value,
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.global?.warning
                        }
                    />

                    <ColorPickerInput
                        helpText="A semantic color used for components that communicate critical content."
                        label="Critical"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    global: {
                                        ...temp?.designSystem?.colors?.global,
                                        critical: value,
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.global?.critical
                        }
                    />

                    <ColorPickerInput
                        helpText="A color used to highlight certain areas of the user interface."
                        label="Decorative"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    global: {
                                        ...temp?.designSystem?.colors?.global,
                                        decorative: value,
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.global?.decorative
                        }
                    />

                </BlockStack>

            </FormLayout>

        ) : null}

        {selectedListOption === 'scheme-1' ? (
            <FormLayout>
                <BlockStack gap="100">
                    <Text as="h4" variant="bodyLg">
                        Scheme 1
                    </Text>
                    <Text variant='bodySm' tone='subdued'>
                        The primary scheme. By default, it’s used for the main area of the interface.
                    </Text>
                </BlockStack>
                <Tabs tabs={SchemeOneTabs} selected={selectedSchemeOneTab} onSelect={(value) => setSelectedSchemeOneTab(value)} />
                <TabDivider />
                {SchemeOneTabs[selectedSchemeOneTab].id === 'colors' ? <BlockStack gap="500">
                    <ColorPickerInput
                        helpText="Text color for scheme 1"
                        label="Text"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme1: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme1,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme1.base,
                                                text: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme1?.base?.text
                        }
                    />
                    {/* Background */}
                    <ColorPickerInput
                        helpText="Background color for scheme 1"
                        label="Background"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme1: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme1,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme1.base,
                                                background: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme1?.base?.background
                        }
                    />
                    {/* Border color */}
                    <ColorPickerInput
                        helpText="Border color for scheme 1"
                        label="Border"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme1: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme1,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme1.base,
                                                border: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme1?.base?.border
                        }
                    />
                    {/* decorative */}
                    <ColorPickerInput
                        helpText="Decorative color for scheme 1"
                        label="Decorative"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme1: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme1,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme1.base,
                                                decorative: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme1?.base?.decorative
                        }
                    />
                    {/* accent */}
                    <ColorPickerInput
                        helpText="The color of accented objects (links and focused state)."
                        label="Accent"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme1: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme1,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme1.base,
                                                accent: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme1?.base?.accent
                        }
                    />
                </BlockStack> : null}
                {SchemeOneTabs[selectedSchemeOneTab].id === 'form-control' ?
                    <FormLayout>
                        <BlockStack gap="500">
                            <ColorPickerInput
                                label="Text"
                                helpText="The color of form control text."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        text: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.text
                                }
                            />

                            <ColorPickerInput
                                label="Background"
                                helpText="The color of form control background."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        background: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.background
                                }
                            />

                            <ColorPickerInput
                                label="Border"
                                helpText="The color of form control border."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        border: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.border
                                }
                            />

                            <ColorPickerInput
                                label="Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        decorative: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.decorative
                                }
                            />

                            <ColorPickerInput
                                label="Accent"
                                helpText="The color of accented objects (links and focused state) in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        accent: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.accent
                                }
                            />

                            <ColorPickerInput
                                label="Selected Text"
                                helpText="The color of form control text in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.control.selected,
                                                            text: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.text
                                }
                            />

                            <ColorPickerInput
                                label="Selected Background"
                                helpText="The color of form control background in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.control.selected,
                                                            background: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.background
                                }
                            />

                            <ColorPickerInput
                                label="Selected Border"
                                helpText="The color of form control border in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.control.selected,
                                                            border: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.border
                                }
                            />

                            <ColorPickerInput
                                label="Selected Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.control.selected,
                                                            decorative: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.decorative
                                }
                            />

                            <ColorPickerInput
                                label="Selected Accent"
                                helpText="The color of accented objects (links and focused state) in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.control.selected,
                                                            accent: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.control?.selected?.accent
                                }
                            />
                        </BlockStack>
                    </FormLayout> : null}

                {SchemeOneTabs[selectedSchemeOneTab].id === 'primary-button' ?
                    <FormLayout>
                        <BlockStack gap="500">
                            <ColorPickerInput
                                label="Text"
                                helpText="The color of primary button text."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        text: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.text
                                }
                            />

                            <ColorPickerInput
                                label="Background"
                                helpText="The color of primary button background."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        background: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.background
                                }
                            />
                            <ColorPickerInput
                                label="Border"
                                helpText="The color of primary button border."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        border: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.border
                                }
                            />
                            <ColorPickerInput
                                label="Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        decorative: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Accent"
                                helpText="The color of accented objects (links and focused state)."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        accent: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.accent
                                }
                            />

                            <ColorPickerInput
                                label="Hover State Text"
                                helpText="The color of primary button text in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton.hover,
                                                            text: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.text
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Background"
                                helpText="The color of primary button background in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton.hover,
                                                            background: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.background
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Border"
                                helpText="The color of primary button border in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton.hover,
                                                            border: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.border
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton.hover,
                                                            decorative: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Accent"
                                helpText="The color of accented objects (links and focused state) in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.primaryButton.hover,
                                                            accent: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.primaryButton?.hover?.accent
                                }
                            />
                        </BlockStack>
                    </FormLayout>
                    : null}

                {SchemeOneTabs[selectedSchemeOneTab].id === 'secondary-button' ?
                    <FormLayout>
                        <BlockStack gap="500">
                            <ColorPickerInput
                                label="Text"
                                helpText="The color of secondary button text."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        text: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.text
                                }
                            />
                            <ColorPickerInput
                                label="Background"
                                helpText="The color of secondary button background."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        background: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.background
                                }
                            />
                            <ColorPickerInput
                                label="Border"
                                helpText="The color of secondary button border."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        border: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.border
                                }
                            />
                            <ColorPickerInput
                                label="Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        decorative: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Accent"
                                helpText="The color of accented objects (links and focused state)."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        accent: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.accent
                                }
                            />

                            <ColorPickerInput
                                label="Hover State Text"
                                helpText="The color of secondary button text in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton.hover,
                                                            text: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.text
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Background"
                                helpText="The color of secondary button background in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton.hover,
                                                            background: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.background
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Border"
                                helpText="The color of secondary button border in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton.hover,
                                                            border: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.border
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton.hover,
                                                            decorative: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.decorative
                                }
                            />
                            {/* accent */}
                            <ColorPickerInput
                                label="Hover State Accent"
                                helpText="The color of accented objects (links and focused state) in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme1: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme1,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme1.secondaryButton.hover,
                                                            accent: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme1?.secondaryButton?.hover?.accent
                                }
                            />
                        </BlockStack>

                    </FormLayout> : null}

            </FormLayout>
        ) : null}

        {selectedListOption === 'scheme-2' ? (
            <FormLayout>
                <BlockStack gap="100">
                    <Text as="h4" variant="bodyLg">
                        Scheme 2
                    </Text>
                    <Text variant='bodySm' tone='subdued'>
                        The secondary scheme. By default, it’s used for secondary areas, like Checkout’s Order Summary.
                    </Text>
                </BlockStack>
                <Tabs tabs={SchemeTwoTabs} selected={selectedSchemeTwoTab} onSelect={(value) => setSelectedSchemeTwoTab(value)} />
                <TabDivider />
                {SchemeTwoTabs[selectedSchemeTwoTab].id === 'colors' ? <BlockStack gap="500">
                    <ColorPickerInput
                        helpText="Text color for scheme 1"
                        label="Text color"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme2: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme2,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme2.base,
                                                text: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme2?.base?.text
                        }
                    />
                    <ColorPickerInput
                        helpText="Background color for scheme 1"
                        label="Background color"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme2: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme2,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme2.base,
                                                background: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme2?.base?.background
                        }
                    />
                    <ColorPickerInput
                        helpText="Border color for scheme 1"
                        label="Border color"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme2: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme2,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme2.base,
                                                border: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme2?.base?.border
                        }
                    />
                    <ColorPickerInput
                        helpText="Decorative color for scheme 1"
                        label="Decorative color"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme2: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme2,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme2.base,
                                                decorative: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme2?.base?.decorative
                        }
                    />
                    <ColorPickerInput
                        helpText="The color of accented objects (links and focused state)."
                        label="Accent color"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                colors: {
                                    ...temp?.designSystem?.colors,
                                    schemes: {
                                        ...temp?.designSystem?.colors?.schemes,
                                        scheme2: {
                                            ...temp?.designSystem?.colors?.schemes?.scheme2,
                                            base: {
                                                ...temp?.designSystem?.colors?.schemes?.scheme2.base,
                                                accent: value,
                                            },
                                        },
                                    },
                                },
                            };
                            handleDataChange(temp);
                        }}
                        inputColor={
                            activeProfile?.designSystem?.colors?.schemes?.scheme2?.base?.accent
                        }
                    />
                </BlockStack> : null
                }
                {SchemeTwoTabs[selectedSchemeTwoTab].id === 'form-control' ?
                    <FormLayout>
                        <BlockStack gap="500">
                            <ColorPickerInput
                                helpText="The color of form control text."
                                label="Text"
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        text: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.text
                                }
                            />
                            <ColorPickerInput
                                label="Background"
                                helpText="The color of form control background."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        background: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.background
                                }
                            />
                            <ColorPickerInput
                                label="Border"
                                helpText="The color of form control border."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        border: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.border
                                }
                            />
                            <ColorPickerInput
                                label="Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        decorative: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Accent"
                                helpText="The color of accented objects (links and focused state) in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        accent: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.accent
                                }
                            />

                            <ColorPickerInput
                                label="Selected Text"
                                helpText="The color of form control text in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.control.selected,
                                                            text: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.text
                                }
                            />

                            <ColorPickerInput
                                label="Selected Background"
                                helpText="The color of form control background in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.control.selected,
                                                            background: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.background
                                }
                            />
                            <ColorPickerInput
                                label="Selected Border"
                                helpText="The color of form control border in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.control.selected,
                                                            border: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.border
                                }
                            />
                            <ColorPickerInput
                                label="Selected Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.control.selected,
                                                            decorative: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Selected Accent"
                                helpText="The color of accented objects (links and focused state) in selected state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    control: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.control,
                                                        selected: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.control.selected,
                                                            accent: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.control?.selected?.accent
                                }
                            />
                        </BlockStack>
                    </FormLayout> : null}

                {SchemeTwoTabs[selectedSchemeTwoTab].id === 'primary-button' ?
                    <FormLayout>
                        <BlockStack gap="500">
                            <ColorPickerInput
                                label="Text"
                                helpText="The color of primary button text."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        text: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.text
                                }
                            />

                            <ColorPickerInput
                                label="Background"
                                helpText="The color of primary button background."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        background: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.background
                                }
                            />

                            <ColorPickerInput
                                label="Border"
                                helpText="The color of primary button border."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        border: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.border
                                }
                            />
                            <ColorPickerInput
                                label="Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        decorative: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Accent"
                                helpText="The color of accented objects (links and focused state)."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        accent: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.accent
                                }
                            />

                            <ColorPickerInput
                                label="Hover State Text"
                                helpText="The color of primary button text in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton.hover,
                                                            text: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.text
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Background"
                                helpText="The color of primary button background in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton.hover,
                                                            background: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.background
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Border"
                                helpText="The color of primary button border in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton.hover,
                                                            border: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.border
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton.hover,
                                                            decorative: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Accent"
                                helpText="The color of accented objects (links and focused state) in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    primaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.primaryButton.hover,
                                                            accent: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.primaryButton?.hover?.accent
                                }
                            />
                        </BlockStack>
                    </FormLayout> : null}

                {SchemeTwoTabs[selectedSchemeTwoTab].id === 'secondary-button' ?
                    <FormLayout>
                        <BlockStack gap="500">
                            <ColorPickerInput
                                label="Text"
                                helpText="The color of secondary button text."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        text: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.text
                                }
                            />
                            <ColorPickerInput
                                label="Background"
                                helpText="The color of secondary button background."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        background: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.background
                                }
                            />
                            <ColorPickerInput
                                label="Border"
                                helpText="The color of secondary button border."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        border: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.border
                                }
                            />
                            <ColorPickerInput
                                label="Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        decorative: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Accent"
                                helpText="The color of accented objects (links and focused state)."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        accent: value,
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.accent
                                }
                            />

                            <ColorPickerInput
                                label="Hover State Text"
                                helpText="The color of secondary button text in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton.hover,
                                                            text: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.text
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Background"
                                helpText="The color of secondary button background in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton.hover,
                                                            background: value,
                                                        }
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.background
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Border"
                                helpText="The color of secondary button border in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton.hover,
                                                            border: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.border
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Decorative"
                                helpText="The decorative color for highlighting specific parts of the user interface in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton.hover,
                                                            decorative: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.decorative
                                }
                            />
                            <ColorPickerInput
                                label="Hover State Accent"
                                helpText="The color of accented objects (links and focused state) in hover state."
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        colors: {
                                            ...temp?.designSystem?.colors,
                                            schemes: {
                                                ...temp?.designSystem?.colors?.schemes,
                                                scheme2: {
                                                    ...temp?.designSystem?.colors?.schemes?.scheme2,
                                                    secondaryButton: {
                                                        ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton,
                                                        hover: {
                                                            ...temp?.designSystem?.colors?.schemes?.scheme2.secondaryButton.hover,
                                                            accent: value,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                inputColor={
                                    activeProfile?.designSystem?.colors?.schemes?.scheme2?.secondaryButton?.hover?.accent
                                }
                            />
                        </BlockStack>
                    </FormLayout> : null}



            </FormLayout>
        ) : null}

        {selectedListOption === 'typography' ? (
            <FormLayout>
                <BlockStack gap="100">
                    <Text as="h4" variant="bodyLg">
                        Typography
                    </Text>
                    <Text variant='bodySm' tone='subdued'>
                        The global typography font faces, sizes, and weights
                    </Text>
                </BlockStack>
                <Tabs tabs={typographyTabs} selected={selectedTypographyTab} onSelect={(value) => setSelectedTypographyTab(value)} />
                <TabDivider />
                {typographyTabs[selectedTypographyTab].id === 'primary' ?
                    <FormLayout>
                        <Select
                            label="Fonts"
                            helpText="A font group used for most components such as text, buttons and form controls."
                            options={[
                                normalizedFonts?.length ? { label: 'Custom fonts ---', value: '1', disabled: true } : {},
                                ...normalizedFonts,
                                { label: 'System fonts ---', value: '2', disabled: true },
                                ...FONTS
                            ]}
                            value={primaryCustomFontSelected ?
                                primaryCustomFontSelected :
                                activeProfile?.designSystem?.typography?.primary?.shopifyFontGroup?.name
                            }
                            onChange={(value) => {
                                const temp = activeProfile;
                                if (value.includes('GenericFile')) {
                                    setPrimaryCustomFontSelected(value)
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        typography: {
                                            ...temp?.designSystem?.typography,
                                            primary: {
                                                customFontGroup: {
                                                    base: {
                                                        genericFileId: value,
                                                        weight: 500
                                                    },
                                                    bold: {
                                                        genericFileId: value,
                                                        weight: 500
                                                    }
                                                }
                                            },
                                        },
                                    };
                                } else {
                                    setPrimaryCustomFontSelected(null)
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        typography: {
                                            ...temp?.designSystem?.typography,
                                            primary: {
                                                ...temp?.designSystem?.typography?.primary,
                                                shopifyFontGroup: {
                                                    ...temp?.designSystem?.typography?.primary?.shopifyFontGroup,
                                                    name: value,
                                                }
                                            },
                                        },
                                    };
                                }
                                handleDataChange(temp);
                            }}
                        />
                        {customFontMarkup}
                    </FormLayout> : null}
                {typographyTabs[selectedTypographyTab].id === 'secondary' ?
                    <FormLayout>
                        <Select
                            label="Fonts"
                            helpText="A font group used for heading components by default."
                            options={[
                                normalizedFonts?.length ? { label: 'Custom fonts ---', value: '1', disabled: true } : {},
                                ...normalizedFonts,
                                { label: 'System fonts ---', value: '2', disabled: true },
                                ...FONTS
                            ]}
                            value={secondaryCustomFontSelected ?
                                secondaryCustomFontSelected :
                                activeProfile?.designSystem?.typography?.secondary?.shopifyFontGroup?.name
                            }
                            onChange={(value) => {
                                const temp = activeProfile;
                                if (value.includes('GenericFile')) {
                                    setSecondaryCustomFontSelected(value)
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        typography: {
                                            ...temp?.designSystem?.typography,
                                            secondary: {
                                                customFontGroup: {
                                                    base: {
                                                        genericFileId: value,
                                                        weight: 500
                                                    },
                                                    bold: {
                                                        genericFileId: value,
                                                        weight: 500
                                                    }
                                                }
                                            },
                                        },
                                    };
                                } else {
                                    setSecondaryCustomFontSelected(null)
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        typography: {
                                            ...temp?.designSystem?.typography,
                                            secondary: {
                                                ...temp?.designSystem?.typography?.secondary,
                                                shopifyFontGroup: {
                                                    ...temp?.designSystem?.typography?.secondary?.shopifyFontGroup,
                                                    name: value,
                                                }
                                            },
                                        },
                                    };
                                }
                                handleDataChange(temp);
                            }}
                        />
                        {customFontMarkup}
                    </FormLayout> : null}
                {typographyTabs[selectedTypographyTab].id === 'font' ?
                    <FormLayout>
                        <BlockStack gap="200">
                            <TextField
                                helpText="The base font size."
                                label="Size"
                                type="number"
                                min="12"
                                max="18"
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        typography: {
                                            ...temp?.designSystem?.typography,
                                            size: {
                                                ...temp?.designSystem?.typography?.size,
                                                ...{ base: +value },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.designSystem?.typography?.size?.base}
                                autoComplete="off"
                            />

                            <Select
                                label="Ratio"
                                helpText="The scale ratio used to derive all font sizes such as small and large."
                                options={[
                                    { label: "1.0", value: 1.0 },
                                    { label: "1.1", value: 1.1 },
                                    { label: "1.2", value: 1.2 },
                                    { label: "1.3", value: 1.3 },
                                    { label: "1.4", value: 1.4 },
                                ]}
                                onChange={(value) => {
                                    const temp = activeProfile;
                                    temp.designSystem = {
                                        ...temp?.designSystem,
                                        typography: {
                                            ...temp?.designSystem?.typography,
                                            size: {
                                                ...temp?.designSystem?.typography?.size,
                                                ...{ ratio: + value },
                                            },
                                        },
                                    };
                                    handleDataChange(temp);
                                }}
                                value={activeProfile?.designSystem?.typography?.size?.ratio} />
                        </BlockStack>
                    </FormLayout> : null}
            </FormLayout>


        ) : null}

        {selectedListOption === 'corner-radius' ? (<FormLayout>
            <BlockStack gap="100">
                <Text as="h4" variant="bodyLg">
                    Corner Radius
                </Text>
                <Text variant='bodySm' tone='subdued'>
                    The global variables used to update the corner radius.
                </Text>
            </BlockStack>
            <TabDivider />
            <FormLayout>
                <BlockStack gap="200">
                    <TextField
                        label="Small"
                        helpText="The pixel value for small corner radiuses. It should be strictly positive."
                        type="number"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                cornerRadius: {
                                    ...temp?.designSystem?.cornerRadius,
                                    small: +value
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.designSystem?.cornerRadius?.small}
                        autoComplete="off"
                    />
                    <TextField
                        label="Base"
                        helpText="The pixel value for base corner radiuses. It should be strictly positive."
                        type="number"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                cornerRadius: {
                                    ...temp?.designSystem?.cornerRadius,
                                    base: +value
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.designSystem?.cornerRadius?.base}
                        autoComplete="off"
                    />
                    <TextField
                        label="Large"
                        helpText="The pixel value for large corner radiuses. It should be strictly positive."
                        type="number"
                        onChange={(value) => {
                            const temp = activeProfile;
                            temp.designSystem = {
                                ...temp?.designSystem,
                                cornerRadius: {
                                    ...temp?.designSystem?.cornerRadius,
                                    large: +value
                                },
                            };
                            handleDataChange(temp);
                        }}
                        value={activeProfile?.designSystem?.cornerRadius?.large}
                        autoComplete="off"
                    />
                </BlockStack>
            </FormLayout>
        </FormLayout>) : null}
    </>
    );
}
