import React, { useEffect, useState } from 'react';

import {
  useSettings,
  InlineLayout,
  View,
  Banner,
  TextBlock,
  Button,
  Image,
  Text,
  BlockSpacer,
  useCartLines,
  useApplyCartLinesChange,
  useApi,
  BlockStack,
  useTotalAmount,
  reactExtension,
  Heading,
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension("purchase.checkout.block.render", () => <App />);
const BASE_URL = 'https://checkout-plus.fly.dev'
function App() {
  const { i18n, sessionToken } = useApi();
  const cartLines = useCartLines();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(null);
  const { currencyCode } = useTotalAmount();

  const { title } = useSettings();
  const bannerTitle = title || "Exclusive Gift with Purchase";


  useEffect(async () => {
    const token = await sessionToken.get();
    const response = await fetch(`${BASE_URL}/api/products`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json()
    let isGiftAdded = false
    data?.forEach(v => {
      cartLines.forEach(line => {
        if (v.variant_id == line.merchandise.id) {
          isGiftAdded = true
        }
      })
    })
    if (!isGiftAdded)
      setData(data)
  }, []);

  let variants = data;

  const applyCartLinesChange = useApplyCartLinesChange();

  async function handleAddToCart(merchandiseId) {
    setLoading(merchandiseId);
    const newCartLines = {
      type: 'addCartLine',
      merchandiseId: merchandiseId,
      quantity: 1,
    };

    const result = await applyCartLinesChange(newCartLines);
    if (result.type == 'error') {
      setError(result.message);
      setLoading(null);
    }
    if (result.type == 'success') {
      setError(null);
      setData([])
      setLoading(null);
    }
  }

  return <>
  <Heading>{ bannerTitle }</Heading>
  <BlockSpacer />

  <BlockStack columns={'10%'}>
    {
      variants.map(v => <InlineLayout blockAlignment="center" spacing="base" padding="base" cornerRadius="base" border="dotted" columns={['15%', 'fill', '30%']} key={v.id}>
        <View
          maxInlineSize={70}
        >
          <Image border='base' cornerRadius='base' source={v?.image_url} />
        </View>
        <TextBlock>
          <Text size="base" emphasis="bold">{v?.title}</Text>
          <Text size="small" appearance="critical"> (Free gift)</Text>
          <BlockSpacer spacing="extraTight" />
          <Text size="base" accessibilityRole="deletion" appearance="subdued">{i18n.formatCurrency(v?.price, { currencyCode: currencyCode })}</Text>
          <BlockSpacer spacing="extraTight" />
          <Text size="base" emphasis="bold">Free</Text>
        </TextBlock>
        <View inlineAlignment='end' maxBlockSize={10}>
          <Button kind='primary' loading={loading == v.variant_id} disabled={error} onPress={async () => await handleAddToCart(v.variant_id)} inlineAlignment="center" fullWidth={true} > Add to cart</Button>
        </View>
      </InlineLayout>)
    }

    {error &&
      <View>
        <BlockSpacer spacing="extraTight" />
        <Banner status="info" padding="extraTight"> {error} </Banner>
      </View>
    }
  </BlockStack>
  </>

}
