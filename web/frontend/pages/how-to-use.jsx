import {
  Page,
  Layout,
  BlockStack,
  InlineGrid,
  Box,
  Text,
  Divider,
  Spinner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";

export default function HowToUse() {
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const videoList = [
    {
      title: "AI Product Recommendation",
      subTitle: `Personalize the shopping experience and maximize sales with AI-driven suggestions tailored to each customer's preferences.`,
      link: "https://www.loom.com/embed/38115e2140da450ca2cc9098ced024f4?sid=2cb3421d-7171-4733-8905-b6ad9d474d39?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    // {
    //   title: "Count Down Timer",
    //   subTitle: `Drive urgency and increase conversions by creating a time-sensitive atmosphere that compels customers to act quickly.`,
    //   link: "https://www.loom.com/embed/5bf6cdb4c91b41e08b0325a4b8f3d251?sid=319ff6bb-d44b-420b-8c40-3cb8391ab0ac?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    // },
    {
      title: "Custom Image Banners",
      subTitle: `Captivate shoppers with visually enticing banners showcasing promotions and special offers, enhancing engagement and product visibility.`,
      link: "https://www.loom.com/embed/3d7e2ae3546e4211985ace90a5365b0e?sid=bba0df32-cabf-40c9-a35e-f217b9641a25?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Trust Badges",
      subTitle: `Instill confidence in customers by displaying trust badges, assuring them of a secure and trustworthy transaction process.`,
      link: "https://www.loom.com/embed/5c9d74b66a4e4ab1851f68ee09833c0d?sid=23289cb6-2ec6-4f64-b71c-97585ec163a7?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Custom Fields in Checkout",
      subTitle: `Gather valuable customer data with customizable fields, enabling targeted marketing and a deeper understanding of your audience.`,
      link: "https://www.loom.com/embed/9887a26747f242d4831dd01e8b0c4790?sid=631a5f3f-16e6-4d05-85e1-36d660c50753?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true"
    },
    {
      title: "Quantity Modifier",
      subTitle: `Empower shoppers to easily adjust product quantities, streamlining the checkout process and improving overall satisfaction.`,
      link: "https://www.loom.com/embed/7e542bd15d4c44f4a7f824d1d7eb6e0a?sid=1b01ac17-f728-4cbf-a87d-f2a2f50f0448?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Checkout Free Gifts",
      subTitle: `Delight customers with surprise rewards! Encourage higher spending and nurture loyalty by offering enticing free gifts upon reaching a spending threshold.`,
      link: "https://www.loom.com/embed/778673f56e9c4331bbf372d61b33d5e9?sid=f41c6cc7-480e-48a9-b432-2c3650a1b1fd&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Checkout Survey & Feedback",
      subTitle: `Customer surveys and feedback are essential for understanding customer needs, improving products and services, and enhancing satisfaction. They also help identify trends and maintain a competitive edge.`,
      link: "https://www.loom.com/embed/8d248e35bd7e4848bb50f916f41df1be?sid=519acbbb-98a4-4da8-89de-67ef19a10280&hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
  ];

  return (
    <Page fullWidth>
      <TitleBar title="How to use" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <BlockStack gap="3">
            <Text variant="headingLg" as="h2">
              How to use
            </Text>
            <Text as="span" color="subdued">
              You can reach video resources for better understanding and usage
              of each app (extenstion).
            </Text>
            <Divider borderWidth="0" />
          </BlockStack>
        </Layout.Section>
        {videoList.map((video, i) => (
          <Layout.Section key={i}>
            <BlockStack gap={{ xs: "8", sm: "4" }}>
              <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="4">
                <Box
                  as="section"
                  paddingInlineStart={{ xs: 4, sm: 0 }}
                  paddingInlineEnd={{ xs: 4, sm: 0 }}
                >
                  <BlockStack gap="4">
                    <Text as="h3" variant="headingMd">
                      {video.title}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      {video.subTitle}
                    </Text>
                  </BlockStack>
                </Box>

                <Box
                  position="relative"
                  width={width < 780 ? "100%" : `${(width * 50) / 100}px`}
                  minHeight={`${(width * 33) / 100}px`}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  >
                    <Spinner size="large" />
                  </div>
                  <iframe
                    src={video.link}
                    frameBorder="0"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      zIndex: 2,
                      position: "relative",
                    }}
                  ></iframe>
                </Box>
              </InlineGrid>
              <Box padding="4"></Box>
            </BlockStack>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}
