// Create a function that returns the country code based on currency code
//
export function  getCountryCode(currencyCode) {
    const countryCodeMap = {
        AED: 'AE',
        AFN: 'AF',
        ALL: 'AL',
        AMD: 'AM',
        ANG: 'CW',
        AOA: 'AO',
        ARS: 'AR',
        AUD: 'AU',
        AWG: 'AW',
        AZN: 'AZ',
        BAM: 'BA',
        BBD: 'BB',
        BDT: 'BD',
        BGN: 'BG',
        BHD: 'BH',
        BIF: 'BI',
        BMD: 'BM',
        BND: 'BN',
        BOB: 'BO',
        BOV: 'BO',
        BRL: 'BR',
        BSD: 'BS',
        BTN: 'BT',
        BWP: 'BW',
        BYN: 'BY',
        BZD: 'BZ',
        CAD: 'CA',
        CDF: 'CD',
        CHE: 'CH',
        CHF: 'CH',
        CHW: 'CH',
        CLF: 'CL',
        CLP: 'CL',
        CNY: 'CN',
        COP: 'CO',
        COU: 'CO',
        CRC: 'CR',
        CUC: 'CU',
        CUP: 'CU',
        CVE: 'CV',
        CZK: 'CZ',
        DJF: 'DJ',
        DKK: 'DK',
        DOP: 'DO',
        DZD: 'DZ',
        EGP: 'EG',
        ERN: 'ER',
        ETB: 'ET',
        EUR: 'EU',
        FJD: 'FJ',
        FKP: 'FK',
        GBP: 'GB',
        GEL: 'GE',
        GHS: 'GH',
        GIP: 'GI',
        GMD: 'GM',
        GNF: 'GN',
        GTQ: 'GT',
        GYD: 'GY',
        HKD: 'HK',
        HNL: 'HN',
        HRK: 'HR',
        HTG: 'HT',
        HUF: 'HU',
        IDR: 'ID',
        ILS: 'IL',
        INR: 'IN',
        IQD: 'IQ',
        IRR: 'IR',
        ISK: 'IS',
        JMD: 'JM',
        JOD: 'JO',
        JPY: 'JP',
        KES: 'KE',
        KGS: 'KG',
        KHR: 'KH',
        KMF: 'KM',
        KPW: 'KP',
        KRW: 'KR',
        KWD: 'KW',
        KYD: 'KY',
        KZT: 'KZ',
        LAK: 'LA',
        LBP: 'LB',
        LKR: 'LK',
        LRD: 'LR',
        LSL: 'LS',
        LYD: 'LY',
        MAD: 'MA',
        MDL: 'MD',
        MGA: 'MG',
        MKD: 'MK',
        MMK: 'MM',
        MNT: 'MN',
        MOP: 'MO',
        MRU: 'MR',
        MUR: 'MU',
        MVR: 'MV',
        MWK: 'MW',
        MXN: 'MX',
        MXV: 'MX',
        MYR: 'MY',
        MZN: 'MZ',
        NAD: 'NA',
        NGN: 'NG',
        NIO: 'NI',
        NOK: 'NO',
        NPR: 'NP',
        NZD: 'NZ',
        OMR: 'OM',
        PAB: 'PA',
        PEN: 'PE',
        PGK: 'PG',
        PHP: 'PH',
        PKR: 'PK',
        PLN: 'PL',
        PYG: 'PY',
        QAR: 'QA',
        RON: 'RO',
        RSD: 'RS',
        RUB: 'RU',
        RWF: 'RW',
        SAR: 'SA',
        SBD: 'SB',
        SCR: 'SC',
        SDG: 'SD',
        SEK: 'SE',
        SGD: 'SG',
        SHP: 'SH',
        SLL: 'SL',
        SOS: 'SO',
        SRD: 'SR',
        SSP: 'SS',
        STN: 'ST',
        SVC: 'SV',
        SYP: 'SY',
        SZL: 'SZ',
        THB: 'TH',
        TJS: 'TJ',
        TMT: 'TM',
        TND: 'TN',
        TOP: 'TO',
        TRY: 'TR',
        TTD: 'TT',
        TWD: 'TW',
        TZS: 'TZ',
        UAH: 'UA',
        UGX: 'UG',
        USD: 'US',
        USN: 'US',
        UYI: 'UY',
        UYU: 'UY',
        UYW: 'UY',
        UZS: 'UZ',
        VES: 'VE',
        VND: 'VN',
        VUV: 'VU',
        WST: 'WS',
        XAF: 'CM',
        XAG: 'XX',
        XAU: 'XX',
        XBA: 'XX',
        XBB: 'XX',
        XBC: 'XX',
        XBD: 'XX',
        XCD: 'AG',
        XDR: 'XX',
        XOF: 'BJ',
        XPD: 'XX',
        XPF: 'PF',
        XPT: 'XX',
        XSU: 'XX',
        XTS: 'XX',
        XUA: 'XX',
        XXX: 'XX',
        YER: 'YE',
        ZAR: 'ZA',
        ZMW: 'ZM',
        ZWL: 'ZW',
    };
    
    if (currencyCode in countryCodeMap) {
        return countryCodeMap[currencyCode];
    } else {
        return null;  // Currency code not found
    }
}