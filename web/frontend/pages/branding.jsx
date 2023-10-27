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
  Toast,
  ActionList,
  Popover,
  Banner,
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
  const [toastActive, setToastActive] = useState(false);

  // Profile dropdown
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);


  const toggleToastActive = useCallback(
    () => setToastActive((active) => !active),
    [],
  );


  const handleChange = useCallback((value) => {
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
      id: 'design-system-1',
      content: 'Design system',
      panelID: 'Design-system-content-1',
    },
    {
      id: 'customization-1',
      content: 'Customization',
      accessibilityLabel: 'Customization',
      panelID: 'customization-content-1',
    },
    {
      id: 'template-1',
      content: 'Template',
      accessibilityLabel: 'Template',
      panelID: 'template-content-1',
    },
   
  ];

  // Toaster mockup
  const toastMarkup = toastActive ? (
    <Toast content="Changes saved" onDismiss={toggleToastActive} />
  ) : null;


//   console.log('activeProfile', activeProfile);

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
      toggleToastActive();
    }
  };

  const [activeCheckoutWarning, setActiveCheckoutWarning] = useState();

  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleActiveCheckoutWarning = () => {
    setActiveCheckoutWarning(!activeCheckoutWarning);
  };

  const profileSelector = (
    <Button onClick={toggleActive} disclosure>
      <div style={{display: "flex", gap: "0.4rem", alignItems: "center"}}>
        { selected ? data.profiles.find(profile => profile.id === selected).name : 'Select profile'}
        {/* if isPublished show live badge, otherwise show draft badge */}
        { selected ? data.profiles.find(profile => profile.id === selected).isPublished ? <Badge status="success"> Active </Badge> : <Badge status="info"> Draft </Badge> : null}
      </div>
    </Button>
  );

  const contentMarkup = (
    <>
      <TitleBar title="Branding" primaryAction={null} />
      {toastMarkup}
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
            <Box>
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
              <Box width="90%">
                <VerticalStack gap="4">
                  <Box>
                    <VerticalStack gap="2">
                      <Text variant="headingLg">Checkout branding</Text>
                      <Text variant="bodyMd">
                        An advance checkout branding tool that allows you to customize your checkout page, new customer accounts, thank you and order status pages.
                      </Text>
                    </VerticalStack>
                  </Box>
                 
                  {isLoadingProfile || isRefetchingProfile ? null : 
                    <Box style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}>
                      <HorizontalStack gap="3">
                        <Popover
                          active={active}
                          activator={profileSelector}
                          autofocusTarget="first-node"
                          onClose={ toggleActive }>
                          <ActionList
                            actionRole="menuitem"
                            items={
                              (data.profiles || []).map(profile => ({
                                active: profile.id === selected,
                                content: <>{profile.name} { profile.isPublished ? <Badge status="success">Active</Badge> : null}</>,
                                value: profile.id,
                                onAction: () => { handleChange(profile.id); toggleActive() },
                              }))
                            }
                          />
                        </Popover>

                        <Button primary
                          onClick={() =>
                            redirect.dispatch(
                              Redirect.Action.ADMIN_PATH,
                              { path: `/settings/checkout/preview/profiles/${selected?.split('/')[4]}`, newContext: true }
                            )
                          }> Preview </Button>
                      </HorizontalStack>

                      {/* <Box>
                        <Button critical> Remove </Button>
                      </Box> */}

                    </Box>
                  }
                </VerticalStack>

              </Box>

              <Box width="10%">
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
          <Tabs tabs={settingTabs} selected={selectedTab} onSelect={(value) => setSelectedTab(value) }></Tabs>
          
          {/* If still loading hide the settings and show placholder */}

          { isLoadingProfile || isRefetchingProfile ? (
            loadingMarkup
          ) : (
            <>

            { settingTabs[selectedTab].id === 'customization-1' ? 
              <CheckoutCustomization activeProfile={activeProfile} handleDataChange={handleDataChange}></CheckoutCustomization>
            : null }  

            { settingTabs[selectedTab].id === 'design-system-1' ? 
              <DesignSystem  activeProfile={activeProfile} handleDataChange={handleDataChange}></DesignSystem>
            : null }    

            { settingTabs[selectedTab].id === 'template-1' ? 
              <div style={{
                paddingTop: "1rem",
              }}>
                <Banner title="Under development" status="warning">
                  <p>
                    This feature is under development, we will release it soon. You can still customize your checkout using the other settings.
                  </p>
                </Banner>
              </div>

            : null  }    
          
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
          onAction: () => {
            setHasChange(false);
            refetchProductProfile();
          }
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
