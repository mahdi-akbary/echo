import {
    Checkbox,
    Text,
    TextField
} from "@shopify/ui-extensions-react/checkout";
import { useEffect, useState } from "react";

export function GiftMessageField ({ title, sub_title, handleUpdate, metafields }) {
    const key = 'gift_message'
    const storedValue = metafields?.find(meta => meta?.key == key)?.value

    const DEFAUTL_TITIE = 'Add gift message'
    const [isChecked, setIsChecked] = useState(false)
    const [isToggled, setIsToggled] = useState(false)

    const handleToggle = () => {
        setIsToggled(true)
        setIsChecked(!isChecked)
    };

    useEffect(() => {
        if (storedValue && !isToggled) {
            setIsChecked(true)
        }
    })
    const handleChange = (value) => {
        handleUpdate({
            type: 'updateMetafield',
            key: key,
            namespace: 'messages',
            value: value,
            valueType: 'string'
        })
    }

    const messageInputMarkup = isChecked ? <TextField multiline="5" label="Message..." maxLength="250" value={storedValue} onChange={handleChange} /> : null
    return <>
        <Checkbox id='customFieldHandle' name='customFieldHandle' value={isChecked} onChange={handleToggle}>
            {title || DEFAUTL_TITIE}
        </Checkbox>
        {sub_title ? <Text size='small'>{sub_title}</Text> : null}
        {messageInputMarkup}
    </>
}
