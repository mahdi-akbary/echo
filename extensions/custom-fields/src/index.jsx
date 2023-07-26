import React, { useEffect, useState } from 'react';
import {
  render,
  useSettings,
  BlockStack,
  useMetafields,
  useApplyMetafieldsChange
} from '@shopify/checkout-ui-extensions-react';
import { GiftMessageField } from './giftMessage.jsx';
import { TermsField } from './terms.jsx';
import { DatePickerField } from './datePicker.jsx';
import { BirthdayField } from './birthday.jsx';

render('Checkout::Dynamic::Render', () => <App />);

function App () {
  const [type, setType] = useState()
  const { title, sub_title, custom_field_type, terms_url } = useSettings();

  useEffect(() => {
    setType(custom_field_type);
  })
  const metafields = useMetafields()
  const applyMetafieldsChange = useApplyMetafieldsChange()

  const handleUpdate = async (value) => {
    const result = await applyMetafieldsChange(value)
    if (result.type == "error") console.error(error)
    if (result.type == "success") console.info(result)
  };

  let markup = <GiftMessageField handleUpdate={handleUpdate} title={title} sub_title={sub_title} metafields={metafields} />

  switch (type) {
    case 'Agree to terms checkbox':
      markup = <TermsField handleUpdate={handleUpdate} title={title} sub_title={sub_title} url={terms_url} metafields={metafields} />
      break
    case 'Date picker':
      markup = <DatePickerField handleUpdate={handleUpdate} title={title} sub_title={sub_title} metafields={metafields} />
      break
    case 'Birthday':
      markup = <BirthdayField handleUpdate={handleUpdate} title={title} sub_title={sub_title} metafields={metafields} />
      break
  }

  return (
    <BlockStack spacing='base' blockAlignment='center'>
      {markup}
    </BlockStack>
  );
}
