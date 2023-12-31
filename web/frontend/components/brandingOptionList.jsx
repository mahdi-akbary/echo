import { ActionList, Icon } from "@shopify/polaris";
import {
    FormsMajor,
    TickSmallMinor,
    HeaderMajor,
    ColorsMajor,
    ThemeEditMajor,
    TypeMinor,
    TemplateMinor,
    ButtonCornerRoundedMajor,
    BuyButtonButtonLayoutMajor,
    SidebarRightMajor,
    TitleMinor,
    IconsMajor
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
                { content: 'Corner radius', icon: ButtonCornerRoundedMajor },
            ],
        },
        {
            title: "Customize UI",
            items: [
                { content: 'Global', icon: TypeMinor },
                { content: 'Favicon', icon: IconsMajor },
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
                { content: 'Template 1', icon: TemplateMinor },
                { content: 'Template 2', icon: TemplateMinor },
                { content: 'Template 3', icon: TemplateMinor },
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
                            }
                        }
                    })
                }
            })}
        />
    )
}
