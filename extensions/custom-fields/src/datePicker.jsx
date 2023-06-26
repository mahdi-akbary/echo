// ProductCart is a component that renders a product card. It accept a product object as a prop.
import {
    DatePicker,
    Popover,
    Pressable,
    Text,
    TextField,
    View
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function DatePickerField ({ title, sub_title, key, handleUpdate, metafields }) {
    const KEY = 'Date picker'
    const DEFAUTL_TITIE = 'Select your delivery date'
    const DEFAUTL_SUBTITIE = 'Note: Normally on the shipping step but moved here for demo purposes. 😉'
    const [date, setDate] = useState(null)

    const [isPicker, setIsPicked] = useState(false)

    const handleChange = (value) => {
        setIsPicked(true)
        setDate(value)
        handleUpdate({
            type: 'updateMetafield',
            key: 'picked_date',
            namespace: 'dates',
            value: value,
            valueType: 'string'
        })
        setIsPicked(false)
    }

    return KEY == key || true ?
        <>
            <Text size="large">
                {title || DEFAUTL_TITIE}
            </Text>
            <Text size='small'>{sub_title || DEFAUTL_SUBTITIE}</Text>
            <Pressable border="base" cornerRadius="base"
                overlay={
                    isPicker ? null :
                        <Popover position="blockEnd">
                            <View maxInlineSize={300} padding="base" >
                                <DatePicker selected={new Date().toISOString()} onChange={handleChange} />
                            </View>
                        </Popover>
                }
            >
                <TextField icon='calendar' label="Select date" value={date} />
            </Pressable>
        </> : null
}
