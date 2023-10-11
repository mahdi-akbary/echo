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
} from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState, useEffect } from "react";

// Work in progress
export function CheckoutCustomization({activeProfile = null, handleDataChange}) {
    const fetch = useAuthenticatedFetch();
    console.log('inside profile: ', activeProfile);

    const [isLoading, setIsLoading] = useState(true);
    
    return (
        
        <div style={{
            padding: '2rem 1rem',
            }}>
            <Grid columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }} gap={4}>

                <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap={2}>
                    
                    <Grid.Cell gap="2" columnSpan={{xs: 3, sm: 3, md: 1, lg: 1, xl: 1 }}>
                        <VerticalStack gap="2">
                            <Text as="h3" variant="headingMd">
                               Global customization
                            </Text>

                            <Text as='p' variant="bodyMd">
                                Chnage global customization for your checkout page.
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}>
                        <AlphaCard title="Orders" sectioned>
                        <Select
                            label="Alignment"
                            options={[
                                { label: "Default", value: null },
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
                            value={activeProfile?.customizations?.header?.alignment}
                        />
                           
                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>
            
                <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap={2}>
                    
                    <Grid.Cell gap="2" columnSpan={{xs: 3, sm: 3, md: 1, lg: 1, xl: 1 }}>
                        <VerticalStack gap="2">
                            <Text as="h3" variant="headingMd">
                               Checkout header
                            </Text>

                            <Text as='p' variant="bodyMd">
                                A way of making the checkout page look nice and easy to use. You can change the colors, fonts, and shapes of the things on the page.
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2}}>
                        <AlphaCard title="Orders" sectioned>
                        <Select
                            label="Alignment"
                            options={[
                                { label: "Default", value: null },
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
                            value={activeProfile?.customizations?.header?.alignment}
                        />
                           
                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>
            
            </Grid>
        </div>
       
    );
}