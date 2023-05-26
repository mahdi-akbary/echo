import React, {useEffect, useState} from 'react';

import {
  render,
  InlineLayout,
  View,
  useCartLines,
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
  useCurrency,
  BlockSpacer,
} from '@shopify/checkout-ui-extensions-react';

import { getCountryCode } from './getCountryCode.jsx';

render('Checkout::Dynamic::Render', () => <App />);

function App() {

  const { i18n, query, localization } = useExtensionApi();
  const [ data, setData ] = useState();
  const { upsell_product } = useSettings();
  const variantId = upsell_product ? upsell_product : 'gid://shopify/ProductVariant/44638843535640';
  const { amount, currencyCode } = useTotalAmount();

  // userCountryCode is two letter currencyCode
  const userCountryCode = getCountryCode(currencyCode);

  useEffect(() => {
      query(
        `query GetProductVariant($variantId: ID!) @inContext(country: ${ userCountryCode ?? 'US' })  {
          node(id: $variantId) {
            ... on ProductVariant {
              id
              title
              availableForSale
              price{
                amount
                currencyCode
              }
              product{
                title
                featuredImage{
                  url
                }
                variants(first:20){
                  edges{
                    node{
                      id
                      title
                    }
                  }
                }
              }
              image{
                altText, 
                url
              }
              
            }
          }
        }`,
        {
          variables: { variantId: variantId }, 
        }
      )
      .then(({data, errors}) => {
        setData(data);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }, [query]);

  let  title = data?.node?.product.title;
  let  image  = data?.node.image ? data?.node.image : data?.node?.product?.featuredImage;
  let  price  = data?.node?.price?.amount;
  let  compareAtPrice  = data?.node?.compareAtPrice?.amount;
  let  variant_id = data?.node?.id.split('/').pop();

  let  formattedPrice = i18n.formatCurrency(price, { currencyCode: currencyCode });

  // let selectedVariant = data?.node?.product?.variants?.edges?.find(({node}) => node.id === variantId);
  let variants = data?.node?.product?.variants?.edges;

  const { addItem } = useCartLines();


  const handleAddToCart = () => {
    // addItem({
    //   variantId: variant_id,
    //   quantity: 1,

    // });
    console.log('add to cart', formattedPrice);
    console.log('Local: ', localization);
    console.log('totalAmount: ', currencyCode);
  };

  
  const hasProduct = true;

  return hasProduct ? (
      <InlineLayout blockAlignment="center" spacing="base" padding="base" cornerRadius="base" border="dotted" columns={['20%', 'fill', '30%']}>
       <View>
         <Image border='base' cornerRadius='base' source={ image?.url }/>
        </View>
        <TextBlock>
          <Text size="base" emphasis="bold">{ title }</Text>
          <BlockSpacer spacing="extraTight" />
          <Text size="base" emphasis="bold">{ formattedPrice }</Text>
        </TextBlock>
        <View inlineAlignment='end'> 
          <Button kind='primary' onPress={handleAddToCart} size="slim" fullWidth={true} > Add to cart</Button>
        </View>
      </InlineLayout>
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
