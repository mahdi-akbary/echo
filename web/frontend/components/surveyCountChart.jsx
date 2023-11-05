import { useAppQuery } from "../hooks";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart } from "@shopify/polaris-viz";
import { Card, BlockStack, Box, Loading, SkeletonBodyText, SkeletonDisplayText, Text, InlineStack } from "@shopify/polaris";
export function SurveyCountChart () {
    const { data: data, isRefetching: isRefetching, isLoading: isLoading, refetch: fetch } = useAppQuery({
        url: "/api/surveys/chart/count"
    });
    const dateBaseChart = (!isLoading && !isRefetching) ?
        <BarChart showLegend={true} data={[
            {
                name: 'Survey count',
                data: data
            }
        ]} isAnimated={true} xAxisOptions={{
            labelFormatter: (value) => {
                return value?.option_name
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
            <BlockStack gap='100'>
                <InlineStack align="space-between">
                    <Box padding='100'>
                        <Text as='h2' variant='headingMd' tone="subdued">Total Survey</Text>
                    </Box>
                    <Box padding='100'>
                        <Text as='h2' variant='headingLg' tone="subdued">{
                            data.reduce((partialSum, a) => partialSum + a.value, 0)
                        }</Text>
                    </Box>
                </InlineStack>
                <Box padding='200'>
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
