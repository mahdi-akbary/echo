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
  Modal,
  Button,
  Image,
  ChoiceList,
  Badge,
} from "@shopify/polaris";
import {
  useAuthenticatedFetch,
  TitleBar,
  ContextualSaveBar,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import { Redirect } from "@shopify/app-bridge/actions";

import { useAppQuery } from "../hooks";
import { ColorPickerInput } from "../components";
import { FONTS } from "../components/fonts";

export default function Branding () {
  const fetch = useAuthenticatedFetch();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasChange, setHasChange] = useState(false);

  const [selected, setSelected] = useState(undefined);

  const handleChange = useCallback((value) => {
    setSelected(value)
    refetchProductProfile()
  }, []);

  const handleDataChange = (value) => {
    setHasChange(true);
    setData({ ...data, ...value });
  };

  const {
    data: activeProfile,
    refetch: refetchProductProfile,
    isLoading: isLoadingProfile,
    isRefetching: isRefetchingProfile,
  } = useAppQuery({
    url: selected ? `/api/branding?id=${selected}` : "/api/branding",
    reactQueryOptions: {
      onSuccess: (res) => {
        if (!hasChange) {
          if (res.designSystem && res.designSystem.typography) {
            res.designSystem.typography.secondary = {
              shopifyFontGroup: {
                name: res?.designSystem?.typography?.secondary?.name,
              },
            };
            res.designSystem.typography.primary = {
              shopifyFontGroup: {
                name: res?.designSystem?.typography?.primary?.name,
              },
            };
          }
          setSelected(res?.id)
          setData(res);
        }
        setIsLoading(false);
      },
    },
  });

  const loadingMarkup = (
    <>
      <Loading />
      <HorizontalStack align="space-between">
        {[1, 2, 3].map((id) => <Box key={id} width="32%">
          <AlphaCard>
            <VerticalStack gap="4">
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
              <SkeletonBodyText />
            </VerticalStack>
          </AlphaCard>
        </Box>)}
      </HorizontalStack>
    </>
  );

  const handleSubmit = async () => {
    if (data?.isPublished) {
      handleActiveCheckoutWarning()
    } else {
      await submit()
    }
  };
  const submit = async () => {
    setIsLoading(true);

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

  const [activeCheckoutWarning, setActiveCheckoutWarning] = useState();

  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleActiveCheckoutWarning = () => {
    setActiveCheckoutWarning(!activeCheckoutWarning);
  };

  const contentMarkup = (
    <>
      <TitleBar title="Branding" primaryAction={null} />
      <Layout>
        <Modal
          open={activeCheckoutWarning}
          onClose={handleActiveCheckoutWarning}
          title="Are you sure?"
          primaryAction={{
            content: "Yes",
            onAction: async () => { handleActiveCheckoutWarning(); await submit() },
          }}
          secondaryActions={[
            {
              content: "Dismiss",
              onAction: handleActiveCheckoutWarning,
            },
          ]}
        >
          <Modal.Section>
            <Box background="bg-warning" padding="1">
              <Text variant="headingMd">
                It's your Active checkout, the changes will take effect immediately.
              </Text>
            </Box>
            <Text color="subdued">We recommend bringing changes to the duplicate checkout first, then publish it when you are 100% sure.</Text>
          </Modal.Section>
        </Modal>

        <Layout.Section>
          <AlphaCard>
            <HorizontalStack>
              <Box width="89%">
                <VerticalStack gap="4">
                  <Box>
                    <VerticalStack gap="2">
                      <Text variant="headingLg">Checkout Branding</Text>
                      <Text variant="bodyMd">
                        An Advance setting for fully customization of the checkout
                        appearance & branding.
                      </Text>
                    </VerticalStack>
                  </Box>
                  <ChoiceList
                    title=<Text fontWeight="semibold">Below is your checkout profiles.</Text>
                    choices={
                      (data.profiles || []).map(profile => ({
                        label: <>{profile.name} {profile.isPublished ? <Badge status="success">Active</Badge> : null}</>,
                        value: profile.id,
                      }))}
                    selected={selected || ['hidden']}
                    onChange={handleChange}
                  />
                  {isLoadingProfile || isRefetchingProfile ? null : <HorizontalStack gap="3">
                    <Button plain monochrome onClick={() =>
                      redirect.dispatch(
                        Redirect.Action.ADMIN_PATH,
                        "/settings/checkout"
                      )
                    }>You can always create, duplicate or publish your checkout profiles here</Button>
                    <Button
                      plain
                      monochrome
                      onClick={() =>
                        redirect.dispatch(
                          Redirect.Action.ADMIN_PATH,
                          { path: `/settings/checkout/preview/profiles/${selected?.split('/')[4]}`, newContext: true }
                        )
                      }
                    >
                      Preview
                    </Button>
                  </HorizontalStack>}
                </VerticalStack>
              </Box>
              <Box width="11%">
                <Image
                  src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                  alt="paint"
                  width="100"
                />
              </Box>
            </HorizontalStack>
          </AlphaCard>
        </Layout.Section>

        <Layout.Section>
          {isLoadingProfile || isRefetchingProfile ? (
            loadingMarkup
          ) : (
            <HorizontalStack align="space-between">
              <Box width="32%">
                <VerticalStack gap="4">
                  <AlphaCard>
                    <VerticalStack gap="3">
                      <Text variant="headingMd">Header Section</Text>
                      <Select
                        label="Alignment"
                        options={[
                          { label: "Start", value: "START" },
                          { label: "Center", value: "CENTER" },
                          { label: "End", value: "END" },
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = {
                            ...temp?.customizations,
                            header: {
                              ...temp?.customizations?.header,
                              alignment: value,
                            },
                          };
                          handleDataChange(temp);
                        }}
                        value={data?.customizations?.header?.alignment}
                      />
                      <Select
                        label="Position"
                        options={[
                          { label: "Full width", value: "START" },
                          {
                            label: "Order summary",
                            value: "INLINE_SECONDARY",
                          },
                          { label: "Checkout form", value: "INLINE" },
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = {
                            ...temp?.customizations,
                            header: {
                              ...temp?.customizations?.header,
                              position: value,
                            },
                          };
                          handleDataChange(temp);
                        }}
                        value={data?.customizations?.header?.position}
                      />
                    </VerticalStack>
                  </AlphaCard>

                  <AlphaCard>
                    <VerticalStack gap="3">
                      <Text variant="headingMd">Headings Typography</Text>
                      <Select
                        label="Font"
                        options={FONTS}
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = {
                            ...temp?.designSystem,
                            typography: {
                              ...temp?.designSystem?.typography,
                              ...{
                                secondary: {
                                  shopifyFontGroup: { name: value },
                                },
                              },
                            },
                          };
                          handleDataChange(temp);
                        }}
                        value={
                          data?.designSystem?.typography?.secondary
                            ?.shopifyFontGroup?.name ||
                          data?.designSystem?.typography?.secondary?.name
                        }
                      />
                      <Select
                        label="Font weight"
                        options={[
                          { label: 'Base', value: 'BASE' },
                          { label: 'Bold', value: 'BOLD' }
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp?.customizations, headingLevel1: { typography: { ...temp?.customizations?.headingLevel1?.typography, ...{ weight: value } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.headingLevel1?.typography?.weight}
                      />
                      <Select
                        label="Font size"
                        options={[
                          { label: 'Base', value: 'BASE' },
                          { label: 'Extra small', value: 'EXTRA_SMALL' },
                          { label: 'Small', value: 'SMALL' },
                          { label: 'Medium', value: 'MEDIUM' },
                          { label: 'Large', value: 'LARGE' },
                          { label: 'X large', value: 'EXTRA_LARGE' },
                          { label: '2X large', value: 'EXTRA_EXTRA_LARGE' },
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp?.customizations, headingLevel1: { typography: { ...temp?.customizations?.headingLevel1?.typography, ...{ size: value } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.headingLevel1?.typography?.size}
                      />
                      <Select
                        label="Letter case "
                        options={[
                          { label: 'Lower', value: 'LOWER' },
                          { label: 'None', value: 'NONE' },
                          { label: 'Title', value: 'TITLE' },
                          { label: 'Upper', value: 'UPPER' },
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp?.customizations, headingLevel1: { typography: { ...temp?.customizations?.headingLevel1?.typography, ...{ letterCase: value } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.headingLevel1?.typography?.letterCase}
                      />
                    </VerticalStack>
                  </AlphaCard>
                </VerticalStack>
              </Box>

              <Box width="32%">
                <VerticalStack gap="4">
                  <AlphaCard>
                    <VerticalStack gap="3">
                      <Text variant="headingMd">Body Typography</Text>
                      <Select
                        label="Font"
                        options={FONTS}
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = {
                            ...temp?.designSystem,
                            typography: {
                              ...temp?.designSystem?.typography,
                              ...{
                                primary: {
                                  shopifyFontGroup: { name: value },
                                },
                              },
                            },
                          };
                          handleDataChange(temp);
                        }}
                        value={
                          data?.designSystem?.typography?.primary
                            ?.shopifyFontGroup?.name ||
                          data?.designSystem?.typography?.primary?.name
                        }
                      />
                      <Select
                        label="Font weight"
                        options={[
                          { label: 'Base', value: 'BASE' },
                          { label: 'Bold', value: 'BOLD' }
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp?.customizations, headingLevel2: { typography: { ...temp?.customizations?.headingLevel2?.typography, ...{ weight: value } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.headingLevel2?.typography?.weight}
                      />
                      <Select
                        label="Font size"
                        options={[
                          { label: 'Base', value: 'BASE' },
                          { label: 'Extra small', value: 'EXTRA_SMALL' },
                          { label: 'Small', value: 'SMALL' },
                          { label: 'Medium', value: 'MEDIUM' },
                          { label: 'Large', value: 'LARGE' },
                          { label: 'X large', value: 'EXTRA_LARGE' },
                          { label: '2X large', value: 'EXTRA_EXTRA_LARGE' },
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp?.customizations, headingLevel2: { typography: { ...temp?.customizations?.headingLevel2?.typography, ...{ size: value } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.headingLevel2?.typography?.size}
                      />
                      <Select
                        label="Letter case "
                        options={[
                          { label: 'Lower', value: 'LOWER' },
                          { label: 'None', value: 'NONE' },
                          { label: 'Title', value: 'TITLE' },
                          { label: 'Upper', value: 'UPPER' },
                        ]}
                        onChange={(value) => {
                          const temp = data;
                          temp.customizations = { ...temp?.customizations, headingLevel2: { typography: { ...temp?.customizations?.headingLevel2?.typography, ...{ letterCase: value } } } }
                          handleDataChange(temp)
                        }}
                        value={data?.customizations?.headingLevel2?.typography?.letterCase}
                      />
                    </VerticalStack>
                  </AlphaCard>
                  <AlphaCard>
                    <VerticalStack gap="3">
                      <Text variant="headingMd">Checkout Form Section</Text>
                      <ColorPickerInput
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = {
                            ...temp?.designSystem,
                            colorPalette: {
                              ...temp?.designSystem?.colorPalette,
                              color1: {
                                ...temp?.designSystem?.colorPalette?.color1,
                                background: value,
                              },
                            },
                          };
                          handleDataChange(temp);
                        }}
                        inputColor={
                          data?.designSystem?.colorPalette?.color1?.background
                        }
                        label="Background color"
                      />
                      <ColorPickerInput
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = {
                            ...temp?.designSystem,
                            colorPalette: {
                              ...temp?.designSystem?.colorPalette,
                              color1: {
                                ...temp?.designSystem?.colorPalette?.color1,
                                foreground: value,
                              },
                            },
                          };
                          handleDataChange(temp);
                        }}
                        inputColor={
                          data?.designSystem?.colorPalette?.color1?.foreground
                        }
                        label="Foreground color"
                      />
                    </VerticalStack>
                  </AlphaCard>

                  <AlphaCard>
                    <VerticalStack gap="3">
                      <Text variant="headingMd">Order Summary Section</Text>
                      <ColorPickerInput
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = {
                            ...temp?.designSystem,
                            colorPalette: {
                              ...temp?.designSystem?.colorPalette,
                              color2: {
                                ...temp?.designSystem?.colorPalette?.color2,
                                background: value,
                              },
                            },
                          };
                          handleDataChange(temp);
                        }}
                        inputColor={
                          data?.designSystem?.colorPalette?.color2?.background
                        }
                        label="Background color"
                      />
                      <ColorPickerInput
                        onChange={(value) => {
                          const temp = data;
                          temp.designSystem = {
                            ...temp?.designSystem,
                            colorPalette: {
                              ...temp?.designSystem?.colorPalette,
                              color2: {
                                ...temp?.designSystem?.colorPalette?.color2,
                                foreground: value,
                              },
                            },
                          };
                          handleDataChange(temp);
                        }}
                        inputColor={
                          data?.designSystem?.colorPalette?.color2?.foreground
                        }
                        label="Foreground color"
                      />
                    </VerticalStack>
                  </AlphaCard>
                </VerticalStack>
              </Box>

              <Box width="32%">
                <AlphaCard>
                  <VerticalStack gap="3">
                    <Text variant="headingMd">General</Text>
                    <TextField
                      label="Font size"
                      type="number"
                      min="12"
                      max="18"
                      onChange={(value) => {
                        const temp = data;
                        temp.designSystem = {
                          ...temp?.designSystem,
                          typography: {
                            ...temp?.designSystem?.typography,
                            size: {
                              ...temp?.designSystem?.typography?.size,
                              ...{ base: +value },
                            },
                          },
                        };
                        handleDataChange(temp);
                      }}
                      value={data?.designSystem?.typography?.size?.base}
                      autoComplete="off"
                    />
                    <Select
                      label="Font size ratio"
                      options={[
                        { label: "1.0", value: 1.0 },
                        { label: "1.1", value: 1.1 },
                        { label: "1.2", value: 1.2 },
                        { label: "1.3", value: 1.3 },
                        { label: "1.4", value: 1.4 },
                      ]}
                      onChange={(value) => {
                        const temp = data;
                        temp.designSystem = {
                          ...temp?.designSystem,
                          typography: {
                            ...temp?.designSystem?.typography,
                            size: {
                              ...temp?.designSystem?.typography?.size,
                              ...{ ratio: +value },
                            },
                          },
                        };
                        handleDataChange(temp);
                      }}
                      value={data?.designSystem?.typography?.size?.ratio}
                    />
                    <Select
                      label="Form fields background"
                      options={[
                        { label: "White", value: "" },
                        { label: "Transparent", value: "TRANSPARENT" },
                      ]}
                      onChange={(value) => {
                        const temp = data;
                        temp.customizations = {
                          ...temp?.customizations,
                          control: {
                            ...temp?.customizations?.control,
                            color: value,
                          },
                        };
                        handleDataChange(temp);
                      }}
                      value={data?.customizations?.control?.color}
                    />
                    <Select
                      label="Form fields border radius"
                      options={[
                        { label: 'None', value: 'NONE' },
                        { label: 'Base', value: 'BASE' },
                        { label: 'Small', value: 'SMALL' },
                        { label: 'Large', value: 'LARGE' },
                      ]}
                      onChange={(value) => {
                        const temp = data;
                        temp.customizations = { ...temp?.customizations, control: { ...temp?.customizations?.control, cornerRadius: value } }
                        handleDataChange(temp)
                      }}
                      value={data?.customizations?.control?.cornerRadius}
                    />
                    <Select
                      label="Button border radius"
                      options={[
                        { label: 'None', value: 'NONE' },
                        { label: 'Base', value: 'BASE' },
                        { label: 'Small', value: 'SMALL' },
                        { label: 'Large', value: 'LARGE' },
                      ]}
                      onChange={(value) => {
                        const temp = data;
                        temp.customizations = { ...temp?.customizations, primaryButton: { ...temp?.customizations?.primaryButton, cornerRadius: value } }
                        handleDataChange(temp)
                      }}
                      value={data?.customizations?.primaryButton?.cornerRadius}
                    />
                    <ColorPickerInput
                      onChange={(value) => {
                        const temp = data;
                        temp.designSystem = {
                          ...temp?.designSystem,
                          colorPalette: {
                            ...temp?.designSystem?.colorPalette,
                            interactive: {
                              ...temp?.designSystem?.colorPalette?.interactive,
                              background: value,
                            },
                          },
                        };
                        handleDataChange(temp);
                      }}
                      inputColor={
                        data?.designSystem?.colorPalette?.interactive
                          ?.background || "#fff"
                      }
                      label="Accent background color"
                    />
                    <ColorPickerInput
                      onChange={(value) => {
                        const temp = data;
                        temp.designSystem = {
                          ...temp?.designSystem,
                          colorPalette: {
                            ...temp?.designSystem?.colorPalette,
                            interactive: {
                              ...temp?.designSystem?.colorPalette?.interactive,
                              foreground: value,
                            },
                          },
                        };
                        handleDataChange(temp);
                      }}
                      inputColor={
                        data?.designSystem?.colorPalette?.interactive
                          ?.foreground || "#fff"
                      }
                      label="Accent foreground color"
                    />
                    <ColorPickerInput
                      onChange={(value) => {
                        const temp = data;
                        temp.designSystem = {
                          ...temp?.designSystem,
                          colorPalette: {
                            ...temp?.designSystem?.colorPalette,
                            primary: {
                              ...temp?.designSystem?.colorPalette?.primary,
                              background: value,
                            },
                          },
                        };
                        handleDataChange(temp);
                      }}
                      inputColor={
                        data?.designSystem?.colorPalette?.primary?.background ||
                        "#fff"
                      }
                      label="Buttons background color"
                    />
                    <ColorPickerInput
                      onChange={(value) => {
                        const temp = data;
                        temp.designSystem = {
                          ...temp?.designSystem,
                          colorPalette: {
                            ...temp?.designSystem?.colorPalette,
                            primary: {
                              ...temp?.designSystem?.colorPalette?.primary,
                              foreground: value,
                            },
                          },
                        };
                        handleDataChange(temp);
                      }}
                      inputColor={
                        data?.designSystem?.colorPalette?.primary?.foreground ||
                        "#fff"
                      }
                      label="Buttons foreground color"
                    />
                    <ColorPickerInput
                      onChange={(value) => {
                        const temp = data;
                        temp.designSystem = {
                          ...temp?.designSystem,
                          colorPalette: {
                            ...temp?.designSystem?.colorPalette,
                            critical: {
                              ...temp?.designSystem?.colorPalette?.critical,
                              background: value,
                            },
                          },
                        };
                        handleDataChange(temp);
                      }}
                      inputColor={
                        data?.designSystem?.colorPalette?.critical
                          ?.background || "#fff"
                      }
                      label="Error background color"
                    />
                    <ColorPickerInput
                      onChange={(value) => {
                        const temp = data;
                        temp.designSystem = {
                          ...temp?.designSystem,
                          colorPalette: {
                            ...temp?.designSystem?.colorPalette,
                            critical: {
                              ...temp?.designSystem?.colorPalette?.critical,
                              foreground: value,
                            },
                          },
                        };
                        handleDataChange(temp);
                      }}
                      inputColor={
                        data?.designSystem?.colorPalette?.critical
                          ?.foreground || "#fff"
                      }
                      label="Error foreground color"
                    />
                  </VerticalStack>
                </AlphaCard>
              </Box>
            </HorizontalStack>
          )}
        </Layout.Section>
      </Layout>
    </>
  );

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
      {false ? (
        <Page
          primaryAction={{
            content: "Publish",
          }}
        >
          {contentMarkup}
        </Page>
      ) : (
        <Page>{contentMarkup}</Page>
      )}
    </>
  );
}
