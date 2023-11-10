import { ActionList, Icon } from "@shopify/polaris";
import {
    FormsMajor,
    TickSmallMinor,
    HeaderMajor,
    ColorsMajor,
    ThemeEditMajor,
    TypeMinor,
    TemplateMinor,
    OrderStatusMinor,
    BuyButtonButtonLayoutMajor,
    SidebarRightMajor,
    TitleMinor
} from '@shopify/polaris-icons';

export function BrandingOptionList ({ selected, setSelected }) {

    const optionList = [
        {
            title: "Default Design",
            items: [
                { content: 'Global colors', icon: ColorsMajor, active: true, },
                { content: 'Scheme 1', icon: ThemeEditMajor },
                { content: 'Scheme 2', icon: ThemeEditMajor },
                { content: 'Typography', icon: TypeMinor },
            ],
        },
        {
            title: "Customize UI",
            items: [
                { content: 'Global typography', icon: TypeMinor },
                { content: 'Header', icon: HeaderMajor },
                { content: 'Main', icon: BuyButtonButtonLayoutMajor },
                { content: 'Order Summary', icon: SidebarRightMajor },
                { content: 'Forms', icon: FormsMajor },
                { content: 'Headings', icon: TitleMinor },
            ],
        },
        {
            title: 'Pre-defined Templates',
            items: [
                { content: 'Coming soon...', icon: TemplateMinor },
            ],
        },
    ]
    return (
        <ActionList
            actionRole="menuitem"
            sections={optionList.map((option, index) => {
                return {
                    title: option.title,
                    items: option.items.map(optionItem => {

                        const slug = optionItem.content?.replace(' ', '-')?.toLowerCase()
                        return {
                            content: optionItem.content,
                            icon: optionItem.icon,
                            active: selected === slug,
                            suffix: selected === slug ? <Icon source={TickSmallMinor} /> : null,
                            onAction: () => {
                                setSelected(slug)
                                console.log(selected, slug)
                            }
                        }
                    })
                }
            })}
        />
    )
}



{/* <Text as="h3" variant="headingMd">
                                Color
                            </Text>
                            <Text as='p' variant="bodyMd">
                                A way of making the checkout page look nice and easy to use. You can change the colors, fonts, and shapes of the things on the page. 
                            </Text> */}
