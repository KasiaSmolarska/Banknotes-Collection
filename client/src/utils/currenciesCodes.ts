import { currentLang, LangKey } from "./languages";

const isoCurrienciesENG = {
  USD: {
    name: "US Dollar",
  },
  CAD: {
    name: "Canadian Dollar",
  },
  EUR: {
    name: "Euro",
  },
  AED: {
    name: "United Arab Emirates Dirham",
  },
  AFN: {
    name: "Afghan Afghani",
  },
  ALL: {
    name: "Albanian Lek",
  },
  AMD: {
    name: "Armenian Dram",
  },
  ARA: {
    name: "Argentine Austral",
  },
  ARS: {
    name: "Argentine Peso",
  },
  AUD: {
    name: "Australian Dollar",
  },
  AZN: {
    name: "Azerbaijani Manat",
  },
  BAM: {
    name: "Bosnia-Herzegovina Convertible Mark",
  },
  BDT: {
    name: "Bangladeshi Taka",
  },
  BGN: {
    name: "Bulgarian Lev",
  },
  BHD: {
    name: "Bahraini Dinar",
  },
  BIF: {
    name: "Burundian Franc",
  },
  BND: {
    name: "Brunei Dollar",
  },
  BOB: {
    name: "Bolivian Boliviano",
  },
  BRB: {
    name: "Brazilian cruzeiro",
  },
  BRC: {
    name: "Brazilian cruzado",
  },
  BRL: {
    name: "Brazilian Real",
  },
  BTN: {
    name: "Bhutanese ngultrum",
  },
  BWP: {
    name: "Botswanan Pula",
  },
  BYN: {
    name: "Belarusian Ruble",
  },
  BZD: {
    name: "Belize Dollar",
  },
  CDF: {
    name: "Congolese Franc",
  },
  CHF: {
    name: "Swiss Franc",
  },
  CLP: {
    name: "Chilean Peso",
  },
  CNY: {
    name: "Chinese Yuan",
  },
  COP: {
    name: "Colombian Peso",
  },
  CRC: {
    name: "Costa Rican Colón",
  },
  CVE: {
    name: "Cape Verdean Escudo",
  },
  CYP: {
    name: "Cypriot pound"
  },
  CZK: {
    name: "Czech Republic Koruna",
  },
  DJF: {
    name: "Djiboutian Franc",
  },
  DKK: {
    name: "Danish Krone",
  },
  DOP: {
    name: "Dominican Peso",
  },
  DZD: {
    name: "Algerian Dinar",
  },
  EEK: {
    name: "Estonian Kroon",
  },
  EGP: {
    name: "Egyptian Pound",
  },
  ERN: {
    name: "Eritrean Nakfa",
  },
  ETB: {
    name: "Ethiopian Birr",
  },
  GBP: {
    name: "British Pound Sterling",
  },
  GEL: {
    name: "Georgian Lari",
  },
  GHS: {
    name: "Ghanaian Cedi",
  },
  GNF: {
    name: "Guinean Franc",
  },
  GTQ: {
    name: "Guatemalan Quetzal",
  },
  GYD: {
    name: "Guyanese dollar",
  },
  GWP: {
    name: "Guinea-Bissau peso",
  },
  HKD: {
    name: "Hong Kong Dollar",
  },
  HNL: {
    name: "Honduran Lempira",
  },
  HRD: {
    name: "Croatian dinar",
  },
  HRK: {
    name: "Croatian Kuna",
  },
  HUF: {
    name: "Hungarian Forint",
  },
  IDR: {
    name: "Indonesian Rupiah",
  },
  ILS: {
    name: "Israeli New Sheqel",
  },
  INR: {
    name: "Indian Rupee",
  },
  IQD: {
    name: "Iraqi Dinar",
  },
  IRR: {
    name: "Iranian Rial",
  },
  ISK: {
    name: "Icelandic Króna",
  },
  JMD: {
    name: "Jamaican Dollar",
  },
  JOD: {
    name: "Jordanian Dinar",
  },
  JPY: {
    name: "Japanese Yen",
  },
  KES: {
    name: "Kenyan Shilling",
  },
  KHR: {
    name: "Cambodian Riel",
  },
  KMF: {
    name: "Comorian Franc",
  },
  KRW: {
    name: "South Korean Won",
  },
  KGS: {
    name: "Kyrgyzstani som",
  },
  KWD: {
    name: "Kuwaiti Dinar",
  },
  KZT: {
    name: "Kazakhstani Tenge",
  },
  LAK: {
    name: "Kip",
  },
  LBP: {
    name: "Lebanese Pound",
  },
  LKR: {
    name: "Sri Lankan Rupee",
  },
  LTL: {
    name: "Lithuanian Litas",
  },
  LVL: {
    name: "Latvian Lats",
  },
  LYD: {
    name: "Libyan Dinar",
  },
  MAD: {
    name: "Moroccan Dirham",
  },
  MDL: {
    name: "Moldovan Leu",
  },
  MGA: {
    name: "Malagasy Ariary",
  },
  MGF: {
    name: "Malagasy franc"
  },
  MKD: {
    name: "Macedonian Denar",
  },
  MMK: {
    name: "Myanma Kyat",
  },
  MNT: {
    name: "Tögrög (Tugrik)",
  },
  MOP: {
    name: "Macanese Pataca",
  },
  MUR: {
    name: "Mauritian Rupee",
  },
  MXN: {
    name: "Mexican Peso",
  },
  MYR: {
    name: "Malaysian Ringgit",
  },
  MZN: {
    name: "Mozambican Metical",
  },
  NAD: {
    name: "Namibian Dollar",
  },
  NGN: {
    name: "Nigerian Naira",
  },
  NIO: {
    name: "Nicaraguan Córdoba",
  },
  NOK: {
    name: "Norwegian Krone",
  },
  NPR: {
    name: "Nepalese Rupee",
  },
  NZD: {
    name: "New Zealand Dollar",
  },
  OMR: {
    name: "Omani Rial",
  },
  PAB: {
    name: "Panamanian Balboa",
  },
  PEI: {
    name: "Peruvian inti"
  },
  PEN: {
    name: "Peruvian Nuevo Sol",
  },
  PHP: {
    name: "Philippine Peso",
  },
  PKR: {
    name: "Pakistani Rupee",
  },
  PLN: {
    name: "Polish Zloty",
  },
  PYG: {
    name: "Paraguayan Guarani",
  },
  QAR: {
    name: "Qatari Rial",
  },
  RON: {
    name: "Romanian Leu",
  },
  RSD: {
    name: "Serbian Dinar",
  },
  RUB: {
    name: "Russian Ruble",
  },
  RWF: {
    name: "Rwandan Franc",
  },
  SAR: {
    name: "Saudi Riyal",
  },
  SDG: {
    name: "Sudanese Pound",
  },
  SEK: {
    name: "Swedish Krona",
  },
  SGD: {
    name: "Singapore Dollar",
  },
  SOS: {
    name: "Somali Shilling",
  },
  SRG: {
    name: "Surinamese guilder",
  },
  SRD: {
    name: "Surinamese dollar",
  },
  SYP: {
    name: "Syrian Pound",
  },
  TJR: {
    name: "Tajikistani ruble",
  },
  THB: {
    name: "Thai Baht",
  },
  TMM: {
    name: "Turkmenistan manat"
  },
  TND: {
    name: "Tunisian Dinar",
  },
  TOP: {
    name: "Tongan Paʻanga",
  },
  TRY: {
    name: "Turkish Lira",
  },
  TTD: {
    name: "Trinidad and Tobago Dollar",
  },
  TWD: {
    name: "New Taiwan Dollar",
  },
  TZS: {
    name: "Tanzanian Shilling",
  },
  UAH: {
    name: "Ukrainian Hryvnia",
  },
  UGX: {
    name: "Ugandan Shilling",
  },
  UYU: {
    name: "Uruguayan Peso",
  },
  UZS: {
    name: "Uzbekistan Som",
  },
  VEF: {
    name: "Venezuelan Bolívar (to 2018)",
  },
  VES: {
    name: "Venezuelan Bolívar (since 2018)",
  },
  VND: {
    name: "Vietnamese Dong",
  },
  XAF: {
    name: "CFA Franc BEAC",
  },
  XOF: {
    name: "CFA Franc BCEAO",
  },
  YER: {
    name: "Yemeni Rial",
  },
  ZAR: {
    name: "South African Rand",
  },
  ZMK: {
    name: "Zambian Kwacha (ZMW after 2013)",
  },
  ZMW: {
    name: "Zambian Kwacha",
  },
  ZRZ: {
    name: "Nouveau Zaïre",
  },
  ZWD: {
    name: "Zimbabwean Dollar",
  },
};

const isoCurrienciesPL = {
  USD: {
    name: "dolar amerykański",
  },

  CAD: {
    name: "dolar kanadyjski",
  },

  EUR: {
    name: "Euro",
  },

  AED: {
    name: "Zjednoczone Emiraty Arabskie Dirham",
  },

  AFN: {
    name: "Afghan Afghani",
  },

  ALL: {
    name: "lek albański",
  },

  AMD: {
    name: "Armenian Dram",
  },
  
  ARA: {
    name: "Austral argentyński",
  },

  ARS: {
    name: "peso argentyńskie",
  },

  AUD: {
    name: "dolar australijski",
  },

  AZN: {
    name: "Azerbejdżański Manat",
  },

  BAM: {
    name: "marka zamienna Bośni i Hercegowiny",
  },

  BDT: {
    name: "Bangladeshi Taka",
  },

  BGN: {
    name: "lew bułgarski",
  },

  BHD: {
    name: "dinar bahrański",
  },

  BIF: {
    name: "frank burundyjski",
  },

  BND: {
    name: "Dolar Brunei",
  },

  BOB: {
    name: "Bolivian Boliviano",
  },

  BRB: {
    name: "Brazilijskie cruzeiro",
  },

  BRC: {
    name: "Brazylijskie cruzado",
  },

  BRL: {
    name: "real brazylijski",
  },

  BTN: {
    name: "Ngultrum",
  },

  BWP: {
    name: "Botswanan Pula",
  },

  BYN: {
    name: "rubel białoruski",
  },

  BZD: {
    name: "Belize Dollar",
  },

  CDF: {
    name: "frank kongijski",
  },

  CHF: {
    name: "frank szwajcarski",
  },

  CLP: {
    name: "Peso chilijskie",
  },

  CNY: {
    name: "chiński juan",
  },

  COP: {
    name: "peso kolumbijskie",
  },

  CRC: {
    name: "Kostarykański Colón",
  },

  CVE: {
    name: "Escudo z Zielonego Przylądka",
  },
  
  CYP: {
    name: "Funt cypryjski"
  },

  CZK: {
    name: "korona czeska",
  },

  DJF: {
    name: "frank dżibutyjski",
  },

  DKK: {
    name: "korona duńska",
  },

  DOP: {
    name: "peso dominikańskie",
  },

  DZD: {
    name: "dinar algierski",
  },

  EEK: {
    name: "korona estońska",
  },

  EGP: {
    name: "funt egipski",
  },

  ERN: {
    name: "Erytrei Nakfa",
  },

  ETB: {
    name: "Birr etiopski",
  },

  GBP: {
    name: "funt szterling",
  },

  GEL: {
    name: "Georgian Lari",
  },

  GHS: {
    name: "Ghanaian Cedi",
  },

  GNF: {
    name: "frank gwineański",
  },

  GYD: {
    name: "Dolar gujański",
  },
  GWP: {
    name: "Gwinea Bissau peso",
  },
  HRD: {
    name: "Dinar chorwacki",
  },

  GTQ: {
    name: "Quetzal gwatemalski",
  },

  HKD: {
    name: "dolar hongkoński",
  },

  HNL: {
    name: "Honduran Lempira",
  },

  HRK: {
    name: "kuna chorwacka",
  },

  HUF: {
    name: "węgierski forint",
  },

  IDR: {
    name: "rupia indonezyjska",
  },

  ILS: {
    name: "nowy szekel izraelski",
  },

  INR: {
    name: "rupia indyjska",
  },

  IQD: {
    name: "dinar iracki",
  },

  IRR: {
    name: "rial irański",
  },

  ISK: {
    name: "islandzki królik",
  },

  JMD: {
    name: "dolar jamajski",
  },

  JOD: {
    name: "dinar jordański",
  },

  JPY: {
    name: "Jen japoński",
  },

  KES: {
    name: "szyling kenijski",
  },

  KHR: {
    name: "Cambodian Riel",
  },

  KMF: {
    name: "Frank Komorów",
  },

  KRW: {
    name: "Won południowokoreański",
  },
  
  KGS: {
    name: "Som kirigijski",
  },

  KWD: {
    name: "Dinar kuwejcki",
  },

  KZT: {
    name: "Kazachstański Tenge",
  },

  LAK: {
    name: "Kip",
  },

  LBP: {
    name: "funt libański",
  },

  LKR: {
    name: "rupia lankijska",
  },

  LTL: {
    name: "lit litewski",
  },

  LVL: {
    name: "łotewski łoty",
  },

  LYD: {
    name: "dinar libijski",
  },

  MAD: {
    name: "Marokański Dirham",
  },

  MDL: {
    name: "Lej mołdawski",
  },

  MGA: {
    name: "Madagaskar Ariary",
  },
  
  MGF: {
    name: "Frank malgaski"
  },

  MKD: {
    name: "Macedonian Denar",
  },

  MMK: {
    name: "Myanma Kyat",
  },

  MNT: {
    name: "Tögrög (Tugrik)",
  },

  MOP: {
    name: "Macaca Pataca",
  },

  MUR: {
    name: "rupia maurytyjska",
  },

  MXN: {
    name: "peso meksykańskie",
  },

  MYR: {
    name: "malezyjski ringgit",
  },

  MZN: {
    name: "Mozambican Metical",
  },

  NAD: {
    name: "dolar namibijski",
  },

  NGN: {
    name: "Naira nigeryjska",
  },

  NIO: {
    name: "Nikaraguan Córdoba",
  },

  NOK: {
    name: "korona norweska",
  },

  NPR: {
    name: "rupia nepalska",
  },

  NZD: {
    name: "dolar nowozelandzki",
  },

  OMR: {
    name: "Omani Rial",
  },

  PAB: {
    name: "Panamanian Balboa",
  },
  
    PEI: {
    name: "Peruwiański inti"
  },

  PEN: {
    name: "Peruvian Nuevo Sol",
  },

  PHP: {
    name: "Peso filipińskie",
  },

  PKR: {
    name: "rupia pakistańska",
  },

  PLN: {
    name: "polski złoty",
  },

  PYG: {
    name: "Paragwajski Guarani",
  },

  QAR: {
    name: "Rial katarski",
  },

  RON: {
    name: "lej rumuński",
  },

  RSD: {
    name: "dinar serbski",
  },

  RUB: {
    name: "rubel rosyjski",
  },

  RWF: {
    name: "Frank Rwandyjski",
  },

  SAR: {
    name: "Rija Saudyjska",
  },

  SDG: {
    name: "funt sudański",
  },

  SEK: {
    name: "korona szwedzka",
  },

  SGD: {
    name: "dolar singapurski",
  },

  SOS: {
    name: "Szyling somalijski",
  },

  SRG: {
    name: "Gulden surinamski",
  },

  SRD: {
    name: "Dolar surinamski",
  },

  SYP: {
    name: "funt syryjski",
  },

  TJR: {
    name: "rubel tadżycki",
  },

  THB: {
    name: "tajski baht",
  },
  
  TMM: {
    name: "Manat turkmeński"
  },

  TND: {
    name: "dinar tunezyjski",
  },

  TOP: {
    name: "Tongan Paʻanga",
  },

  TRY: {
    name: "lira turecka",
  },

  TTD: {
    name: "Dolar Trynidadu i Tobago",
  },

  TWD: {
    name: "Nowy dolar tajwański",
  },

  TZS: {
    name: "Szyling tanzański",
  },

  UAH: {
    name: "hrywna ukraińska",
  },

  UGX: {
    name: "szyling ugandyjski",
  },

  UYU: {
    name: "peso urugwajskie",
  },

  UZS: {
    name: "Uzbekistan Som",
  },

  VEF: {
    name: "Wenezuelski Bolívar (do 2018)",
  },
  
   VES: {
    name: "Wenezuelski Bolívar (od 2018)",
  },

  VND: {
    name: "Dong wietnamski",
  },

  XAF: {
    name: "CFA Franc BEAC",
  },

  XOF: {
    name: "CFA Franc BCEAO",
  },

  YER: {
    name: "rial jemeński",
  },

  ZAR: {
    name: "Rand południowoafrykański",
  },

  ZMK: {
    name: "Zambijska Kwacha (ZMW po roku 2013)",
  },
  
  ZMW: {
    name: "Zambijska Kwacha",
  },

  ZRZ: {
    name: "Nouveau Zaïre",
  },

  ZWD: {
    name: "dolar Zimbabwe",
  },
};

export type CurrenciesKeys = keyof typeof isoCurrienciesENG;

type IsoCurrenciesObj = {
  [key in LangKey]: {
    [cur in CurrenciesKeys]: {
      name: string
    }
  }
};

export const isoCurriencies: IsoCurrenciesObj = {
  pl: isoCurrienciesPL,
  eng: isoCurrienciesENG
};

export const getCurrencyName = (currencyCode: CurrenciesKeys) => {
  if (isoCurriencies[currentLang()].hasOwnProperty(currencyCode)) {
    return isoCurriencies[currentLang()][currencyCode].name;
  } else {
    return currencyCode;
  }
};
