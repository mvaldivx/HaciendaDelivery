interface Result {
    authenticationResultCode: string;
    brandLogoUri: string;
    copyright: string;
    resourceSets: ResourceSet[];
    statusCode: number;
    statusDescription: string;
    traceId: string;
  }
  
  interface ResourceSet {
    estimatedTotal: number;
    resources: Resource[];
  }
  
  interface Resource {
    __type: string;
    bbox: number[];
    name: string;
    point: Point;
    address: Address;
    confidence: string;
    entityType: string;
    geocodePoints: GeocodePoint[];
    matchCodes: string[];
  }
  
  interface GeocodePoint {
    type: string;
    coordinates: number[];
    calculationMethod: string;
    usageTypes: string[];
  }
  
  interface Address {
    addressLine: string;
    adminDistrict: string;
    countryRegion: string;
    formattedAddress: string;
    locality: string;
    postalCode: string;
  }
  
  interface Point {
    type: string;
    coordinates: number[];
  }