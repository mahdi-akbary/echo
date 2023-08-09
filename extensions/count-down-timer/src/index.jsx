import { useState, useEffect } from "react";
import { get, set, del } from "idb-keyval";
import {
  reactExtension,
  Banner,
  useSettings,
  Text,
  TextBlock,
  BlockSpacer,
  Heading
} from '@shopify/ui-extensions-react/checkout';

export default reactExtension("purchase.checkout.block.render", () => <App />);

function App() {
  const {
    title,
    countdown_message,
    countdown_message_after,
    time_start_at,
    reset_delay,
    status,
    alignment,
    fontsize,
    emphasis,
    classic,
  } = useSettings();

  const alignmentStyle = alignment ? alignment : "start";
  const fontSizeStyle = fontsize ? fontsize : "base";
  const emphasisStyle = emphasis ? emphasis : "base";
  const isClassic = classic ? classic : false;
  const statusStyle = status ? status : "info";

  const timeStartAt = time_start_at ? time_start_at : 10;
  const [countdown, setCountdown] = useState(timeStartAt * 60); // Initial countdown value in seconds

  useEffect(() => {
    const retrieveCountdown = async () => {
      // Retrieve the countdown value from IndexedDB when the component mounts
      const storedCountdown = await get("countdown");
      if (storedCountdown !== undefined) {
        setCountdown(storedCountdown);
      }
    };

    retrieveCountdown();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the countdown value every second
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(interval);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Store the countdown value in IndexedDB whenever it changes
    set("countdown", countdown);
  }, [countdown]);

  // When the countdown value reaches 0, wait x minutes, remove it from IndexedDB
  useEffect(() => {
    if (countdown === 0) {
      setTimeout(() => {
        del("countdown");
      }, reset_delay * 60 * 1000);
    }
  }, [countdown]);

  // Convert the countdown value to a string in the format m:ss
  const countdownString = `${Math.floor(countdown / 60)} minutes ${
    countdown % 60
  } seconds`;

  // if countdown_message is not empty then use it. Otherwise use the default message
  const message = countdown_message
    ? countdown_message
    : "🔥 Items in your cart are in high demand. No worries, we have reserved your order for $timer";

  // If isClassic true, then use Text component to display the message. Otherwise use Banner component
  return isClassic ? (
    <TextBlock inlineAlignment={alignmentStyle}>
      <Heading alignmentStyle={alignmentStyle}>
        {title ?? "Count down timer"}
      </Heading>
      <BlockSpacer spacing="extraTight" />
      {/* If countdown > 0 else show another message  */}
      {countdown > 0 ? (
        <Text
          size={fontSizeStyle}
          emphasis={emphasisStyle}
          appearance={statusStyle}
        >
          {message.replace("$timer", countdownString)}
        </Text>
      ) : (
        <Text
          size={fontSizeStyle}
          emphasis={emphasisStyle}
          appearance={statusStyle}
        >
          {" "}
          {countdown_message_after ??
            "You're out of time! Checkout now to avoid losing your order!"}
        </Text>
      )}
    </TextBlock>
  ) : (
    <Banner title={title ?? "Count down timer"} status={statusStyle}>
      {/* If countdown > 0 else show another message  */}
      {countdown > 0 ? (
        <Text
          size={fontSizeStyle}
          emphasis={emphasisStyle}
          appearance={statusStyle}
        >
          {message.replace("$timer", countdownString)}
        </Text>
      ) : (
        <Text
          size={fontSizeStyle}
          emphasis={emphasisStyle}
          appearance={statusStyle}
        >
          {" "}
          {countdown_message_after ??
            "You're out of time! Checkout now to avoid losing your order!"}
        </Text>
      )}
    </Banner>
  );
}
