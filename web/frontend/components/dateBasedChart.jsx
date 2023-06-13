import { useAppQuery } from "../hooks";
import '@shopify/polaris-viz/build/esm/styles.css';
import { LineChart } from "@shopify/polaris-viz";
import { AlphaCard, VerticalStack, Box, Loading, SkeletonBodyText, SkeletonDisplayText, Stack, Text } from "@shopify/polaris";
export function DateBasedChart () {
    const { data: data, isRefetching: isRefetching, isLoading: isLoading, refetch: fetch } = useAppQuery({
        url: "/api/orders/date-chart"
    });

    const dateBaseChart = (!isLoading && !isRefetching) ?
        <LineChart showLegend={false} data={data} isAnimated={true} xAxisOptions={{
            labelFormatter: (value) => {
                const date = new Date(value)
                return `${date.getDate()}/${date.getMonth() + 1}`
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
    ) : <Text as='h2' variant='headingMd'>Responses with in 7 days</Text>;
    const markup = data?.length > 0 ? (
        <AlphaCard >
            <VerticalStack gap='4'>
                <Box padding='4'>
                    <Stack >
                        <Stack.Item fill>
                            {loadingTextMarkup}
                        </Stack.Item>
                        <Stack.Item >
                            {/* <ResponsesCount /> */}
                        </Stack.Item>
                    </Stack>
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
