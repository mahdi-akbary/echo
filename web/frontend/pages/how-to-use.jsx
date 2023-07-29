import {
  Page,
  Layout,
  VerticalStack,
  HorizontalGrid,
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
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Count Down Timer",
      subTitle: `Drive urgency and increase conversions by creating a time-sensitive atmosphere that compels customers to act quickly.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Custom Image Banners",
      subTitle: `Captivate shoppers with visually enticing banners showcasing promotions and special offers, enhancing engagement and product visibility.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Trust Badges",
      subTitle: `Instill confidence in customers by displaying trust badges, assuring them of a secure and trustworthy transaction process.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Custom Fields in Checkout",
      subTitle: `Gather valuable customer data with customizable fields, enabling targeted marketing and a deeper understanding of your audience.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Quantity Modifier",
      subTitle: `Empower shoppers to easily adjust product quantities, streamlining the checkout process and improving overall satisfaction.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Checkout Free Gifts",
      subTitle: `Delight customers with surprise rewards! Encourage higher spending and nurture loyalty by offering enticing free gifts upon reaching a spending threshold.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
  ];

  return (
    <Page>
      <TitleBar title="How to use" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <VerticalStack gap="3">
            <Text variant="headingLg" as="h2">
              How to use
            </Text>
            <Text as="span" color="subdued">
              You can reach video resources for better understanding and usage
              of each app (extenstion).
            </Text>
            <Divider borderWidth="0" />
          </VerticalStack>
        </Layout.Section>
        {videoList.map((video, i) => (
          <Layout.Section key={i}>
            <VerticalStack gap={{ xs: "8", sm: "4" }}>
              <HorizontalGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="4">
                <Box
                  as="section"
                  paddingInlineStart={{ xs: 4, sm: 0 }}
                  paddingInlineEnd={{ xs: 4, sm: 0 }}
                >
                  <VerticalStack gap="4">
                    <Text as="h3" variant="headingMd">
                      {video.title}
                    </Text>
                    <Text as="p" variant="bodyMd">
                      {video.subTitle}
                    </Text>
                  </VerticalStack>
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
              </HorizontalGrid>
              <Box padding="4"></Box>
            </VerticalStack>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}
