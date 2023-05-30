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
    Select,
    useSettings,
    InlineStack,
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function ProductCard({ product }) {
    const { i18n } = useExtensionApi();
    const { currencyCode } = useTotalAmount();
    const [ error, setError ] = useState();
    const { show_variants, border, padding, button_style, add_to_cart_label, include_price } = useSettings();
    const showVariants = show_variants ? true : false;
    const borderStyle = border ? 'base' : 'none';
    const addToCartLabel = add_to_cart_label ? add_to_cart_label : 'Add to cart';
    const includePrice = include_price ? true : false;

    // activeVariant is the first variant from product.variants.edges which has availableForSale = true
    const [ activeVariant, setActiveVariant ] = useState(product?.variants?.edges.find(variant => variant.node.availableForSale));
    // activeVariant is first available variant from product.variants.edges

    const [ loading, setLoading ] = useState(false);
    const applyCartLinesChange = useApplyCartLinesChange(); 

    async function handleAddToCart() {
        const merchandiseId = activeVariant.node.id;
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
            cornerRadius="base"
            border={borderStyle}
            padding={padding}
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
                    { !includePrice &&
                        <Text size="base" emphasis="bold"> {firstVariantPrice(product)} </Text>
                    }
                </Text>
                <BlockSpacer spacing="extraTight" />
                { showVariants &&
                    <Select
                        label="Select variant"
                        labelHidden
                        value={activeVariant.node.id}
                        onChange={(value) => {
                            setActiveVariant(product.variants.edges.find(variant => variant.node.id == value));
                        }}
                        options={
                            product.variants.edges.map(variant => {
                                return {
                                    label: variant.node.title,
                                    value: variant.node.id,
                                }
                            })
                        }/>
                }
                 
                { error && 
                    <View>
                        <BlockSpacer spacing="extraTight" />
                        <Text appearance="critical" padding="extraTight"> { error} </Text>
                    </View>
                }
            </TextBlock>
            <View inlineAlignment="end">
                <Button 
                    kind={button_style}
                    loading={loading}
                    disabled={error}
                    onPress={handleAddToCart}                    
                    > 

                    <InlineStack spacing="tight" blockAlignment={"center"} inlineAlignment={"start"}>
                        <View>
                            { addToCartLabel }
                        </View>
                        { includePrice &&
                            <>
                                <View> &#x2022; </View>
                                <View>
                                    {firstVariantPrice(product)}
                                </View>
                            </>
                        }
                    </InlineStack>
                </Button>
            </View>
        </InlineLayout>
    );

    function firstVariantPrice(product) {
        const price = product.variants.edges[0].node.price.amount;
        return i18n.formatCurrency(price, { currencyCode: currencyCode }).replace(/\.\d+$/, '');
    }        
}
