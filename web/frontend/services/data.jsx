import {
    HomeMajor,
    PaintBrushMajor,
    BillingStatementDollarMajor,
    PlayCircleMajor,
    EmailNewsletterMajor,
    CodeMajor
  } from '@shopify/polaris-icons';

export const navStructure = [
    {
        label: "Dashboard",
        destination: "/",
        icon: HomeMajor
    },
    {
        label: "Functions",
        destination: "/functions",
        icon: CodeMajor
    },
    {
        label: "Branding",
        destination: "/branding",
        icon: PaintBrushMajor
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
