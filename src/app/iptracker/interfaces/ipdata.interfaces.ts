export interface IPData {

  ip: string;
  location: Location;
  domains: string[];
  as: As;
  isp: string;
}

export interface As {
  asn: number;
  name: string;
  route: string;
  domain: string;
  type: string;
}

export interface Location {
  postalCode: string;
  country: string;
  region: string;
  timezone: string;
  lat: number;
  lng: number;
  city:string;
}
