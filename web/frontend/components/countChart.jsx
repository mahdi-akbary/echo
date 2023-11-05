import { useAppQuery } from "../hooks";
import '@shopify/polaris-viz/build/esm/styles.css';
import { LineChart } from "@shopify/polaris-viz";
import { Card, BlockStack, Box, Loading, SkeletonBodyText, SkeletonDisplayText, Text, InlineStack } from "@shopify/polaris";
export function CountChart () {
    const { data: data, isRefetching: isRefetching, isLoading: isLoading, refetch: fetch } = useAppQuery({
        url: "/api/cart-items/chart/count"
    });
    const dateBaseChart = (!isLoading && !isRefetching) ?
        <LineChart showLegend={true} data={[
            {
                name: 'Added items',
                data: data
            }
        ]} isAnimated={true} xAxisOptions={{
            labelFormatter: (value) => {
                const date = new Date(value)
                return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`
            }
        }} /> : null;

    const loadingMarkup = isLoading || isRefetching ? (
        <Card>
            <Loading />
            <SkeletonBodyText />
        </Card>
    ) : null;
    const loadingTextMarkup = isLoading || isRefetching ? (
        <SkeletonDisplayText size="small" />
    ) : <Text as='h2' variant='headingSm' tone="subdued">Past 7 days</Text>;
    const markup = (!isLoading && !isRefetching) && data?.length > 0 ? (
        <Card >
            <BlockStack gap='100'>
                <Box padding='100'>
                    <Text as='h2' variant='headingMd' tone="subdued">Total Add to Cart</Text>
                </Box>
                <InlineStack align="space-between">
                    <Box padding='100'>
                        <Text as='h2' variant='headingLg' tone="subdued">{
                            data.reduce((partialSum, a) => partialSum + a.value, 0)
                        }</Text>
                    </Box>
                    <Box padding='050'>
                        {loadingTextMarkup}
                    </Box>
                </InlineStack>

                {dateBaseChart}
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
