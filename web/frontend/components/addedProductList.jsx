import { useAppQuery } from "../hooks";
import '@shopify/polaris-viz/build/esm/styles.css';
import { Card, BlockStack, Box, InlineStack, Loading, SkeletonBodyText, SkeletonDisplayText, Text, Bleed } from "@shopify/polaris";
export function AddedProductList () {
    const { data: data, isRefetching: isRefetching, isLoading: isLoading, refetch: fetch } = useAppQuery({
        url: "/api/cart-items/top"
    });

    const loadingMarkup = isLoading || isRefetching ? (
        <Card>
            <Loading />
            <SkeletonBodyText />
        </Card>
    ) : null;
    const markup = (!isLoading && !isRefetching) && data?.length > 0 ? (
        <Card >
            <BlockStack gap='4'>
                <Box padding='2'>
                    <Text as='h2' variant='headingLg'>Top 10 added products to cart</Text>
                </Box>
                <Box>
                {
                    data.map((product) => (
                        <Bleed marginBlockStart='3' key={product?.product_id}>
                        <InlineStack align="space-between">
                            <Box padding='2'>
                                <Text as='h2' variant='headingSm' color="subdued">{product.product_title}</Text>
                            </Box>
                            <Box padding='2'>
                                <Text as='h2' variant='headingMd' color="subdued">{product.product_count}</Text>
                            </Box>
                        </InlineStack>
                        </Bleed>
                    ))
                }
                </Box>
            </BlockStack>
        </Card>
    ) : null
    return (
        <>
            {loadingMarkup}
            {markup}
        </>


    )
}
