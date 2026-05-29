export interface City {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
}

export const CITIES: City[] = [
  {
    id: 'brasilia',
    name: 'Brasília',
    region: 'DF, Brasil',
    latitude: -15.7939,
    longitude: -47.8828,
  },
  {
    id: 'recife',
    name: 'Recife',
    region: 'PE, Brasil',
    latitude: -8.0476,
    longitude: -34.877,
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    region: 'Tailândia',
    latitude: 13.7563,
    longitude: 100.5018,
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik',
    region: 'Islândia',
    latitude: 64.1466,
    longitude: -21.9426,
  },
  {
    id: 'santiago',
    name: 'Santiago',
    region: 'Chile',
    latitude: -33.4489,
    longitude: -70.6693,
  },
];
