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
    InlineStack
} from "@shopify/checkout-ui-extensions-react";
import { useEffect, useState } from "react";

const BASE_URL = 'https://trustee-realty-saying-breakfast.trycloudflare.com'

export function ProductCard ({ product }) {
    const { sessionToken } = useExtensionApi();
    const { i18n } = useExtensionApi();
    const { currencyCode } = useTotalAmount();
    const [error, setError] = useState();
    let { show_variants, border, padding, button_style, add_to_cart_label, include_price, button_size } = useSettings();
    const showVariants = show_variants ? true : false;
    const addToCartLabel = add_to_cart_label ? add_to_cart_label : 'Add to cart';
    const includePrice = include_price ? true : false;

    // activeVariant is the first variant from product.variants.edges which has availableForSale = true
    const [activeVariant, setActiveVariant] = useState(product?.variants?.edges.find(variant => variant.node.availableForSale));
    // activeVariant is first available variant from product.variants.edges

    const [loading, setLoading] = useState(false);
    const applyCartLinesChange = useApplyCartLinesChange();

    const storeCartItem = async () => {
        try {
            const token = await sessionToken.get();
            const response = await fetch(`${BASE_URL}/api/cart-items`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...activeVariant.node,
                        productId: product.id,
                        productTitle: product.title,
                        handle: product.handle
                    }),
                }
            );
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleAddToCart () {
        const merchandiseId = activeVariant.node.id;
        setLoading(true);
        const newCartLines = {
            type: 'addCartLine',
            merchandiseId: merchandiseId,
            quantity: 1,
        };

        const result = await applyCartLinesChange(newCartLines);
        if (result.type == 'error') {
            setError(result.message);
        }
        if (result.type == 'success') {
            setError(null);
            await storeCartItem()
            // Submit report: future work
        }
        setLoading(false);
    }

    return (
        <InlineLayout
            blockAlignment="center"
            spacing="base"
            cornerRadius="base"
            border={border}
            padding={padding}
            columns={["20%", "fill", "30%"]}>
            <View>
                <Image
                    border={border ? "none" : "base"}
                    cornerRadius="base"
                    source={product.featuredImage.url}
                    alt={product.featuredImage.altText}
                />
            </View>
            <TextBlock>
                <Text size="base" emphasis="bold">
                    {product.title}
                </Text>
                <BlockSpacer spacing="extraTight" />
                {!includePrice &&
                    <Text size={button_size} appearance="subdued"> {firstVariantPrice(product)} </Text>
                }
                <BlockSpacer spacing="extraTight" />
                {showVariants && product?.variants?.edges?.length > 1 &&
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
                        } />
                }

                {error &&
                    <View>
                        <BlockSpacer spacing="extraTight" />
                        <Text appearance="critical" size="small" padding="extraTight"> {error} </Text>
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
                            <Text size={button_size}>
                                {addToCartLabel}
                            </Text>
                        </View>
                        {includePrice &&
                            <>
                                <TextBlock> &#x2022; </TextBlock>
                                <Text size={button_size}>
                                    {firstVariantPrice(product)}
                                </Text>
                            </>
                        }
                    </InlineStack>
                </Button>
            </View>
        </InlineLayout>
    );

    function firstVariantPrice (product) {
        const price = product.variants.edges[0].node.price.amount;
        return i18n.formatCurrency(price, { currencyCode: currencyCode }).replace(/\.\d+$/, '');
    }
}
