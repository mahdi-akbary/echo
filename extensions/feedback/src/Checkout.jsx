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
} from "@shopify/ui-extensions-react/checkout";
import { useCallback, useEffect, useState } from "react";

const orderDetailsBlock = reactExtension(
  "customer-account.order-status.block.render",
  () => <ProductReview />
);
export { orderDetailsBlock };

const baseUrl = "https://checkout-plus.fly.dev";
function ProductReview() {
  const { sessionToken } = useApi();
  const [productReview, setProductReview] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    question,
    question_description,
    submitText,
    option1,
    option2,
    option3,
    option4,
    option5,
    option6,
    option7,
    option8,
    option9,
    option10,
  } = useSettings();
  const options = [
    { key: "1", option_name: option1 },
    { key: "2", option_name: option2 },
    { key: "3", option_name: option3 },
    { key: "4", option_name: option4 },
    { key: "5", option_name: option5 },
    { key: "6", option_name: option6 },
    { key: "7", option_name: option7 },
    { key: "8", option_name: option8 },
    { key: "9", option_name: option9 },
    { key: "10", option_name: option10 },
  ];
  // Store into local storage if the product was reviewed by the customer.
  const [productReviewed, setProductReviewed] =
    useStorageState("product-reviewed");

  async function handleSubmit() {
    // Simulate a server requests
    setLoading(true);
    try {
      const token = await sessionToken.get();
      const selectedOption = options.find(
        (option) => option.key == productReview
      );
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
      title={question || "How do you like your purchase?"}
      description={
        question_description ||
        "We would like to learn if you are enjoying your purchase."
      }
      onSubmit={handleSubmit}
      loading={loading}
      submitText={submitText}
    >
      <ChoiceList
        name="product-review"
        value={productReview}
        onChange={setProductReview}
      >
        <BlockStack>
          {options.map((option) =>
            option.option_name ? (
              <Choice key={option.key} id={option.key}>
                {option.option_name}
              </Choice>
            ) : null
          )}
        </BlockStack>
      </ChoiceList>
    </Survey>
  );
}

function Survey({ title, description, onSubmit, children, loading, submitText }) {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
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
          {submitText ?? 'Submit feedback'}
        </Button>
      </BlockStack>
    </View>
  );
}

/**
 * Returns a piece of state that is persisted in local storage, and a function to update it.
 * The state returned contains a `data` property with the value, and a `loading` property that is true while the value is being fetched from storage.
 */
function useStorageState(key) {
  const storage = useStorage();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function queryStorage() {
      const value = await storage.read(key);
      setData(value);
      setLoading(false);
    }

    queryStorage();
  }, [setData, setLoading, storage, key]);

  const setStorage = useCallback(
    (value) => {
      storage.write(key, value);
    },
    [storage, key]
  );

  return [{ data, loading }, setStorage];
}
