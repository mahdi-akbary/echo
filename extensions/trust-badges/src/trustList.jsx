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
    TextBlock, 
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function TrustList({ title, description, icon, width }) {

    let { border, padding, alignment } = useSettings();

    alignment = alignment ?? "center";

    const borderStyle = border ? 'base' : 'none';
    const imageWidth = width === "small" ? "16%" : width === "medium" ? "20%" : width === "large" ? "32%" : width === "extraLarge" ? "48%" : "16%";

    
    return (
        <BlockLayout
            spacing="extraTight"
            cornerRadius="base"
            border={borderStyle}
            rows={['auto', 'fill', 'auto']}
            padding={padding}>
                
            <InlineStack spacing="tight">
                <View border={border}>
                    <Image source={icon ?? "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png"} />
                </View>
                <View>
                    <TextBlock emphasis="bold" inlineAlignment={alignment}>{ title }</TextBlock>
                </View>
                <View border={border}>
                    <TextBlock size="small" appearance="subdued" inlineAlignment={alignment}>
                        { description }
                    </TextBlock>
                </View>
            </InlineStack>
        </BlockLayout>
    );
    
}
