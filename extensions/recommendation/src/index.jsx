import {useEffect, useState} from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  useSettings,
  InlineLayout,
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
  const recommendationAlgorithm = recommendation_algorithm == 'Related' ? 'RELATED' : 'COMPLEMENTARY';
  const recommendationLimit = limit || 3;
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

  console.log('recommendationSourceID', recommendationAlgorithm);

  // Use Shopify graphql to get the recommended products based on recommendationSourceID


  useEffect(() => {  
      query( 
        `query Recommendations {
          productRecommendations( intend: ${ recommendationAlgorithm }, productId: "${ recommendationSourceID }") {
            title
            id
            variants(first:20){
              edges{
                node{
                  id
                  title
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

  console.log('data', data);
     

  const applyCartLinesChange = useApplyCartLinesChange();
  async function handleAddToCart() {
    setLoading(true);
    const newCartLines = { 
        type: 'addCartLine',
        merchandiseId: merchandiseId,
        quantity: 1,
      };

    const result = await applyCartLinesChange(newCartLines);
    if(result.type == 'error') {
      setError(result.message);
    }
    if(result.type == 'success') {
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
         
          </View>
          <TextBlock>
            <Text size="base" emphasis="bold">{ title }</Text>
            <BlockSpacer spacing="extraTight" />
            {/* <Text size="base" emphasis="bold">{ formattedPrice }</Text> */}
          </TextBlock>
          <View inlineAlignment='end'> 
            <Button kind='primary' loading={loading} disabled={error} onPress={handleAddToCart} size="slim" fullWidth={true} > Add to cart</Button>
          </View>
        </InlineLayout>
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