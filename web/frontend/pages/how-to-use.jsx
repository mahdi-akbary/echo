import {
  Page,
  Layout,
  VerticalStack,
  HorizontalGrid,
  Box,
  Text,
  Divider,
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
      title: "AI Product Recommendations",
      subTitle: `
          Use AI to recommend products to your customers. View
          analytics to see how your recommendations are performing.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Count Down Timer",
      subTitle: `
          Use AI to recommend products to your customers. View
          analytics to see how your recommendations are performing.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Image banner",
      subTitle: `
          Use AI to recommend products to your customers. View
          analytics to see how your recommendations are performing.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Custom Fields",
      subTitle: `
          Use AI to recommend products to your customers. View
          analytics to see how your recommendations are performing.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Line Item Change",
      subTitle: `
          Use AI to recommend products to your customers. View
          analytics to see how your recommendations are performing.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Trust Badges",
      subTitle: `
          Use AI to recommend products to your customers. View
          analytics to see how your recommendations are performing.`,
      link: "https://www.loom.com/embed/799f5eb9613c41b9a092664f0151d6e0?sid=5820c294-15fb-4628-83cb-b6da0ba8afa1?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true",
    },
    {
      title: "Checkout Upsell",
      subTitle: `
          Use AI to recommend products to your customers. View
          analytics to see how your recommendations are performing.`,
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
                  width={width < 780 ? "100%" : `${(width * 50) / 100}px`}
                  minHeight={`${(width * 33) / 100}px`}
                >
                  <iframe
                    src={video.link}
                    frameborder="0"
                    allowFullScreen
                    style={{ width: "100%", height: "100%" }}
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
