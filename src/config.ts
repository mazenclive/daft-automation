import { Config } from './types';
import { template } from './utils/template';
import { DublinLocations } from './constants';

export const config: Config = {
  daft: {
    baseUrl: 'https://www.daft.ie/',
    rentedPropertyUrl: 'https://www.daft.ie/property-for-rent/ireland',
  },
  sorting: 'publishDateDesc',
  filters: {
    maxBudget: 3000,
    minBeds: 2,
    locations: [...DublinLocations, 'kildare', 'howth-dublin', 'wicklow'],
  },
} as const;

export const emailTemplate = template`
Hello,

My name is Sunit Deshpande and I'm writing to you because I'm very interested in renting the home that's available at ${(
  prop
) => prop.address}. I was particularly interested in this place.

I currently am a renter at 54 Avenue de la Gare, Esch-sur-Alzette, Luxembourg, Europe but am eager to move to Ireland because I have recently acquired a full-time permanent software engineer position at Workday, Ireland.

I'm sure you receive several rental applications each day, so I wanted to take some time to help you get to know me a little better and show you why I'm the best applicant for this vacancy.

- I have done my Master's education at Trinity College Dublin, and then I started working at Amazon, Luxembourg. Currently, I am moving to Ireland to work with Workday, Ireland as a software engineer.
- I rented an apartment at Southgate, Cork Street, Dublin 8 for more than 2 years. I had a very nice and personal connection with the landlord.
- Currently, I am renting an apartment in Luxembourg, Europe where I have a very good reputation with my current landlord.
- I am a very polite and quiet person. And always ready to help other people.

Based on these facts listed above, I think you'll find that I'm a reliable, good neighbour and tenant who will pay my rent on time, keep the apartment in mint condition and communicate easily with you about any needs.

Please feel free to reach out to me personally with any questions or concerns you may have. I'm eager to rent from you and look forward to your decision.

You can reach me by email at sunitdeshpande1234@gmail.com. Or you contact my brother who is currently in Ireland via contact number +353-899785745‬.

Thanks for your consideration,

Sunit
`;
