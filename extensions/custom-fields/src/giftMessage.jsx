// ProductCart is a component that renders a product card. It accept a product object as a prop.
import {
    Checkbox,
    Text,
    TextField
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function GiftMessageField ({ title, sub_title, key, handleUpdate, metafields }) {

    const KEY = 'Gift message'
    const DEFAUTL_TITIE = 'Add gift message'
    const [isChecked, setIsChecked] = useState(false)
    const handleToggle = () => {
        console.log(metafields)
        setIsChecked(!isChecked)
    };

    const handleChange = (value) => {
        console.log(value)
        handleUpdate({
            type: 'updateMetafield',
            key: 'gift_message',
            namespace: 'messages',
            value: value,
            valueType: 'string'
        })
    }

    const messageInputMarkup = isChecked ? <TextField multiline="5" label="Message..." maxLength="250" onChange={handleChange} /> : null
    return KEY == key || !key ?
        <>
            <Checkbox id='customFieldHandle' name='customFieldHandle' onChange={handleToggle}>
                {title || DEFAUTL_TITIE}
            </Checkbox>
            {sub_title ? <Text size='small'>{sub_title}</Text> : null}
            {messageInputMarkup}
        </> : null
}
