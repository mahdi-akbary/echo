import { Box, Text } from "@shopify/polaris";

export function HelpText ({ text }) {
    return <Box paddingBlockEnd="200" paddingBlockStart="0">
        <Text tone="subdued">
            <p style={{ fontSize: '11px' }}>{text}</p>
        </Text>
    </Box>
}
