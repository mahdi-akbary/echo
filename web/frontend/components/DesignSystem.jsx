import { 
    Banner, 
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
import { ColorPickerInput } from "../components";


// Work in progress
export function DesignSystem({ activeProfile = {}, handleDataChange }) {
    // Debugging
    console.log('inside profile: ', activeProfile);
    const [colorsTabsSelected, setColorsTabsSelected] = useState(0);

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
                        <AlphaCard title="Orders" sectioned>
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
                                    Scheme 1
                                </FormLayout>
                            ): null}

                            {/* If scheme-2 tab active */}
                            {colorsTabs[colorsTabsSelected].id === 'scheme-2' ? (
                                <FormLayout>
                                    Scheme 2
                                </FormLayout>
                            ): null}

                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>
            </HorizontalStack>
        </div>
       
    );
}