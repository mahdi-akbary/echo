import {
  Page,
  Layout,
  Text,
  VerticalStack,
  Box,
  HorizontalStack,
  Button,
  AlphaCard,
  Loading,
  SkeletonBodyText,
  SkeletonDisplayText,
  Select,
  TextField,
  Frame,
} from "@shopify/polaris";
import {
  useAuthenticatedFetch,
  TitleBar,
  ContextualSaveBar,
} from "@shopify/app-bridge-react";
import { useState } from "react";
import { useAppQuery } from "../hooks";
import { ColorPickerInput } from "../components";
import { FONTS } from "../components/fonts";

export default function Branding () {
  const fetch = useAuthenticatedFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const [hasChange, setHasChange] = useState(false);

  const handleDataChange = (value) => {
    setHasChange(true)
    setData({...data, ...value});
  }

  const {
    data: activeProfile,
    refetch: refetchProductCount,
    isLoading: isLoadingCount,
    isRefetching: isRefetchingCount,
  } = useAppQuery({
    url: "/api/branding",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });
  console.log(activeProfile);

  // customizations


  const getBillings = async () => {
    setIsLoading(true);
    const response = await fetch("/api/billings", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = await response.json();
      setCurrentBilling(data);
    }
    setIsLoading(false);
  };

  const loadingMarkup = (
    <>
      <Loading />
      <AlphaCard>
        <VerticalStack gap="4">
          <SkeletonBodyText />
          <SkeletonBodyText />
          <SkeletonBodyText />
          <SkeletonDisplayText size="medium" />
        </VerticalStack>
      </AlphaCard>
    </>
  );

  const updateBrand = async () => {
    const response = await fetch("/api/branding", {
      method: "POST",
      body: JSON.stringify(activeProfile),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const res = await response.json();
      console.log(res, "<<<<<<");
    }
  };
  const handleSubmit = async () => {

  }

  return (
    <>

      <ContextualSaveBar
        visible={hasChange}
        message="Unsaved changes"
        saveAction={{
          onAction: () => console.log(data),
          loading: false,
          disabled: false,
        }}
        discardAction={{
          onAction: () => console.log('add clear form logic'),
        }}
      />

      <Page >
        <TitleBar title="Branding" primaryAction={null} />
        <Layout>
          <Layout.Section>
            <AlphaCard fullWidth>
              <HorizontalStack align="space-between">
                <VerticalStack gap="4">
                  <Text variant="headingMd" fontWeight="semibold">
                    You can customize the appearance of the checkout
                  </Text>
                  <Text>
                    Select a plan that suits your business. You can upgrade or
                    downgrade at any time. <br /> Based on the number of orders
                    you receive per month, and the features you need.
                  </Text>
                </VerticalStack>
                <Box>
                  <Button primary size="large" onClick={updateBrand}>Activate</Button>
                </Box>
              </HorizontalStack>
            </AlphaCard>
          </Layout.Section>
          <Layout.Section>
            <AlphaCard>
              <VerticalStack gap="10">
                <VerticalStack gap="3">
                  <Text variant="headingMd">Header Section</Text>
                  <HorizontalStack gap="5" blockAlign="end">
                    <Box width="30%" >
                      <Select
                        label="Alignment"
                        options={[
                          { label: 'Start', value: 'START' },
                          { label: 'Center', value: 'CENTER' },
                          { label: 'End', value: 'END' }
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp.customizations, header: { ...temp?.customizations?.header, alignment: value } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.header?.alignment}
                      />
                    </Box>
                    <Box width="30%" >
                      <Select
                        label="Position"
                        options={[
                          { label: 'Start', value: 'START' },
                          { label: 'Inline Secondary', value: 'INLINE_SECONDARY' },
                          { label: 'Inline', value: 'INLINE' }
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp.customizations, header: { ...temp?.customizations?.header, position: value } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.header?.position}
                      />
                    </Box>
                  </HorizontalStack>
                </VerticalStack>

                <VerticalStack gap="3">
                  <Text variant="headingMd">Checkout Form Section</Text>
                  <HorizontalStack gap="5" blockAlign="end">
                    <Box width="30%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, color1: { ...temp?.designSystem?.color1, background: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.color1?.background} label="Background color" />
                    </Box>
                    <Box width="30%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, color1: { ...temp?.designSystem?.color1, foreground: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.color1?.foreground} label="Foreground color" />
                    </Box>
                  </HorizontalStack>
                </VerticalStack>

                <VerticalStack gap="3">
                  <Text variant="headingMd">Order Summary Section</Text>
                  <HorizontalStack gap="5" blockAlign="end">
                    <Box width="30%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, color2: { ...temp?.designSystem?.color2, foreground: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.color2?.background} label="Background color" />
                    </Box>
                    <Box width="30%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, color2: { ...temp?.designSystem?.color2, foreground: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.color2?.foreground} label="Foreground color" />
                    </Box>
                  </HorizontalStack>
                </VerticalStack>

                <VerticalStack gap="3">
                  <Text variant="headingMd">Typography</Text>
                  <HorizontalStack gap="5" blockAlign="end">
                    <Box width="30%" >
                      <Select
                        label="Headings font"
                        options={FONTS}
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp.designSystem, typography: { ...temp?.designSystem?.typography, ...{ secondary: { shopifyFontGroup: { name: value } } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.designSystem?.typography?.secondary?.shopifyFontGroup?.name}
                      />
                    </Box>
                    <Box width="30%" >
                      <Select
                        label="Body font"
                        options={FONTS}
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp.designSystem, typography: { ...temp?.designSystem?.typography, ...{ primary: { shopifyFontGroup: { name: value } } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.designSystem?.typography?.primary?.shopifyFontGroup?.name}
                      />
                    </Box>
                    <Box width="30%">
                      <TextField
                        label="Bast font size"
                        type="number"
                        min="12"
                        max="18"
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp.designSystem, typography: { ...temp?.designSystem?.typography, size: { ...temp?.designSystem?.typography?.size, ...{ base: +value } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.designSystem?.typography?.size?.base}
                        autoComplete="off"
                      />
                    </Box>
                    <Box width="30%" >
                      <Select
                        label="Font size ratio"
                        options={[
                          { label: '1.0', value: 1.0 },
                          { label: '1.1', value: 1.1 },
                          { label: '1.2', value: 1.2 },
                          { label: '1.3', value: 1.3 },
                          { label: '1.4', value: 1.4 },
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp.designSystem, typography: { ...temp?.designSystem?.typography, size: { ...temp?.designSystem?.typography?.size, ...{ ratio: +value } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.designSystem?.typography?.size?.ratio}
                      />
                    </Box>
                  </HorizontalStack>
                </VerticalStack>

                <VerticalStack gap="3">
                  <Text variant="headingMd">General</Text>
                  <HorizontalStack gap="5" blockAlign="end">
                    <Box width="60%" >
                      <Select
                        label="Form fields background"
                        options={[
                          { label: 'White', value: '' },
                          { label: 'Transparent', value: 'TRANSPARENT' }
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp.customizations, control: { ...temp?.customizations?.control, color: value } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.control?.color}
                      />
                    </Box>
                    <Box width="40%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, interactive: { ...temp?.designSystem?.interactive, background: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.interactive?.background} label="Accent background color" />
                    </Box>
                    <Box width="40%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, interactive: { ...temp?.designSystem?.interactive, foreground: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.interactive?.foreground} label="Accent foreground color" />
                    </Box>
                    <Box width="40%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, primary: { ...temp?.designSystem?.primary, foreground: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.primary?.background} label="Buttons background color" />
                    </Box>
                    <Box width="40%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, primary: { ...temp?.designSystem?.primary, foreground: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.primary?.foreground} label="Buttons foreground color" />
                    </Box>
                    <Box width="40%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, critical: { ...temp?.designSystem?.critical, foreground: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.critical?.background} label="Error background color" />
                    </Box>
                    <Box width="40%" >
                      <ColorPickerInput onChange={(value) => {
                        const temp = data;
                        temp.designSystem = { ...temp.designSystem, critical: { ...temp?.designSystem?.critical, foreground: value } }
                        handleDataChange(temp)
                      }} inputColor={data?.designSystem?.critical?.foreground} label="Error foreground color" />
                    </Box>
                  </HorizontalStack>
                </VerticalStack>


              </VerticalStack>
            </AlphaCard>
          </Layout.Section>
        </Layout>

      </Page>
    </>

  );
}
