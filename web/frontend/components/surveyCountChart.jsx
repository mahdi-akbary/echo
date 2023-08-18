import { useAppQuery } from "../hooks";
import '@shopify/polaris-viz/build/esm/styles.css';
import { BarChart } from "@shopify/polaris-viz";
import { AlphaCard, VerticalStack, Box, Loading, SkeletonBodyText, SkeletonDisplayText, Stack, Text } from "@shopify/polaris";
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
                // const date = new Date(value)
                return value?.option_name
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
                    <Text as='h2' variant='headingLg'>Total Adds</Text>
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
