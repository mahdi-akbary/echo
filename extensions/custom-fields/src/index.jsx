import React, { useState } from 'react';
import {
  useExtensionApi,
  render,
  useSettings,
  InlineStack,
  Checkbox,
  Text, Select, TextField, BlockStack, View, InlineLayout, Button, Icon, Popover, Pressable, Link, useMetafields, useApplyMetafieldsChange
} from '@shopify/checkout-ui-extensions-react';
import { GiftMessageField } from './giftMessage.jsx';
import { TermsField } from './terms.jsx';
import { DatePickerField } from './datePicker.jsx';
import { BirthdayField } from './birthday.jsx';

render('Checkout::Dynamic::Render', () => <App />);


function App () {
  const { extensionPoint } = useExtensionApi();
  const { title, sub_title, custom_field_type, terms_url } = useSettings();

  const metafields = useMetafields()
  const applyMetafieldsChange = useApplyMetafieldsChange()

  const handleToggle = () => {
    console.log(metafields)
  };
  const handleUpdate = async (value) => {
    // await applyMetafieldsChange({
    //   type: 'updateMetafield',
    //   key: 'birth_date',
    //   namespace: 'facts',
    //   value: '',
    //   valueType: 'string'


    // })

    const result = await applyMetafieldsChange(value)

    if (result.type == "error") {
      // setError(result.message);
      // setLoading(false);
      console.log(result)
    }
    if (result.type == "success") {
      // setError(null);
      // setLoading(false);
      console.log(result)
    }
  };

  const messageMarkup = <GiftMessageField key={custom_field_type} handleUpdate={handleUpdate} title={title} sub_title={sub_title} metafields={metafields} />

  const checkboxMarkup = <TermsField key={custom_field_type} handleUpdate={handleUpdate} title={title} sub_title={sub_title} url={terms_url} metafields={metafields} />

  const datePickerMarkup = <DatePickerField key={custom_field_type} handleUpdate={handleUpdate} title={title} sub_title={sub_title} metafields={metafields} />

  const birthdayMarkup = <BirthdayField key={custom_field_type} handleUpdate={handleUpdate} title={title} sub_title={sub_title} metafields={metafields} />

  return (
    <BlockStack spacing='base' blockAlignment='center'>
      {messageMarkup}
      {checkboxMarkup}
      {datePickerMarkup}
      {birthdayMarkup}
    </BlockStack>
  );
}
