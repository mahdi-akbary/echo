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
  Tabs,
  Grid,
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
import { CheckoutCustomization } from "../components/CheckoutCustomization";
import { DesignSystem } from "../components/DesignSystem";


export default function Branding () {
  const fetch = useAuthenticatedFetch();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasChange, setHasChange] = useState(false);

  const [selected, setSelected] = useState(undefined);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = useCallback((value) => {
    console.log('value', value);
    setSelected(value)
    refetchProductProfile();

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

  const settingTabs = [
    {
      id: 'customization-1',
      content: 'Customization',
      accessibilityLabel: 'Customization',
      panelID: 'customization-content-1',
    },
    {
      id: 'Design-system-1',
      content: 'Design system',
      panelID: 'Design-system-content-1',
    }
  ];

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelectedTab(selectedTabIndex),
    [],
  );


  console.log('activeProfile', activeProfile);

  const loadingMarkup = (
    <div style={{ padding: "2rem 1rem" }}>
      <Loading />
      <HorizontalStack align="space-between">
        <SkeletonBodyText />
        <SkeletonBodyText />
      </HorizontalStack>
    </div>
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
                    title={<Text fontWeight="semibold">Checkout profiles.</Text>}
                    choices={
                      (data.profiles || []).map(profile => ({
                        label: <>{profile.name} {profile.isPublished ? <Badge status="success">Active</Badge> : null}</>,
                        value: profile.id,
                      }))}
                    selected={selected || ['hidden']}
                    onChange={handleChange}
                  />
                  <Text>
                    You can always create, duplicate or publish your checkout profiles
                  </Text>
                  {isLoadingProfile || isRefetchingProfile ? null : <HorizontalStack gap="3">
                    <Button  onClick={() =>
                      redirect.dispatch(
                        Redirect.Action.ADMIN_PATH,
                        "/settings/checkout"
                      )
                    }>Create new profile</Button>

                    <Button primary
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
          <Tabs tabs={settingTabs} selected={selectedTab} onSelect={handleTabChange}></Tabs>
          
          {/* If still loading hide the settings and show placholder */}

          { isLoadingProfile || isRefetchingProfile ? (
            loadingMarkup
          ) : (
            <>

            { selectedTab === 0 ? 
              <CheckoutCustomization></CheckoutCustomization>
            : null }  
            {selectedTab === 1 ? 
              <DesignSystem></DesignSystem>
            : null }        
          
            </>
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
          fullWidth
          primaryAction={{
            content: "Publish",
          }}
        >
          {contentMarkup}
        </Page>
      ) : (
        <Page fullWidth>{contentMarkup}</Page>
      )}
    </>
  );
}
