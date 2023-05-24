import {useState, useEffect } from 'react';
import { get, set } from 'idb-keyval';

import {
  useExtensionApi,
  render,
  Banner,
  useTranslate,
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {

  const [countdown, setCountdown] = useState(600); // Initial countdown value in seconds

  useEffect(() => {
    const retrieveCountdown = async () => {
      // Retrieve the countdown value from IndexedDB when the component mounts
      const storedCountdown = await get('countdown');
      if (storedCountdown !== undefined) {
        setCountdown(storedCountdown);
      }
    };

    retrieveCountdown();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the countdown value every second
      setCountdown(prevCountdown => {
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
    set('countdown', countdown);
  }, [countdown]);

  // Reset the countdown to 10 minutes when it reaches 0 after waiting 5 minutes
  useEffect(() => {
    if (countdown === 0) {
      setTimeout(() => {
        setCountdown(600);
      }, 20000);
    }
  }, [countdown]);
  

  // Convert the countdown value to a string in the format m:ss
  const countdownString = `${Math.floor(countdown / 60)} minutes ${countdown % 60} seconds`;

  return (
    <Banner title="Count-down-timer">
      counter value: {countdownString}
    </Banner>
  );
}