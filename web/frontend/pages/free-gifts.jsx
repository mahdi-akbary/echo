import {
  Page,
  Layout,
} from "@shopify/polaris";
import { FreeGift } from "../components";

export default function Settings() {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <FreeGift />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
