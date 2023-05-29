// ProductCart is a component that renders a product card. It accept a product object as a prop.
import {
    Button,
    Image,
    Text,
    View,
    InlineLayout,
    TextBlock,
    BlockSpacer,
    useApplyCartLinesChange,
    useExtensionApi,
    useTotalAmount,
    Banner,
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";
import { getCountryCode } from './getCountryCode.jsx';

export function ProductCard({ product }) {
    const { i18n } = useExtensionApi();
    const { currencyCode } = useTotalAmount();
    const [ error, setError ] = useState();

    const [ loading, setLoading ] = useState(false);
    const applyCartLinesChange = useApplyCartLinesChange();

    async function handleAddToCart(product) {
        const merchandiseId = product.variants.edges[0].node.id;
        setLoading(true);
        const newCartLines = { 
            type: 'addCartLine',
            merchandiseId: merchandiseId,
            quantity: 1,
        };

        const result = await applyCartLinesChange(newCartLines);
        if(result.type == 'error') {
            setError(result.message);
        }
        if(result.type == 'success') {
            setError(null);
            // Submit report: future work
        }
        setLoading(false);
    }
    
    return (
        <InlineLayout
            blockAlignment="center"
            spacing="base"
            padding="none" 
            cornerRadius="base"
            columns={["20%", "fill", "30%"]}>
            <View>
                <Image
                border="base"
                cornerRadius="base"
                source={product.featuredImage.url}
                alt={product.featuredImage.altText}
                />
            </View>
            <TextBlock>
                <Text size="base" emphasis="bold">
                {" "}
                {product.title}{" "}
                </Text>
                <BlockSpacer spacing="extraTight" />
                    <Text size="base" emphasis="bold">
                    {firstVariantPrice(product)}
                </Text>
                 {/* display error if exist */}
                { error && 
                    <View>
                        <BlockSpacer spacing="extraTight" />
                        <Text appearance="critical" padding="extraTight"> { error} </Text>
                    </View>
                }
            </TextBlock>
            <View inlineAlignment="end">
                <Button
                kind="primary"
                loading={loading}
                disabled={error}
                onPress={() => handleAddToCart(product)}
                size="slim"
                fullWidth={true}
                >
                {" "}
                Add to cart
                </Button>
            </View>
        </InlineLayout>
    );

    function firstVariantPrice(product) {
        const price = product.variants.edges[0].node.price.amount;
        return i18n.formatCurrency(price, { currencyCode: currencyCode });
    }        
}
