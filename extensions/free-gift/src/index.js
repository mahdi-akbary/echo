import React, { useEffect, useState } from 'react';

import {
  render,
  InlineLayout,
  View,
  Banner,
  useExtensionApi,
  useSettings,
  SkeletonImage,
  TextBlock,
  SkeletonText,
  SkeletonTextBlock,
  Button,
  Image,
  Text,
  useTotalAmount,
  BlockSpacer,
  useApplyCartLinesChange,
} from '@shopify/checkout-ui-extensions-react';

import { getCountryCode } from './getCountryCode.jsx';

render('Checkout::Dynamic::Render', () => <App />);

function App () {
  const { sessionToken } = useExtensionApi();
  const { i18n, query, localization } = useExtensionApi();
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { first_gift, second_gift, third_gift } = useSettings();
  const variantId = first_gift ? first_gift : 'gid://shopify/ProductVariant/45509861277976';
  const { currencyCode } = useTotalAmount();

  // userCountryCode is two letter currencyCode
  const userCountryCode = getCountryCode(currencyCode);

  useEffect(async () => {
    // send request to server for handling this request.
    const token = await sessionToken.get();
    console.log(token);
    const response = await fetch(`https://checkout-sample.myshopify.com/admin/api/2023-07/graphql.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `query { productVariant1: productVariant(id: "gid://shopify/ProductVariant/30322695") { id title } productVariant2: productVariant(id: "gid://shopify/ProductVariant/43729076") { id title } productVariant3: productVariant(id: "gid://shopify/ProductVariant/113711323") { id title } }`
        }),
      }
    );
      console.log(response);



    // query(
    //   `query getProducts($first: 1, $query: String) {
    //       products(first: $first, query: $query) {
    //         edges {
    //           cursor
    //           node {
    //             title
    //           }
    //         }
    //       }
    //     }`
    // )
    //   .then(({ data, errors }) => {
    //     // console.log(data)
    //     setData(data);
    //   })
    //   .catch((error) => {
    //     console.log('error: ', error);
    //   });
  }, []);

  let title = data?.node?.product.title;
  let image = data?.node?.image ? data?.node?.image : data?.node?.product?.featuredImage;
  let price = data?.node?.price?.amount;
  let variant_id = data?.node?.id.split('/').pop();
  let merchandiseId = data?.node?.id;
  let formattedPrice = i18n.formatCurrency(price, { currencyCode: currencyCode });

  // let selectedVariant = data?.node?.product?.variants?.edges?.find(({node}) => node.id === variantId);
  let variants = data?.node?.product?.variants?.edges;

  const applyCartLinesChange = useApplyCartLinesChange();

  async function handleAddToCart () {
    setLoading(true);
    const newCartLines = {
      type: 'addCartLine',
      merchandiseId: merchandiseId,
      quantity: 1,
    };

    const result = await applyCartLinesChange(newCartLines);
    if (result.type == 'error') {
      setError(result.message);
    }
    if (result.type == 'success') {
      setError(null);
      // Submit report: future work
    }
    setLoading(false);
  }

  const hasProduct = true;

  return hasProduct ? (
    <>
      <InlineLayout blockAlignment="center" spacing="base" padding="base" cornerRadius="base" border="dotted" columns={['20%', 'fill', '30%']}>
        <View>
          <Image border='base' cornerRadius='base' source={image?.url} />
        </View>
        <TextBlock>
          <Text size="base" emphasis="bold">{title}</Text>
          <BlockSpacer spacing="extraTight" />
          <Text size="base" emphasis="bold">{formattedPrice}</Text>
        </TextBlock>
        <View inlineAlignment='end'>
          <Button kind='primary' loading={loading} disabled={error} onPress={handleAddToCart} size="slim" fullWidth={true} > Add to cart</Button>
        </View>
      </InlineLayout>
      {/* display error if exist */}
      {error &&
        <View>
          <BlockSpacer spacing="extraTight" />
          <Banner status="info" padding="extraTight"> {error} </Banner>
        </View>
      }
    </>
  ) : (
    <InlineLayout blockAlignment="center" spacing="base" padding="base" cornerRadius="base" border="dotted" columns={['20%', 'fill', '20%']}>
      <View>
        <SkeletonImage inlineSize={100} blockSize={80} />
      </View>
      <TextBlock>
        <SkeletonTextBlock size="base" />
        <SkeletonText size="base" />
      </TextBlock>
      <View>
        <Button kind='primary' disabled='true' size="slim" fullWidth={true} > Add to cart</Button>
      </View>
    </InlineLayout>
  );

}
