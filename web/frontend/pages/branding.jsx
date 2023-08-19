import {
  Page,
  Layout,
  Text,
  VerticalStack,
  Box,
  HorizontalStack,
  AlphaCard,
  Loading,
  SkeletonBodyText,
  Select,
  TextField,
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
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasChange, setHasChange] = useState(false);

  const handleDataChange = (value) => {
    setHasChange(true)
    setData({ ...data, ...value });
  }

  const {
    data: activeProfile,
    refetch: refetchProductProfile,
    isLoading: isLoadingProfile,
    isRefetching: isRefetchingProfile,
  } = useAppQuery({
    url: "/api/branding",
    reactQueryOptions: {
      onSuccess: (res) => {
        if (!hasChange) {
          if (res.designSystem && res.designSystem.typography) {
            res.designSystem.typography.secondary = { shopifyFontGroup: { name: res?.designSystem?.typography?.secondary?.name } }
            res.designSystem.typography.primary = { shopifyFontGroup: { name: res?.designSystem?.typography?.primary?.name } }
          }
          setData(res)
        }
        setIsLoading(false);
      },
    },
  });

  const loadingMarkup = (
    <>
      <Loading />
      <AlphaCard>
        <VerticalStack gap="4">
          <SkeletonBodyText />
          <SkeletonBodyText />
          <SkeletonBodyText />
          <SkeletonBodyText />
          <SkeletonBodyText />
        </VerticalStack>
      </AlphaCard>
    </>
  );

  const handleSubmit = async () => {
    setIsLoading(true)
    const response = await fetch("/api/branding", {
      method: "POST",
      body: JSON.stringify({ ...activeProfile, ...data }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const res = await response.json();
      setIsLoading(false);
      setHasChange(false);
    }
  };

  return (
    <>
      <ContextualSaveBar
        visible={hasChange}
        message="Unsaved changes"
        saveAction={{
          onAction: handleSubmit,
          loading: isLoading,
          disabled: isLoading,
        }}
        discardAction={{
          onAction: () => setHasChange(false),
        }}
      />

      <Page >
        <TitleBar title="Branding" primaryAction={null} />
        <Layout>
          <Layout.Section>
            <AlphaCard fullWidth background="bg-info-subdued">
              <HorizontalStack align="space-between">
                <VerticalStack gap="2">
                  <Text variant="headingMd" fontWeight="semibold">
                    An Advance setting for fully customization of the checkout appearance.
                  </Text>
                  <Text>
                    Everything in the checkout looks can be changes including colors, fonts and header positions.
                  </Text>
                </VerticalStack>
              </HorizontalStack>
            </AlphaCard>
          </Layout.Section>
          <Layout.Section>
            {isLoadingProfile || isRefetchingProfile ? loadingMarkup :
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
                            temp.customizations = { ...temp?.customizations, header: { ...temp?.customizations?.header, alignment: value } }
                            handleDataChange(temp)
                          }}
                          value={data?.customizations?.header?.alignment}
                        />
                      </Box>
                      <Box width="30%" >
                        <Select
                          label="Position"
                          options={[
                            { label: 'Full width', value: 'START' },
                            { label: 'Order summary', value: 'INLINE_SECONDARY' },
                            { label: 'Checkout form', value: 'INLINE' }
                          ]}
                          onChange={(value) => {
                            const temp = data;
                            temp.customizations = { ...temp?.customizations, header: { ...temp?.customizations?.header, position: value } }
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
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, color1: { ...temp?.designSystem?.colorPalette?.color1, background: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.color1?.background} label="Background color" />
                      </Box>
                      <Box width="30%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, color1: { ...temp?.designSystem?.colorPalette?.color1, foreground: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.color1?.foreground} label="Foreground color" />
                      </Box>
                    </HorizontalStack>
                  </VerticalStack>

                  <VerticalStack gap="3">
                    <Text variant="headingMd">Order Summary Section</Text>
                    <HorizontalStack gap="5" blockAlign="end">
                      <Box width="30%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, color2: { ...temp?.designSystem?.colorPalette?.color2, background: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.color2?.background} label="Background color" />
                      </Box>
                      <Box width="30%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, color2: { ...temp?.designSystem?.colorPalette?.color2, foreground: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.color2?.foreground} label="Foreground color" />
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
                            temp.designSystem = { ...temp?.designSystem, typography: { ...temp?.designSystem?.typography, ...{ secondary: { shopifyFontGroup: { name: value } } } } }
                            handleDataChange(temp)
                          }}
                          value={data?.designSystem?.typography?.secondary?.shopifyFontGroup?.name || data?.designSystem?.typography?.secondary?.name}
                        />
                      </Box>
                      <Box width="30%" >
                        <Select
                          label="Body font"
                          options={FONTS}
                          onChange={(value) => {
                            const temp = data;
                            temp.designSystem = { ...temp?.designSystem, typography: { ...temp?.designSystem?.typography, ...{ primary: { shopifyFontGroup: { name: value } } } } }
                            handleDataChange(temp)
                          }}
                          value={data?.designSystem?.typography?.primary?.shopifyFontGroup?.name || data?.designSystem?.typography?.primary?.name}
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
                            temp.designSystem = { ...temp?.designSystem, typography: { ...temp?.designSystem?.typography, size: { ...temp?.designSystem?.typography?.size, ...{ base: +value } } } }
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
                            temp.designSystem = { ...temp?.designSystem, typography: { ...temp?.designSystem?.typography, size: { ...temp?.designSystem?.typography?.size, ...{ ratio: +value } } } }
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
                            temp.customizations = { ...temp?.customizations, control: { ...temp?.customizations?.control, color: value } }
                            handleDataChange(temp)
                          }}
                          value={data?.customizations?.control?.color}
                        />
                      </Box>
                      <Box width="40%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, interactive: { ...temp?.designSystem?.colorPalette?.interactive, background: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.interactive?.background || '#fff'} label="Accent background color" />
                      </Box>
                      <Box width="40%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, interactive: { ...temp?.designSystem?.colorPalette?.interactive, foreground: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.interactive?.foreground || '#fff'} label="Accent foreground color" />
                      </Box>
                      <Box width="40%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, primary: { ...temp?.designSystem?.colorPalette?.primary, background: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.primary?.background || '#fff'} label="Buttons background color" />
                      </Box>
                      <Box width="40%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, primary: { ...temp?.designSystem?.colorPalette?.primary, foreground: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.primary?.foreground || '#fff'} label="Buttons foreground color" />
                      </Box>
                      <Box width="40%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, critical: { ...temp?.designSystem?.colorPalette?.critical, background: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.critical?.background || '#fff'} label="Error background color" />
                      </Box>
                      <Box width="40%" >
                        <ColorPickerInput onChange={(value) => {
                          const temp = data;
                          temp.designSystem = { ...temp?.designSystem, colorPalette: { ...temp?.designSystem?.colorPalette, critical: { ...temp?.designSystem?.colorPalette?.critical, foreground: value } } }
                          handleDataChange(temp)
                        }} inputColor={data?.designSystem?.colorPalette?.critical?.foreground || '#fff'} label="Error foreground color" />
                      </Box>
                    </HorizontalStack>
                  </VerticalStack>

                </VerticalStack>
              </AlphaCard>
            }
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}
