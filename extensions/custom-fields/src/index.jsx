import React, { useState } from 'react';
import { useExtensionApi, render, useSettings, InlineStack, Checkbox, Text, Select, DatePicker, TextField, BlockStack } from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

const datePickerType = { key: 'Date picker', defaultTitle: 'Select your delivery date' };
const aggreeToTermsCheckboxType = { key: 'Aggree to terms checkbox', defaultTitle: 'I agree to the terms of service and privacy policy.' };
const birthDayType = { key: 'Birthday', defaultTitle: 'Add your birthday for a future discount! 🎉' };
const giftMessage = { key: 'Gift message', defaultTitle: 'Add gift message' };

function App () {
  const { extensionPoint } = useExtensionApi();
  const { title, sub_title, custom_field_type } = useSettings();

  const htmlDecode = (input) => {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  const handleToggle = () => { };
  const handleChange = () => { };

  const handleGetYears = () => {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 20)).fill('').map((v, idx) => ({value: now - idx, label: now - idx}));

  }


  const messageMarkup = custom_field_type === giftMessage.key || !custom_field_type ?
    <>
      <Checkbox id='customFieldHandle' name='customFieldHandle' onChange={handleToggle}>
        {title || giftMessage.defaultTitle}
      </Checkbox>
      {sub_title ? <Text size='small'>{sub_title}</Text> : null}
      <TextField multiline="5" label="Message..." maxLength="250" onChange={handleChange} />
    </>
    : null

  const checkboxMarkup = custom_field_type === aggreeToTermsCheckboxType.key ?
    <>
      <Checkbox multiline="3" label="Message..." maxLength="250" onChange={handleChange} >
        <span dangerouslySetInnerHTML={{ __html: htmlDecode(title || type.defaultTitle) }} />
      </Checkbox>
      {sub_title ? <Text size='small'>{sub_title}</Text> : null}
    </>
    : null

  const datePickerMarkup = custom_field_type === datePickerType.key ?
    <>
      <Checkbox id='customFieldHandle' name='customFieldHandle' onChange={handleToggle}>
        {title || datePickerType.defaultTitle}
      </Checkbox>
      {sub_title ? <Text size='small'>{sub_title}</Text> : null}
      <DatePicker selected="2021-06-01" onChange={handleChange} />
    </>
    : null

  const birthdayMarkup = custom_field_type === birthDayType.key || true ?
    <>
      <Checkbox id='customFieldHandle' name='customFieldHandle' onChange={handleToggle}>
        {title || birthDayType.defaultTitle}
      </Checkbox>
      {sub_title ? <Text size='small'>{sub_title}</Text> : null}
      <Select
        label="Year"
        options={handleGetYears()}
      />
    </>
    : null


  return (
    <BlockStack spacing='base' blockAlignment='center'>
      {messageMarkup}
      {checkboxMarkup}
      {datePickerMarkup}
      {birthdayMarkup}
    </BlockStack>
  );
}
