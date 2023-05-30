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

export function TrustList({ title, description, icon, width }) {

    let { border, padding, alignment } = useSettings();
    
    return (
        <BlockLayout
            spacing="tight"
            cornerRadius="base"
            border={border}
            rows={['auto', 'fill', 'auto']}
            padding={padding}>

            <View>
                <Image accessibilityDescription={description} source={icon ?? "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png"} />
            </View>
            <View>
                <TextBlock emphasis="bold" inlineAlignment={alignment}>{ title }</TextBlock>
            </View>
            <View>
                <TextBlock size="small" appearance="subdued" inlineAlignment={alignment}>
                    { description }
                </TextBlock>
            </View>
        </BlockLayout>
    );
    
}
