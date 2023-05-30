// ProductCart is a component that renders a product card. It accept a product object as a prop.
import {
    Button,
    Image,
    Text,
    View,
    InlineLayout,
    TextBlock,
    BlockSpacer,
    useSettings,
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function TrustCard({ title, description, icon, width }) {

    let { border, padding, alignment } = useSettings();

    alignment = 'center';

    const borderStyle = border ? 'base' : 'none';
    const imageWidth = width === "small" ? "16%" : width === "medium" ? "20%" : width === "large" ? "32%" : width === "extraLarge" ? "48%" : "16%";
    
    return (
        <InlineLayout columns={[imageWidth, "fill"]}>
            <View border={border} padding="tight">
                <Image source={ icon ?? "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png"} />
            </View>
    
            <View border={border} padding="tight">
                <TextBlock emphasis="bold" inlineAlignment={alignment}>{ title }</TextBlock>
                <BlockSpacer spacing="extraTight" />
                <TextBlock size="small" inlineAlignment={alignment} appearance="subdued">
                    { description }
                </TextBlock>
            </View>
        </InlineLayout>
    );
}
