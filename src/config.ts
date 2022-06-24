import { Config } from './types';
import { template } from './utils/template';
import { DublinLocations } from './constants';

export const config: Config = {
  daft: {
    baseUrl: 'https://www.daft.ie/',
    rentedPropertyUrl: 'https://www.daft.ie/property-for-rent/ireland',
  },
  maxPagesToScan: 5,
  sorting: 'publishDateDesc',
  filters: {
    maxBudget: 4000,
    minBeds: 2,
    locations: [
      ...DublinLocations,
      'kildare',
      'howth-dublin',
      'wicklow',
      'lucan-dublin',
      'swords-and-surrounds-dublin',
      'bray-wicklow',
      'tallaght-dublin',
      'kildare',
      'meath',
    ],
  },
  contactInfo: {
    fullName: 'Sunit Deshpande',
    contactNumber: '+353899785745',
    emailId: 'sunitdeshpande1234@gmail.com',
    messageTemplate: template`
Hello,

My name is Sunit Deshpande and I'm writing to you because I'm very interested in renting the home that's available at ${(
      prop
    ) => prop.address}. I was particularly interested in this place.

I currently am a renter in Luxembourg, Europe but am eager to move to Ireland because I have recently acquired a full-time permanent Software Engineer position at Workday, Ireland.

I'm sure you receive several rental applications each day, so I wanted to take some time to help you get to know me a little better and show you why I'm the best applicant for this vacancy.

- Currently, I am renting an apartment in Luxembourg, Europe where I have a very good reputation with the landlord.
- I rented an apartment at Southgate, Cork Street, Dublin 8 for more than 2 years. I had a very nice and personal connection with the landlord.
- I have a Master's degree from Trinity College Dublin. I have worked at Amazon, Luxembourg. Currently, I am moving to Ireland to work with Workday as a software engineer.
- I am a very polite and quiet person. And always ready to help other people.

Based on these facts listed above, I think you'll find that I'm a reliable, good neighbour and tenant who will pay my rent on time, keep the apartment in mint condition and communicate easily with you about any needs.

Please feel free to reach out to me by email at sunitdeshpande1234@gmail.com or via contact number +353899785745.

Thanks for your consideration,
Sunit
`,
  },
} as const;
