import {useEffect, useState} from 'react';
import {
  useSettings,
  BlockLayout,
  useTotalAmount,
  useCartLines,
  Heading,
  BlockSpacer,
  Grid,
  useApi,
  reactExtension
} from "@shopify/ui-extensions-react/checkout";

import { getCountryCode } from './getCountryCode.jsx';
import { ProductCard } from './productCard.jsx';
import { ProductList } from './productList.jsx';
const BASE_URL = 'https://checkout-plus.fly.dev'

export default reactExtension("purchase.checkout.block.render", () => <App />);

function App() {
  const { query } = useApi();
  const [ data, setData ] = useState();
  const { currencyCode } = useTotalAmount();
  const { title, recommendation_source, recommendation_algorithm, limit, layout, grids } = useSettings();

  // If title is not set, use default title
  const bannerTitle = title || 'You may also like ';
  // lowercase the recommendation source
  const recommendationSource = recommendation_source == 'First line item ' ? 'first' : recommendation_source == 'Last line item ' ? 'last' : recommendation_source == 'Most expensive item' ? 'expensive' : recommendation_source == 'Least expensive item' ? 'cheap' : 'first';
  const recommendationAlgorithm = recommendation_algorithm == 'Related' ? 'RELATED' : 'RELATED';
  const recommendationLimit = limit ? limit : 2;
  const recommendationLayout = layout == 'Grids' ? 'grids' : 'rows';
  const gridLayout = grids == '1 column' ? ['fill'] : grids == '2 columns' ? ['fill', 'fill'] : grids == '3 columns' ? ['fill', 'fill', 'fill'] : ['fill', 'fill', 'fill'];

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
        console.error('error: ', error);
      });
  }, [query]);
     

  // filter out products that are not available for sale and already in cart
  const cartProductIDs = cartLines.map((cartLine) => {
    return cartLine.merchandise.product.id;
  });

  let productList = data?.productRecommendations?.filter((product) => {
    return product.availableForSale && !cartProductIDs.includes(product.id);
  });

  // Return product list with limit
  productList = productList?.slice(0, recommendationLimit);

  let hasProduct = true; 
  if(productList?.length == 0) {
    hasProduct = false;
  }

  return hasProduct ? ( 
      <>
          <Heading>{ bannerTitle }</Heading>
          <BlockSpacer />
          { recommendationLayout == 'grids' ? 
            <Grid spacing="tight" columns={gridLayout}>
              { productList?.map((product) => {
                return (
                    <ProductList 
                      key={product.id}
                      product={product}
                    />
                );
               }
              )}
            </Grid> 
            :
            <BlockLayout spacing="tight" rows="auto" columns="1fr">
              { productList?.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    baseUrl={BASE_URL}
                  />
                );
                }
              )}
            </BlockLayout>
          }
         
      </>
      ) : null;
}
