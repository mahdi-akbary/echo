import { useAppQuery } from "../hooks";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart } from "@shopify/polaris-viz";
import { Card, BlockStack, Box, Loading, SkeletonBodyText, SkeletonDisplayText, Text } from "@shopify/polaris";
export function FeedbackCountChart () {
    const { data: data, isRefetching: isRefetching, isLoading: isLoading, refetch: fetch } = useAppQuery({
        url: "/api/feedbacks/chart/count"
    });
    const dateBaseChart = (!isLoading && !isRefetching) ?
        <BarChart showLegend={true} data={[
            {
                name: 'Feedback count',
                data: data
            }
        ]} isAnimated={true} xAxisOptions={{
            labelFormatter: (value) => {
                return value
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
    ) : null;
    const markup = (!isLoading && !isRefetching) && data?.length > 0 ? (
        <Card >
            <BlockStack gap='1'>
                <Box padding='2'>
                    <Text as='h2' variant='headingLg'>Total Feedbacks</Text>
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
