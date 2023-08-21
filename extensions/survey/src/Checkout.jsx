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
// Allow the attribution survey to display on the thank you page.
const thankYouBlock = reactExtension("purchase.thank-you.block.render", () => (
  <Attribution />
));
export { thankYouBlock };

const baseUrl = "https://laugh-wells-questionnaire-hormone.trycloudflare.com";
function Attribution() {
  const { sessionToken } = useApi();
  const [attribution, setAttribution] = useState("");
  const {
    question,
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
    { key: "10", option_name: option10 },
    { key: "9", option_name: option9 },
    { key: "8", option_name: option8 },
    { key: "7", option_name: option7 },
    { key: "6", option_name: option6 },
    { key: "5", option_name: question ? option5 : "Youtube" },
    { key: "4", option_name: question ? option4 : "Tiktok" },
    {
      key: "3",
      option_name: question ? option3 : "From a friend or family member",
    },
    { key: "2", option_name: question ? option2 : "Twitter" },
    { key: "1", option_name: question ? option1 : "Facebook" },
  ];
  const [loading, setLoading] = useState(false);
  // Store into local storage if the attribution survey was completed by the customer.
  const [attributionSubmitted, setAttributionSubmitted] = useStorageState(
    "attribution-submitted"
  );

  async function handleSubmit() {
    // Simulate a server request
    setLoading(true);
    try {
      const token = await sessionToken.get();
      const selectedOption = options.find(
        (option) => option.key == attribution
      );
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
      setAttributionSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  }

  // Hides the survey if the attribution has already been submitted
  if (attributionSubmitted.loading || attributionSubmitted.data === true) {
    return null;
  }

  return (
    <Survey
      title={question || "How did you hear about us ?"}
      onSubmit={handleSubmit}
      loading={loading}
    >
      <ChoiceList
        name="sale-attribution"
        value={attribution}
        onChange={setAttribution}
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

function Survey({ title, description, onSubmit, children, loading }) {
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
          Submit feedback
        </Button>
      </BlockStack>
    </View>
  );
}

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
