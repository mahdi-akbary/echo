import { 
    Select, 
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
} from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState, useEffect } from "react";

// Work in progress
export function CheckoutCustomization({activeProfile = {}, handleDataChange}) {
    console.log('inside profile: ', activeProfile);
    
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
                               Forms and inputs
                            </Text>

                            <Text as='p' variant="bodyMd">
                                Change form and input styles.
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2}}>
                        <AlphaCard title="Orders" sectioned>
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
                                
                            <Select
                                label="Control border"
                                helpText="It includes all form elements, such as input, select, checkbox, radio, etc."
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
                                    }}
                                value={activeProfile?.customizations?.control?.border || ''}/>
                                
                                
                            </FormLayout>
                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>
            
            </Grid>
        </div>
       
    );
}