type SortType = 'publishDateDesc' | 'priceAsc' | 'priceDesc';

export type Config = {
  daft: {
    baseUrl: string;
    rentedPropertyUrl: string;
  };
  maxPagesToScan: number;
  filters?: {
    maxBudget?: number;
    minBeds?: number;
    maxBeds?: number;
    locations?: ReadonlyArray<string>;
  };
  sorting?: SortType;
  contactInfo: {
    fullName: string;
    emailId: string;
    contactNumber: string;
    messageTemplate: string;
  };
};

export type TemplateProp = {
  address: string;
};

export type TemplateFunction = (
  props: TemplateProp
) => TemplateProp[keyof TemplateProp];
