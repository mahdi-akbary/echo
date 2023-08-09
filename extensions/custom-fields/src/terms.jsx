import {
    Checkbox,
    Icon,
    InlineStack,
    Link,
    Text
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";

export function TermsField ({ title, sub_title, handleUpdate, url, metafields }) {

    const key = 'terms'
    const storedValue = metafields?.find(meta => meta?.key == key)?.value
    
    const [value, setValue] = useState(!!(+storedValue))
    const DEFAUTL_TITIE = 'I agree to the terms of service and privacy policy.'

    const handleChange = (value) => {
        handleUpdate({
            type: 'updateMetafield',
            key: 'terms',
            namespace: 'terms_and_policy',
            value: +value,
            valueType: 'integer',
        })
        setValue(value)
    }

    return <>
        <Checkbox onChange={handleChange} value={value}>
            <InlineStack spacing='none'>
                {title || DEFAUTL_TITIE}
                <Link to={url} > <Icon source='arrowUpRight' /></Link>
            </InlineStack>
        </Checkbox>
        {sub_title ? <Text size='small'>{sub_title}</Text> : null}
    </>
}
