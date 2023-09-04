import {
    DatePicker,
    Popover,
    Pressable,
    Text,
    TextField,
    View
} from "@shopify/ui-extensions-react/checkout";
import { useState } from "react";

export function DatePickerField ({ title, sub_title, handleUpdate, metafields }) {
    const key = 'picked_date'
    const storedValue = metafields?.find(meta => meta?.key == key)?.value

    const DEFAUTL_TITIE = 'Select your delivery date'
    const [date, setDate] = useState(storedValue)

    const [isPicker, setIsPicked] = useState(false)

    const handleChange = (value) => {
        setIsPicked(true)
        setDate(value)
        handleUpdate({
            type: 'updateMetafield',
            key: key,
            namespace: 'dates',
            value: value,
            valueType: 'string'
        })
        setIsPicked(false)
    }

    return <>
        <Text size="large">
            {title || DEFAUTL_TITIE}
        </Text>
        {sub_title ? <Text size='small'>{sub_title}</Text> : null}
        <Pressable border="base" cornerRadius="base"
            overlay={
                isPicker ? null :
                    <Popover position="blockEnd">
                        <View maxInlineSize={300} padding="base" >
                            <DatePicker selected={storedValue ? storedValue : new Date().toISOString()} onChange={handleChange} />
                        </View>
                    </Popover>
            }
        >
            <TextField icon='calendar' label="Select date" value={date} />
        </Pressable>
    </>
}
