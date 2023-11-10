import {
    HomeMajor,
    PaintBrushMajor,
    GiftCardMajor,
    BillingStatementDollarMajor,
    PlayCircleMajor,
    EmailNewsletterMajor,
  } from '@shopify/polaris-icons';

export const navStructure = [
    {
        label: "Dashboard",
        destination: "/",
        icon: HomeMajor
    },
    {
        label: "Branding",
        destination: "/branding",
        icon: PaintBrushMajor
    },
    {
        label: "Free gifts",
        destination: "/free-gifts",
        icon: GiftCardMajor
    },
    {
        label: "Pricing",
        destination: "/pricing",
        icon: BillingStatementDollarMajor
    },
    {
        label: "How to use",
        destination: "/how-to-use",
        icon: PlayCircleMajor

    },
    {
        label: "Contact us",
        destination: "/contact-us",
        icon: EmailNewsletterMajor
    }
];
