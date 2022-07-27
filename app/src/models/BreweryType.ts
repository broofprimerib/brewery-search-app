
export interface BreweryType {
  display: string;
  description: string;
  value: string;
};

export const BreweryTypes: BreweryType[] = [
  {
    display: 'Micro',
    description: 'Most craft breweries. For example, Samual Adams is still considered a micro brewery.',
    value: 'micro',
  },
  {
    display: 'Nano',
    description: 'An extremely small brewery which typically only distributes locally.',
    value: 'nano',
  },
  {
    display: 'Regional',
    description: 'A regional location of an expanded brewery. Ex. Sierra Nevada’s Asheville, NC location.',
    value: 'regional',
  },
  {
    display: 'Brewpub',
    description: 'A beer-focused restaurant or restaurant/bar with a brewery on-premise.',
    value: 'brewpub',
  },
  {
    display: 'Large',
    description: 'A very large brewery. Likely not for visitors. Ex. Miller-Coors.',
    value: 'large',
  },
  {
    display: 'Planning',
    description: 'A brewery in planning or not yet opened to the public.',
    value: 'planning',
  },
  {
    display: 'Bar',
    description: 'A bar. No brewery equipment on premise.',
    value: 'bar',
  },
  {
    display: 'Contract',
    description: 'A brewery that uses another brewery’s equipment.',
    value: 'contract',
  },
  {
    display: 'Proprieter',
    description: 'Similar to contract brewing but refers more to a brewery incubator.',
    value: 'proprieter',
  },
  {
    display: 'Closed',
    description: 'A location which has been closed.',
    value: 'closed',
  },
]
