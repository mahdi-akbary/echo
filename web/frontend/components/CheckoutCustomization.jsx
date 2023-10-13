import { 
    Select, 
    Checkbox,
    Box,
    Button,
    Text,
    TextField,
    AlphaCard,
    Divider,
    HorizontalStack,
    Grid,
    VerticalStack,
    FormLayout,
    Tabs
} from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState, useEffect } from "react";

// Work in progress
export function CheckoutCustomization({activeProfile = {}, handleDataChange}) {
    console.log('inside profile: ', activeProfile);
    const [selectedTab, setSelectedTab] = useState(0);


    // Form elements tabs
    const FromElementsTabs = [
        {
            id: 'general-1',
            content: 'General',
            accessibilityLabel: 'General',
            panelID: 'general-content-1',
        },
        {
            id: 'input-1',
            content: 'Input',
            accessibilityLabel: 'Input',
            panelID: 'input-content-1',
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
        }
    ];

    const handleTabChange = (selectedTabIndex) => {
        setSelectedTab(selectedTabIndex);
    }


    return (
        <div style={{
            padding: '2rem 1rem',
            }}>
            <Grid columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} gap={4}>
                <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap={2}>
                    
                    <Grid.Cell gap="2" columnSpan={{xs: 3, sm: 3, md: 1, lg: 1, xl: 1 }}>
                        <VerticalStack gap="2">
                            <Text as="h3" variant="headingMd">
                               Global typography
                            </Text>

                            <Text as='p' variant="bodyMd">
                                Chnage global customization for typography.
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}>
                        <AlphaCard title="Global customisation">
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
                                    value={activeProfile?.customizations?.global?.typography.letterCase}/>

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
                                    value={ activeProfile?.customizations?.global?.typography.kerning || ''}/>

                            </FormLayout>
                           
                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>
            
                <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap={2}>
                    
                    <Grid.Cell gap="2" columnSpan={{xs: 3, sm: 3, md: 1, lg: 1, xl: 1 }}>
                        <VerticalStack gap="2">
                            <Text as="h3" variant="headingMd">
                               Header
                            </Text>

                            <Text as='p' variant="bodyMd">
                                Change the header alignment and position.
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2}}>
                        <AlphaCard title="Orders" sectioned>
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
                                

                            </FormLayout>
                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>
            
                <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap={2}>
                    
                    <Grid.Cell gap="2" columnSpan={{xs: 3, sm: 3, md: 1, lg: 1, xl: 1 }}>
                        <VerticalStack gap="2">
                            <Text as="h3" variant="headingMd">
                               Form elements
                            </Text>

                            <Text as='p' variant="bodyMd">
                                Change form elements desing and appearance.
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2}}>
                        <Tabs tabs={FromElementsTabs} selected={selectedTab} onSelect={ handleTabChange }></Tabs>
                        <AlphaCard title="Orders">

                            {/* General - controls */}
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
                                        value={activeProfile?.customizations?.control?.border || ''}/>

                                   
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
                                        value={activeProfile?.customizations?.control?.cornerRadius || ''}/>
                                    
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
                                                    color: (value === 'TRANSPARENT') ? 'TRANSPARENT' : null,
                                                },
                                            };
                                            handleDataChange(temp);
                                            }
                                        }
                                        value={activeProfile?.customizations?.control?.color || ''}/>

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
                                        value={activeProfile?.customizations?.control?.labelPosition || ''}/>
                                   
                                </FormLayout>
                            ): null }

                            {FromElementsTabs[selectedTab].id === 'input-1' ? (
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
                                        value={activeProfile?.customizations?.checkbox?.cornerRadius || ''}/>

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
                                            value={activeProfile?.customizations?.textField?.typography?.font || ''}/>

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
                                            value={activeProfile?.customizations?.textField?.typography?.kerning || ''}/>

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
                                            value={activeProfile?.customizations?.textField?.typography?.size || ''}/>

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
                                            value={activeProfile?.customizations?.textField?.typography?.letterCase || ''}/>

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
                                            value={activeProfile?.customizations?.textField?.typography?.weight || ''}/>

                                </FormLayout>
                            ): null }

                            {/* Select */}
                            {FromElementsTabs[selectedTab].id === 'select-1' ? (
                                <FormLayout>
                                    <Select
                                        label="Checkbox corner radius"
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
                                        value={activeProfile?.customizations?.checkbox?.cornerRadius || ''}/>
                                </FormLayout>

                            ): null}

                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>
            
            </Grid>
        </div>
       
    );
}