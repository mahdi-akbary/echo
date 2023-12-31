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
} from "@shopify/ui-extensions-react/checkout";


export function TrustCard({ title, description, icon, width }) {

    let { border, padding, alignment } = useSettings();
    const imageWidth = width === "small" ? "16%" : width === "medium" ? "20%" : width === "large" ? "32%" : width === "extraLarge" ? "48%" : "16%";
    
    return (

        <InlineLayout columns={[imageWidth, "fill"]} padding={padding} border={border} cornerRadius={'base'}>
            <View>
                <Image accessibilityDescription={description} source={ icon ?? "https://cdn.shopify.com/s/files/1/0725/8836/2008/files/trust-badge.png"} />
            </View>
    
            <View padding="tight">
                <TextBlock emphasis="bold" inlineAlignment={alignment}>{ title }</TextBlock>
                <BlockSpacer spacing="extraTight" />
                <TextBlock size="small" inlineAlignment={alignment} appearance="subdued">
                    { description }
                </TextBlock>
            </View>
        </InlineLayout>
    );
}
