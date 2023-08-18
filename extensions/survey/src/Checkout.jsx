import {
  reactExtension,
  BlockStack,
  View,
  Heading,
  Text,
  ChoiceList,
  Choice,
  Button,
  useStorage,
  useSettings,
  useApi,
} from '@shopify/ui-extensions-react/checkout';
import { useCallback, useEffect, useState } from 'react';
// Allow the attribution survey to display on the thank you page.
const thankYouBlock = reactExtension("purchase.thank-you.block.render", () => <Attribution />);
export { thankYouBlock };

const orderDetailsBlock = reactExtension("customer-account.order-status.block.render", () => <ProductReview />);
export { orderDetailsBlock };

const baseUrl = "https://laugh-wells-questionnaire-hormone.trycloudflare.com"
function Attribution () {
  const { sessionToken } = useApi();
  const [attribution, setAttribution] = useState('');
  const { survey_question, survey_option1, survey_option2, survey_option3, survey_option4 } = useSettings();

  const options = [
    { option: '1', option_name: survey_option1 || 'Facebook' },
    { option: '2', option_name: survey_option2 || 'Twitter' },
    { option: '3', option_name: survey_option3 || 'From a friend or family member' },
    { option: '4', option_name: survey_option4 || 'Tiktok' },
  ]
  const [loading, setLoading] = useState(false);  
  // Store into local storage if the attribution survey was completed by the customer.
  const [attributionSubmitted, setAttributionSubmitted] = useStorageState('attribution-submitted')

  async function handleSubmit () {
    // Simulate a server request
    setLoading(true);
    try {
      const token = await sessionToken.get();
      const selectedOption = options.find(option => option.option == attribution)
      const response = await fetch(`${baseUrl}/api/surveys`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedOption),
      });
      const data = await response.json();
      setLoading(false);
      setAttributionSubmitted(true)
    } catch (error) {
      console.error(error);
    }
  }

  // Hides the survey if the attribution has already been submitted
  if (attributionSubmitted.loading || attributionSubmitted.data === true) {
    return null;
  }

  return (
    <Survey title={survey_question || "How did you hear about us ?"} onSubmit={handleSubmit} loading={loading}>
      <ChoiceList
        name="sale-attribution"
        value={attribution}
        onChange={setAttribution}
      >
        <BlockStack>
          {options.map(option => <Choice key={option.option} id={option.option}>{option.option_name}</Choice>)}
        </BlockStack>
      </ChoiceList>
    </Survey>
  );
}

function ProductReview () {
  const { sessionToken } = useApi();
  const [productReview, setProductReview] = useState('');
  const [loading, setLoading] = useState(false);
  const { feedback_question, feedback_question_description, feedback_option1, feedback_option2, feedback_option3, feedback_option4 } = useSettings();
  const options = [
    { option: '5', option_name: feedback_option1 || 'Amazing! Very happy with it.' },
    { option: '4', option_name: feedback_option2 || "It's okay, I expected more." },
    { option: '3', option_name: feedback_option3 || "Eh. There are better options out there." },
    { option: '2', option_name: feedback_option4 || 'I regret the purchase.' },
  ]
  // Store into local storage if the product was reviewed by the customer.
  const [productReviewed, setProductReviewed] = useStorageState('product-reviewed')

  async function handleSubmit () {
    // Simulate a server requests
    setLoading(true);
    try {
      const token = await sessionToken.get();
      const selectedOption = options.find(option => option.option == productReview)
      const response = await fetch(`${baseUrl}/api/feedbacks`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedOption),
      });
      const data = await response.json();
      setLoading(false);
      setProductReviewed(true);
    } catch (error) {
      console.error(error);
    }
  }

  // Hides the survey if the product has already been reviewed
  if (productReviewed.loading || productReviewed.data) {
    return null;
  }

  return (
    <Survey
      title={feedback_question || "How do you like your purchase?"}
      description={feedback_question_description || "We would like to learn if you are enjoying your purchase."}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <ChoiceList
        name="product-review"
        value={productReview}
        onChange={setProductReview}
      >
        <BlockStack>
          {options.map(option => <Choice key={option.option} id={option.option}>{option.option_name}</Choice>)}
        </BlockStack>
      </ChoiceList>
    </Survey>
  );
}

function Survey ({
  title,
  description,
  onSubmit,
  children,
  loading,
}) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit () {
    await onSubmit();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <View border="base" padding="base" borderRadius="base">
        <BlockStack>
          <Heading>Thanks for your feedback!</Heading>
          <Text>Your response has been submitted</Text>
        </BlockStack>
      </View>
    );
  }

  return (
    <View border="base" padding="base" borderRadius="base">
      <BlockStack>
        <Heading>{title}</Heading>
        <Text>{description}</Text>
        {children}
        <Button kind="secondary" onPress={handleSubmit} loading={loading}>
          Submit feedback
        </Button>
      </BlockStack>
    </View>
  );
}

/**
 * Returns a piece of state that is persisted in local storage, and a function to update it.
 * The state returned contains a `data` property with the value, and a `loading` property that is true while the value is being fetched from storage.
 */
function useStorageState (key) {
  const storage = useStorage();
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function queryStorage () {
      const value = await storage.read(key)
      setData(value);
      setLoading(false)
    }

    queryStorage();
  }, [setData, setLoading, storage, key])

  const setStorage = useCallback((value) => {
    storage.write(key, value)
  }, [storage, key])

  return [{ data, loading }, setStorage]
}
