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
} from '@shopify/polaris';
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState, useEffect } from "react";

// Work in progress
export function CheckoutCustomization() {
    const fetch = useAuthenticatedFetch();
    
    const [isLoading, setIsLoading] = useState(true);
    
    return (
        
        <div style={{
            padding: '2rem 1rem',
            }}>
            <HorizontalStack gap={{ xs: "2", sm: "4" }}>
                <Grid columns={{ xs: 1, sm: 3, md: 3, lg: 3, xl: 3 }} gap={2}>
                    
                    <Grid.Cell gap="2" columnSpan={{xs: 3, sm: 3, md: 1, lg: 1, xl: 1 }}>
                        <VerticalStack gap="2">
                            <Text as="h3" variant="headingMd">
                                Checkout Customization
                            </Text>

                            <Text as='p' variant="bodyMd">
                                A way of making the checkout page look nice and easy to use. You can change the colors, fonts, and shapes of the things on the page.
                            </Text>
                        </VerticalStack>
                    </Grid.Cell>

                    <Grid.Cell columnSpan={{xs: 3, sm: 3, md: 2, lg: 2, xl: 2}}>

                        <AlphaCard title="Orders" sectioned>
                            <p>View a summary of your online store’s orders.</p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis voluptatibus nisi sit facere ratione, aliquam repellat modi, impedit sequi unde iusto. Est tempora ea veniam modi corrupti sequi deserunt rem.
                            </p>
                        </AlphaCard>
                    </Grid.Cell>
                    
                </Grid>
            </HorizontalStack>
        </div>
       
    );
}