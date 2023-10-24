import { 
    Banner, 
    Box,
    Button,
    Text,
    TextField,
    Select,
    AlphaCard,
    Divider,
    HorizontalStack,
    Grid,
    VerticalStack,
    FormLayout,
    Tabs,
Form,
} from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState, useEffect } from "react";
import { ColorPickerInput } from "../components";
import { FONTS } from "../components/fonts";



// Work in progress
export function DesignSystem({ activeProfile = {}, handleDataChange }) {
    // Debugging
    // console.log('inside profile: ', activeProfile);
    const [colorsTabsSelected, setColorsTabsSelected] = useState(0);
    const [typographyTabsSelected, setTypographyTabsSelected] = useState(0);

    // Colors Tab
    const colorsTabs = [
        {
            id: 'global',
            content: 'Global',
            accessibilityLabel: 'Global colors',
            panelID: 'global-colors',
        },
        {
            id: 'scheme-1',
            content: 'Scheme 1',
            panelID: 'scheme-1-colors',
        },
        {
            id: 'scheme-2',
            content: 'Scheme 2',
            panelID: 'scheme-2-colors',
        },
    ];

    // Typography Tab
    const typographyTabs = [
        {
            id: 'primary-typography',
            content: 'Primary',
            accessibilityLabel: 'Primary typography',
            panelID: 'primary-typography',
        },
        {
            id: 'secondary-typography',
            content: 'Secondary',
            accessibilityLabel: 'Secondary typography',
            panelID: 'secondary-typography',
        },
        {
            id: 'size-typography',
            content: 'Size',
            accessibilityLabel: 'Size',
            panelID: 'size-typography',
        },
    ];

    return (
        
        <div style={{
            padding: '2rem 1rem',
            }}>
            <HorizontalStack gap={{ xs: "2", sm: "4" }}>

                <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap={2}>
                    
                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 1, lg: 1, xl: 1 }}>
                        <VerticalStack gap="2">
                            <Text as="h3" variant="headingMd">
                                Color
                            </Text>
                            <Text as='p' variant="bodyMd">
                                A way of making the checkout page look nice and easy to use. You can change the colors, fonts, and shapes of the things on the page. 
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2}}>
                        {/* Tabs for color */}
                        <Tabs
                            tabs={colorsTabs}
                            selected={colorsTabsSelected}
                            onSelect={(value) => setColorsTabsSelected(value)}
                        />
                        <AlphaCard title="Colors" sectioned>
                           {/* If global tab active */}
                           {colorsTabs[colorsTabsSelected].id === 'global' ? (
                                <FormLayout>
                                    <Text as="h4" variant="headingSm">
                                        Global colors
                                    </Text>

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

                                    {/* Info color */}
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
                                    {/* warning */}
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
                                    {/* critical */}
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
                                    {/* decorative */}
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

                                    

                                </FormLayout>
                           
                            ): null}

                            {/* If scheme-1 tab active */}
                            {colorsTabs[colorsTabsSelected].id === 'scheme-1' ? (
                                <FormLayout>
                                    <Text as="h4" variant="headingSm">
                                        Scheme 1 colors
                                    </Text>
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
                                        label="Background color"
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
                                        label="Border color"
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
                                        label="Decorative color"
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
                                        label="Accent color"
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
                                    <hr />
                                    {/* Form control text color */}
                                    <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} gap={2}>
                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Form control colors </Text>

                                            <ColorPickerInput
                                                label="Text color"
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
                                            {/* Background */}
                                            <ColorPickerInput
                                                label="Background color"
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
                                            {/* Border color */}
                                            <ColorPickerInput
                                                label="Border color"
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
                                            {/* decorative */}
                                            <ColorPickerInput
                                                label="Decorative color"
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
                                            {/* accent */}
                                            <ColorPickerInput
                                                label="Accent color"
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
                                        </FormLayout>

                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Form control selected colors </Text>
                                            <ColorPickerInput
                                                label="Text color"
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
                                            {/* Background */}
                                            <ColorPickerInput
                                                label="Background color"
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
                                            {/* Border color */}
                                            <ColorPickerInput
                                                label="Border color"
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
                                            {/* decorative */}
                                            <ColorPickerInput
                                                label="Decorative color"
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
                                            {/* accent */}
                                            <ColorPickerInput
                                                label="Accent color"
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
                                           
                                        </FormLayout>
                                    </Grid>
                                    <hr />
                                    {/* Primary buttons */}
                                    <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} gap={2}>
                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Primary button </Text>

                                            <ColorPickerInput
                                                label="Text color"
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
                                            {/* Background */}
                                            <ColorPickerInput
                                                label="Background color"
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
                                            {/* Border color */}
                                            <ColorPickerInput
                                                label="Border color"
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
                                            {/* decorative */}
                                            <ColorPickerInput
                                                label="Decorative color"
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
                                            {/* accent */}
                                            <ColorPickerInput
                                                label="Accent color"
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
                                        </FormLayout>

                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Primary button hover state </Text>
                                            <ColorPickerInput
                                                label="Text color"
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
                                            {/* Background */}
                                            <ColorPickerInput
                                                label="Background color"
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
                                            {/* Border color */}
                                            <ColorPickerInput
                                                label="Border color"
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
                                            {/* decorative */}
                                            <ColorPickerInput
                                                label="Decorative color"
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
                                            {/* accent */}
                                            <ColorPickerInput
                                                label="Accent color"
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
                                           
                                        </FormLayout>
                                    </Grid>                                                

                                   
                                    <hr />
                                    {/* Secondary buttons */}
                                    <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} gap={2}>
                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Secondary button </Text>

                                            <ColorPickerInput
                                                label="Text color"
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
                                            {/* Background */}
                                            <ColorPickerInput
                                                label="Background color"
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
                                            {/* Border color */}
                                            <ColorPickerInput
                                                label="Border color"
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
                                            {/* decorative */}
                                            <ColorPickerInput
                                                label="Decorative color"
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
                                            {/* accent */}
                                            <ColorPickerInput
                                                label="Accent color"
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
                                        </FormLayout>

                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Secondary button hover state </Text>
                                            <ColorPickerInput
                                                label="Text color"
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
                                            {/* Background */}
                                            <ColorPickerInput
                                                label="Background color"
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
                                            {/* Border color */}
                                            <ColorPickerInput
                                                label="Border color"
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
                                            {/* decorative */}
                                            <ColorPickerInput
                                                label="Decorative color"
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
                                                label="Accent color"
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
                                           
                                        </FormLayout>
                                    </Grid>                                                

                                   
                                    
                                </FormLayout>
                            ): null}

                            {/* If scheme-2 tab active */}
                            {colorsTabs[colorsTabsSelected].id === 'scheme-2' ? (
                                <FormLayout>
                                    <Text as="h4" variant="headingSm">
                                        Scheme 2 colors
                                    </Text>
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
                                    {/* Background */}
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
                                    {/* Border color */}
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
                                    {/* decorative */}
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
                                    {/* accent */}
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
                                    <hr />
                                    {/* Form control text color */}
                                    <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} gap={2}>
                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Form control colors </Text>

                                            <ColorPickerInput
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
                                            {/* Background */}
                                            <ColorPickerInput
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
                                            {/* Border color */}
                                            <ColorPickerInput
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
                                            {/* decorative */}
                                            <ColorPickerInput
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
                                            {/* accent */}
                                            <ColorPickerInput
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
                                        </FormLayout>

                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Form control selected colors </Text>
                                            <ColorPickerInput
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
                                            {/* Background */}
                                            <ColorPickerInput
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
                                            {/* Border color */}
                                            <ColorPickerInput
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
                                            {/* decorative */}
                                            <ColorPickerInput
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
                                            {/* accent */}
                                            <ColorPickerInput
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
                                           
                                        </FormLayout>
                                    </Grid>
                                    <hr />
                                    {/* Primary buttons */}
                                    <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} gap={2}>
                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Primary button </Text>

                                            <ColorPickerInput
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
                                            {/* Background */}
                                            <ColorPickerInput
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
                                            {/* Border color */}
                                            <ColorPickerInput
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
                                            {/* decorative */}
                                            <ColorPickerInput
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
                                            {/* accent */}
                                            <ColorPickerInput
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
                                        </FormLayout>

                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Primary button hover state </Text>
                                            <ColorPickerInput
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
                                            {/* Background */}
                                            <ColorPickerInput
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
                                            {/* Border color */}
                                            <ColorPickerInput
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
                                            {/* decorative */}
                                            <ColorPickerInput
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
                                            {/* accent */}
                                            <ColorPickerInput
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
                                           
                                        </FormLayout>
                                    </Grid>                                                

                                   
                                    <hr />
                                    {/* Secondary buttons */}
                                    <Grid columns={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} gap={2}>
                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Secondary button </Text>

                                            <ColorPickerInput
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
                                            {/* Background */}
                                            <ColorPickerInput
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
                                            {/* Border color */}
                                            <ColorPickerInput
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
                                            {/* decorative */}
                                            <ColorPickerInput
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
                                            {/* accent */}
                                            <ColorPickerInput
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
                                        </FormLayout>

                                        <FormLayout>
                                            <Text as="h4" variant="headingSm">Secondary button hover state </Text>
                                            <ColorPickerInput
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
                                            {/* Background */}
                                            <ColorPickerInput
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
                                            {/* Border color */}
                                            <ColorPickerInput
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
                                            {/* decorative */}
                                            <ColorPickerInput
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
                                            {/* accent */}
                                            <ColorPickerInput
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
                                           
                                        </FormLayout>
                                    </Grid>                                                

                                   
                                    
                                </FormLayout>
                            ): null}




                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>

                <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap={2}>
                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 1, lg: 1, xl: 1 }}>
                        <VerticalStack gap="2">
                            <Text as="h3" variant="headingMd"> Typography </Text>
                            <Text as='p' variant="bodyMd">
                                Adjust the typography settings for your design system. Fonts, font sizes, line heights, and font weights can be customized.
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2}}>
                        <Tabs
                            tabs={typographyTabs}
                            selected={typographyTabsSelected}
                            onSelect={(value) => setTypographyTabsSelected(value)}
                        />

                        <AlphaCard title="Typography" sectioned>
                            {/* Primary tab */}
                            {typographyTabs[typographyTabsSelected].id === 'primary-typography' ? (
                                <FormLayout>
                                    <Text as="h4" variant="headingSm">Primary font </Text>
                                    <Select
                                        label="Font"
                                        options={FONTS}
                                        value={ activeProfile?.designSystem?.typography?.primary?.shopifyFontGroup?.name || null }
                                        onChange={(value) => {
                                            const temp = activeProfile;
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
                                            handleDataChange(temp);
                                        }}
                                    />


                                </FormLayout>

                            ): null}

                            {typographyTabs[typographyTabsSelected].id === 'secondary-typography' ? (
                                <FormLayout>
                                    <Text as="h4" variant="headingSm">Secondary font </Text>
                                    <Select
                                        label="Font"
                                        options={FONTS}
                                        value={ activeProfile?.designSystem?.typography?.secondary?.shopifyFontGroup?.name || null }
                                        onChange={(value) => {
                                            const temp = activeProfile;
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
                                            handleDataChange(temp);
                                        }}
                                    />

                                </FormLayout>

                            ): null}

                            {typographyTabs[typographyTabsSelected].id === 'size-typography' ? (
                                <FormLayout>
                                    <Text as="h4" variant="headingSm">Font size </Text>
                                    <TextField
                                            label="Font size"
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
                                            label="Font size ratio"
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
                                        value={activeProfile?.designSystem?.typography?.size?.ratio}/>
                                </FormLayout>

                            ): null}

                        </AlphaCard>
                    </Grid.Cell>

                </Grid>
            </HorizontalStack>
        </div>
       
    );
}