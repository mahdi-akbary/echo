import { useAppQuery } from "../hooks";
import '@shopify/polaris-viz/build/esm/styles.css';
import { Card, BlockStack, Box, InlineStack, Loading, SkeletonBodyText, SkeletonDisplayText,DataTable, Text, Bleed } from "@shopify/polaris";
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
                    <Text as='h2' variant='headingLg'>Top products added to cart</Text>
                </Box>
                <Box padding='2'>
                <DataTable
                    columnContentTypes={[
                        'text',
                        'numeric',
                    ]}
                    headings={[
                        'Product',
                        'Added to cart',
                    ]}
                    rows={data.map((product) => [
                        product.product_title,
                        product.product_count
                    ])}
                    />
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
