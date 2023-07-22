import {
  Page,
  Layout,
  Text,
  VerticalStack,
  Box,
  Divider,
  Modal,
  TextField,
} from "@shopify/polaris";
import { FreeGift } from "../components";

export default function Settings() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Box paddingBlockStart="5">
            <VerticalStack gap={"2"}>
              <Text variant="headingLg" as="h2">
                Extension settings
              </Text>
              <Text as="span" color="subdued">
                Here’s what you need to setup some extensions based on your
                needs. please refer to `How to use` for more information
              </Text>

              <Divider borderWidth="1" />
            </VerticalStack>
          </Box>
        </Layout.Section>
        <Layout.Section>
          <FreeGift />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
