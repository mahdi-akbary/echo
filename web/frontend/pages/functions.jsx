import {
  Page,
  Layout,
} from "@shopify/polaris";
import { Functions } from "../components";

export default function Settings () {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Functions />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
