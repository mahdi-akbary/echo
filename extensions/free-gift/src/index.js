import React, { useEffect, useState } from 'react';

import {
  render,
  InlineLayout,
  View,
  Banner,
  useExtensionApi,
  useSettings,
  TextBlock,
  Button,
  Image,
  Text,
  useTotalAmount,
  BlockSpacer,
  useCartLines,
  useApplyCartLinesChange
} from '@shopify/checkout-ui-extensions-react';

import { getCountryCode } from './getCountryCode.jsx';
import { BlockLayout, BlockStack, InlineStack, Style } from '@shopify/checkout-ui-extensions';

render('Checkout::Dynamic::Render', () => <App />);
const BASE_URL = 'https://result-tournaments-montana-talking.trycloudflare.com'
function App() {
  const { i18n, sessionToken } = useExtensionApi();
  const cartLines = useCartLines();
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(null);
  const { currencyCode } = useTotalAmount();

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
      // Submit report: future work
      setLoading(null);
    }
  }

  return <BlockStack columns={'10%'}>
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

}
