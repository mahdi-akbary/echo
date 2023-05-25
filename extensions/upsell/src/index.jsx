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
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {

  const [ data, setData ] = useState();
  const { query } = useExtensionApi();

  const { upsell_product } = useSettings();
  const variantId = upsell_product ? upsell_product : 'gid://shopify/ProductVariant/45326287831320';

  useEffect(() => {
      query(
        `query GetProductVariant($variantId: ID!) {
          node(id: $variantId) {
            ... on ProductVariant {
              id
              title
              availableForSale
              price{
                amount
                currencyCode
              }
              compareAtPrice{
                 amount
                 currencyCode
              }
              product{
                title
                featuredImage{
                  url
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
  let variant_id = data?.node?.id.split('/').pop();

  const { addItem } = useCartLines();

  const handleAddToCart = () => {
    addItem({
      variantId: variant_id,
      quantity: 1,
    });
  };
  
  const hasProduct = false;

  return hasProduct ? (
      <InlineLayout>
        <View></View>
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
          <Button kind='primary' disabled='true' onPress={handleAddToCart} size="slim" fullWidth={true} > Add to cart</Button>
        </View>
      </InlineLayout>
    );
  
}
