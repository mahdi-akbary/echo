import { useAppQuery } from "../hooks";
import '@shopify/polaris-viz/build/esm/styles.css';
import { LineChart } from "@shopify/polaris-viz";
import { AlphaCard, VerticalStack, Box, Loading, SkeletonBodyText, SkeletonDisplayText, Stack, Text } from "@shopify/polaris";
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
        <AlphaCard>
            <Loading />
            <SkeletonBodyText />
        </AlphaCard>
    ) : null;
    const loadingTextMarkup = isLoading || isRefetching ? (
        <SkeletonDisplayText size="small" />
    ) : <Text color="subdued" as='h2' variant='headingSm'>Past 7 days</Text>;
    const markup = (!isLoading && !isRefetching) && data?.length > 0 ? (
        <AlphaCard >
            <VerticalStack gap='1'>
                <Box padding='2'>
                    <Text as='h2' variant='headingLg'>Total Add to Cart</Text>
                </Box>
                <Box padding='2'>
                    <Text as='h2' variant='headingXl'>{
                        data.reduce((partialSum, a) => partialSum + a.value, 0)
                    }</Text>
                </Box>
                <Box padding='2'>
                    {loadingTextMarkup}
                </Box>

                {dateBaseChart}
            </VerticalStack>
        </AlphaCard>
    ) : null
    return (
        <>
            {loadingMarkup}
            {markup}
        </>


    )
}
