// ProductCart is a component that renders a product card. It accept a product object as a prop.
import {
    Button,
    Image,
    Text,
    View,
    BlockSpacer,
    useSettings,
    BlockLayout,
    InlineStack,
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function TrustList({ title, description, icon, width }) {

    const { border, padding } = useSettings();
    const borderStyle = border ? 'base' : 'none';
    const imageWidth = width === "small" ? "16%" : width === "medium" ? "20%" : width === "large" ? "32%" : width === "extraLarge" ? "48%" : "16%";

    
    return (
        <BlockLayout
            spacing="extraTight"
            cornerRadius="base"
            border={borderStyle}
            rows={['auto', 'fill', 'auto']}
            padding={padding}>
            <View>
                <Text emphasis="bold">{ title }</Text>
            </View>
            <InlineStack spacing="extraTight">
                <View border={border} padding="tight">
                    <Image source={icon ?? "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png"} />
                </View>
                <View border={border} padding="tight">
                    <TextBlock size="small" appearance="subdued">
                        { description }
                    </TextBlock>
                </View>
            </InlineStack>
        </BlockLayout>
    );
    
}
