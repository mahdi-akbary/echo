import {
  Page,
  Layout,
  Text,
  BlockStack,
  Box,
  InlineStack,
  Card,
  SkeletonBodyText,
  Modal,
  Button,
  Image,
  Badge,
  Toast,
  ActionList,
  Popover,
  Grid,
  SkeletonDisplayText,
Icon,
} from "@shopify/polaris";

import {CirclePlusMinor, ThemeEditMajor, ThemesMajor} from '@shopify/polaris-icons';

import {
  useAuthenticatedFetch,
  ContextualSaveBar,
  useAppBridge,
} from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";
import { Redirect } from "@shopify/app-bridge/actions";

import { useAppQuery } from "../hooks";
import { CheckoutCustomization } from "../components/CheckoutCustomization";
import { DesignSystem } from "../components/DesignSystem";
import { BrandingOptionList, ResetConfirmationModal } from "../components";


export default function Branding () {
  const fetch = useAuthenticatedFetch();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasChange, setHasChange] = useState(false);

  const [selected, setSelected] = useState(undefined);
  const [toastActive, setToastActive] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);


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
    data: activeProfile, refetch: refetchProductProfile, isLoading: isLoadingProfile, isRefetching: isRefetchingProfile,
  } = useAppQuery({
    url: selected ? `/api/branding?id=${selected}` : "/api/branding", reactQueryOptions: {
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

  const toastMarkup = toastActive ? (
    <Toast content="Changes saved" onDismiss={toggleToastActive} />
  ) : null;


  const loadingMarkup = (
    <>
      <Layout.Section variant="oneThird">
        <Card padding="800">
          <SkeletonBodyText lines="20" />
        </Card>
      </Layout.Section>
      <Layout.Section >
        <Card padding="800">
          <SkeletonBodyText lines="20" />
        </Card>
      </Layout.Section>
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
      toggleToastActive();
    }
  };

  const [activeCheckoutWarning, setActiveCheckoutWarning] = useState();

  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleActiveCheckoutWarning = () => {
    setActiveCheckoutWarning(!activeCheckoutWarning);
  };

  const handleAddNewProfile = () => {
    // Logic to add a new profile goes here
    console.log('Add new profile clicked');
    // For example, navigate to the page where a new profile can be created
    // or open a modal/dialog where the user can enter details for the new profile.
  };

  const profileSelector = (
    <Button onClick={toggleActive} disclosure>
      <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
        <Icon source={selected ? ThemeEditMajor : ThemesMajor} />
        {selected ? data.profiles.find(profile => profile.id === selected).name : 'Select profile'}
        {/* if isPublished show live badge, otherwise show draft badge */}
        {selected ? data.profiles.find(profile => profile.id === selected).isPublished ? <Badge tone="success"> Live </Badge> : <Badge tone="info"> Draft </Badge> : null}
      </div>
    </Button>
  );
  const actionsLoading = <>
    <InlineStack gap="150">
      <Box width="120px">
        <SkeletonDisplayText size="small" />
      </Box>
      <Box width="120px">
        <SkeletonDisplayText size="small" />
      </Box>
    </InlineStack>
    <Box width="120px">
      <SkeletonDisplayText size="small" />
    </Box>
  </>
  const actionsMarkups = <>
    <InlineStack gap="200">
      <Popover
        active={active}
        activator={profileSelector}
        autofocusTarget="first-node"
        onClose={toggleActive}>
        <ActionList
          actionRole="menuitem"
          items={[
            // Map your existing profiles to ActionList items
            ...(data.profiles || []).map(profile => ({
              active: profile.id === selected,
              content: profile.name,
              value: profile.id,
              icon: profile.id == selected ? ThemeEditMajor : ThemesMajor,
              ...(profile.isPublished ? {
                badge: {
                  tone: 'success',
                  content: 'Live',
                }
              } : {}),
              onAction: () => { handleChange(profile.id); toggleActive(); },
            })),
          
        
            // Add the "Add new profile" item
            {
              content: 'Add new profile',
              onAction: () => handleAddNewProfile(), 
              icon: CirclePlusMinor, 
            },
          ]}
        />
      </Popover>

      <Button variant="tertiary"
        onClick={() =>
          redirect.dispatch(
            Redirect.Action.ADMIN_PATH,
            { path: `/settings/checkout/preview/profiles/${selected?.split('/')[4]}`, newContext: true }
          )
        }> Preview </Button>
    </InlineStack>
    <Button tone="critical" onClick={() => setOpenResetModal(true)}>Reset to default</Button>
  </>

  const [selectedListOption, setSelectedListOption] = useState('global-colors')

  const contentMarkup = (
    <>
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

        <Layout.Section variant="fullWidth">
          <Card>
            <BlockStack gap="400">
              <Grid >
                <Grid.Cell columnSpan={{ xs: 4, sm: 4, lg: 10 }}>
                  <BlockStack gap="150">
                    <Text variant="headingLg" >Checkout branding</Text>
                    <Text variant="bodyMd" breakWord>
                      An advance checkout branding tool that allows you to customize your checkout page, new customer accounts, thank you and order status pages.
                    </Text>
                  </BlockStack>

                </Grid.Cell>
                <Grid.Cell columnSpan={{ xs: 2, sm: 2, lg: 2 }}>
                  <InlineStack align="end" >
                    <Image
                      src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                      alt="paint"
                      width="80"
                    />
                  </InlineStack>
                </Grid.Cell>
              </Grid>
              <InlineStack align="space-between">
                {isLoadingProfile || isRefetchingProfile ? actionsLoading : actionsMarkups}
              </InlineStack>
            </BlockStack>
          </Card>


        </Layout.Section>

        {isLoadingProfile || isRefetchingProfile ? loadingMarkup :
          <>
            <Layout.Section variant="oneThird">
              <Card padding="200">
                <BrandingOptionList selected={selectedListOption} setSelected={setSelectedListOption} />
              </Card>
            </Layout.Section>

            <Layout.Section>
              <Card padding="600" sectioned>
                <DesignSystem activeProfile={activeProfile} handleDataChange={handleDataChange} selectedListOption={selectedListOption} />
                <CheckoutCustomization activeProfile={activeProfile} handleDataChange={handleDataChange} selectedListOption={selectedListOption} />
              </Card>
            </Layout.Section>
          </>
        }

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
      <ResetConfirmationModal handleClose={setOpenResetModal} isOpen={openResetModal} profileId={activeProfile?.id} refetch={refetchProductProfile} />
      {false ? (
        <Page
          primaryAction={{
            content: "Publish",
          }}
        >
          {contentMarkup}
        </Page>
      ) : (
        <Page >{contentMarkup}</Page>
      )}
    </>
  );
}
