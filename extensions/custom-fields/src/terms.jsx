// ProductCart is a component that renders a product card. It accept a product object as a prop.
import {
    Checkbox,
    Icon,
    InlineStack,
    Link,
    Text
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function TermsField ({ title, sub_title, key, handleUpdate, url, metafields }) {

    const KEY = 'Aggree to terms checkbox'
    const DEFAUTL_TITIE = 'I agree to the terms of service and privacy policy.'

    const handleChange = (value) => {
        handleUpdate({
            type: 'updateMetafield',
            key: 'terms',
            namespace: 'terms_and_policy',
            value: +value,
            valueType: 'integer',
        })
    }

    return KEY == key || true ?
        <>
            <Checkbox onChange={handleChange} >
                <InlineStack spacing='none'>
                    {title || DEFAUTL_TITIE}
                    <Link to={url} > <Icon source='arrowUpRight' /></Link>
                </InlineStack>
            </Checkbox>
            {sub_title ? <Text size='small'>{sub_title}</Text> : null}
        </> : null
}
