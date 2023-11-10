import {
    Page,
    Layout,
    useBreakpoints,
    CalloutCard
  } from "@shopify/polaris";
  
  export default function Settings() {
    const { smUp } = useBreakpoints();

    return (
      <Page>
        <Layout>
          <Layout.Section>
            <CalloutCard
                    title="Contact us"
                    illustration="https://cdn.shopify.com/s/files/1/0725/8836/2008/files/email.png?v=1696851554"
                    primaryAction={{
                        content: 'Contact us',
                        url: 'mailto:contact@codeinspire.io',
                    }}>
                    <p>
                        If you have any questions or queries about our products or services, please feel free to contact us. We are always happy to hear from you and provide you with the best possible assistance. contact@codeinspire.io
                    </p>
                </CalloutCard>
          </Layout.Section>

          <Layout.Section>
            <CalloutCard
                    title="Feature request"
                    illustration="https://cdn.shopify.com/s/files/1/0725/8836/2008/files/puzzle.png?v=1696852090"
                    primaryAction={{
                        content: 'Request a feature',
                        url: 'mailto:feature@codeinspire.io',
                    }}>
                    <p>
                        We value your feedback and suggestions on how we can improve our products or services. If you have any ideas or requests for a feature that you would like to see in our offerings, please let us know. We will build it in a week. feature@codeinspire.io
                    </p>
                </CalloutCard>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }
  