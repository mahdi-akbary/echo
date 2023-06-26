// ProductCart is a component that renders a product card. It accept a product object as a prop.
import {
    Checkbox,
    InlineLayout,
    Select,
    Text,
    View
} from "@shopify/checkout-ui-extensions-react";
import { useState } from "react";

export function BirthdayField ({ title, sub_title, key, handleUpdate, metafields }) {

    const KEY = 'Birthday'
    const DEFAUTL_TITIE = 'Add your birthday for a future discount! 🎉'
    const [isChecked, setIsChecked] = useState(false)

    const handleToggle = () => {
        console.log(metafields)
        setIsChecked(!isChecked)
    };

    const handleChange = (date) => {
        handleUpdate({
            type: 'updateMetafield',
            key: 'birth_date',
            namespace: 'facts',
            value: date,
            valueType: 'string'
        })
    }

    const [year, setYear] = useState(null)
    const [month, setMonth] = useState(null)
    const [day, setDay] = useState(null)
    const [days, setDays] = useState([])
    const handleGetYears = () => {
        const now = new Date().getUTCFullYear();
        return [
            { value: 'Select a year', label: 'Select a year', disabled: true },
            ...Array(now - (now - 100)).fill('').map((v, i) => ({ value: now - i, label: now - i }))
        ];

    }

    const monthNames = [
        { value: 'Select a month', label: 'Select a month', disabled: true },
        ...["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ].map((month, i) => ({ value: i, label: month }))
    ];


    const handleSetDays = (month) => {
        setMonth(month)
        const max = new Date(year, month, 0).getDate()
        setDays([
            { value: 'Select a day', label: 'Select a day', disabled: true },
            ...Array(max - (max - max)).fill('').map((v, i) => ({ value: i + 1, label: i + 1 }))
        ])
        if (day >= 0 && day !== null)
            handleChange(`${year}-${+month + 1}-${day}`)
    }

    const handleSetDay = (day) => {
        setDay(day);
        handleChange(`${year}-${+month + 1}-${day}`)
    }
    const handleSetYear = (year) => {
        setYear(year);
        if (month >= 0 && day >= 0 && day !== null)
            handleChange(`${year}-${+month + 1}-${day}`)
    }
    const datePickerMarkup = isChecked ?
        <InlineLayout columns={['30%', '30%', '30%']} spacing='base'>
            <View padding="none" inlineSize='fill'>
                <Select
                    {...(year ? { value: year } : {})}
                    onChange={handleSetYear}
                    label="Year"
                    options={handleGetYears()}
                />
            </View>
            <View padding="none">
                <Select
                    {...(month ? { value: month } : {})}
                    onChange={handleSetDays}
                    label="Month"
                    options={year ? monthNames : []}
                />
            </View>
            <View padding="none">
                <Select
                    {...(day ? { value: day } : {})}
                    onChange={handleSetDay}
                    label="Day"
                    options={days}
                />
            </View>
        </InlineLayout> : null

    return KEY == key || true ?
        <>
            <Checkbox id='birthDaycheckboxHandle' name='birthDaycheckboxHandle' onChange={handleToggle}>
                {title || DEFAUTL_TITIE}
            </Checkbox>
            {sub_title ? <Text size='small'>{sub_title}</Text> : null}
            {datePickerMarkup}
        </> : null
}
