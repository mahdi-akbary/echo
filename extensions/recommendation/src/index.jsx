import {useEffect, useState} from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  useSettings,
  InlineLayout,
  BlockLayout,
  View,
  TextBlock,
  Text,
  Image,
  Button,
  BlockSpacer,
  SkeletonImage,
  SkeletonTextBlock,
  SkeletonText,
  useTotalAmount,
  useApplyCartLinesChange,
  useCartLines,
} from '@shopify/checkout-ui-extensions-react';

import { getCountryCode } from './getCountryCode.jsx';
import { ProductCard } from './productCard.jsx';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const { query, i18n } = useExtensionApi();
  const [ error, setError ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ data, setData ] = useState();
  const { currencyCode } = useTotalAmount();
  const { title, recommendation_source, recommendation_algorithm, limit, show_variants, border } = useSettings();

  // If title is not set, use default title
  const bannerTitle = title || 'You may also like ';
  // lowercase the recommendation source
  const recommendationSource = recommendation_source == 'First line item ' ? 'first' : recommendation_source == 'Last line item ' ? 'last' : recommendation_source == 'Most expensive item' ? 'expensive' : recommendation_source == 'Least expensive item' ? 'cheap' : 'first';
  const recommendationAlgorithm = recommendation_algorithm == 'Related' ? 'RELATED' : 'RELATED';
  const recommendationLimit = limit || 2;
  const showVariants = show_variants == 'Yes' ? true : false;

  // Get the merchandise id from the first line item
  const cartLines = useCartLines();
  let recommendationSourceID = cartLines[0]?.merchandise?.product?.id; 

  if(recommendationSource == 'first') {
    recommendationSourceID = cartLines[0]?.merchandise?.product?.id;
  } else if(recommendationSource == 'last') {
    recommendationSourceID = cartLines[cartLines.length - 1]?.merchandise?.product?.id;
  } else if(recommendationSource == 'expensive') {
    let maxPrice = 0;
    let maxPriceIndex = 0;
    for(let i = 0; i < cartLines.length; i++) {
      if(cartLines[i].cost.totalAmount.amount > maxPrice) {
        maxPrice = cartLines[i].cost.totalAmount.amount;
        maxPriceIndex = i;
      }
    }
    recommendationSourceID = cartLines[maxPriceIndex]?.merchandise?.product?.id;
  } else if(recommendationSource == 'cheap') {
    let minPrice = cartLines[0].cost.totalAmount.amount;
    let minPriceIndex = 0;
      for(let i = 0; i < cartLines.length; i++) {
      if(cartLines[i].cost.totalAmount.amount < minPrice) {
        minPrice = cartLines[i].cost.totalAmount.amount;
        minPriceIndex = i;
      }
      
    }
    recommendationSourceID = cartLines[minPriceIndex]?.merchandise?.product?.id;
  }

  // userCountryCode is two letter currencyCode
  const userCountryCode = getCountryCode(currencyCode);

  // Use Shopify graphql to get the recommended products based on recommendationSourceID
  useEffect(() => {  
      query(
        `query Recommendations @inContext(country: ${ userCountryCode ?? 'US' }) {
          productRecommendations(intent: ${recommendationAlgorithm}, productId: "${ recommendationSourceID }") {
            title
            id
            priceRange{
              maxVariantPrice{
                amount
                currencyCode
              }
              minVariantPrice{
                amount
                currencyCode
              }
            }
            variants(first:20){
              edges{
                node{
                  id
                  title
                  price{
                    amount
                    currencyCode
                  }
                  image{
                    altText
                    url
                  }
                  availableForSale
                }
              }
            }
            featuredImage{
              url
              altText
            }
            availableForSale
            handle
          } 
        }`
      )
      .then(({data, errors}) => {
        setData(data);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }, [query]);
     

  let hasProduct = true; 
  if(data?.productRecommendations?.length == 0) {
    hasProduct = false;
  }
  // Return product list with limit
  let productList = data?.productRecommendations?.slice(0, recommendationLimit);

  return hasProduct ? (
      <>
          {/* Loop through productList and display */}
          <BlockLayout spacing="tight">
            {productList?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </BlockLayout>
         {/* display error if exist */}
         { error && 
            <View>
              <BlockSpacer spacing="extraTight" />
              <Banner status="info" padding="extraTight"> { error} </Banner>
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