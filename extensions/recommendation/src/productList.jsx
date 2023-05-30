// ProductCart is a component that renders a product card. It accept a product object as a prop.
import {
    Button,
    Image,
    Text,
    View,
    BlockSpacer,
    useApplyCartLinesChange,
    useExtensionApi,
    useTotalAmount,
    Select,
    useSettings,
    BlockLayout,
    InlineStack,
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function ProductList({ product }) {
    const { i18n } = useExtensionApi();
    const { currencyCode } = useTotalAmount();
    const [ error, setError ] = useState();
    let { show_variants, border, padding, button_style, add_to_cart_label, include_price, button_size } = useSettings();
    const showVariants = show_variants ? true : false;
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
        <BlockLayout
            spacing="extraTight"
            cornerRadius="base"
            border={border}
            rows={['auto', 'fill', 'auto']}
            padding={padding}>

            <View>
                <Image
                border={border ? "none" : "base"}
                cornerRadius="base"
                source={product.featuredImage.url}
                alt={product.featuredImage.altText}
                fit="contain"
                />
            </View>

            <View inlineAlignment="start">
                <Text size="base" emphasis="bold"> {product.title} </Text>
                { showVariants  && product?.variants?.edges?.length > 1 &&
                    <Select label="Select variant"
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
            </View>
            <View>
                { !includePrice &&
                    <Text size={button_size} appearance="subdued"> {firstVariantPrice(product)} </Text>
                }
                <BlockSpacer spacing="tight" />
                <Button 
                    kind={button_style}
                    loading={loading}
                    disabled={error}
                    onPress={handleAddToCart}                    
                    > 

                    <InlineStack spacing="tight" blockAlignment={"center"} inlineAlignment={"center"}>
                        <View>
                            { addToCartLabel }
                        </View>
                        { includePrice &&
                            <>
                                <View> &#x2022; </View>
                                <Text>
                                    {firstVariantPrice(product)}
                                </Text>
                            </>
                        }
                    </InlineStack>
                </Button>
            </View>

        </BlockLayout>
    );

    function firstVariantPrice(product) {
        const price = product.variants.edges[0].node.price.amount;
        // format currency and remove the cent part
        return i18n.formatCurrency(price, { currencyCode: currencyCode }).replace(/\.\d+$/, '');
    }        
}
