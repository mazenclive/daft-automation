type SortType = 'publishDateDesc' | 'priceAsc' | 'priceDesc';

export type Config = {
  daft: {
    baseUrl: string;
    rentedPropertyUrl: string;
  };
  filters?: {
    maxBudget?: number;
    minBeds?: number;
    maxBeds?: number;
    locations?: ReadonlyArray<string>;
  };
  sorting?: SortType;
};

export type TemplateProp = {
  address: string;
};

export type TemplateFunction = (
  props: TemplateProp
) => TemplateProp[keyof TemplateProp];
