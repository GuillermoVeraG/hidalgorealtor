export interface PropertyParams {
  mlsnumber: string;
}

export interface PropertySearchParams {
  address: string;
  type: string;
  subtype: string;
  beds: number;
  baths: number;
  view?: boolean;
  parking?: boolean;
  pool?: boolean;
  "min-price": number;
  "max-price": number;
  "min-sqft": number;
  "max-sqft": number;
}

export interface PropertyLocationParams {
  address: string;
}

export interface PropertyParamsItems {
  data: PropertyParams;
  key: string;
  urlBase: string;
  pagination: {
    total: number;
    page: number;
  };
}

export interface PropertySearchUrlParams {
  type: string;
  address: string;
  subtype: string;
  price: string;
  sqft: string;
  beds: string;
  baths: string;
  amenities: string;
  page: string;
}

export interface PropertySearchParamsItems {
  data: PropertySearchParams;
  key: string;
  urlBase: string;
  pagination: {
    total: number;
    page: number;
  };
}

export interface PropertyResult {
  ListingId: number;
  UnparsedAddress: string;
  LivingArea: number;
  GarageSpaces: number;
  BedroomsTotal: number;
  BathroomsTotalDecimal: number;
  PropertyType: string;
  PropertySubType: string;
  ListPrice: number;
  Media: Array<{
    MediaURL: string;
  }>;
  SubdivisionName: string;
  PublicRemarks: string;
  YearBuilt: number;
  Latitude: number;
  Longitude: number;
}

export interface PropertyResultItems {
  mlsnumber: number;
  address: string;
  sqft: number;
  beds: number;
  baths: number;
  garage: number;
  proptype: string;
  propsubtype: string;
  price: number;
  photos: Array<string>;
  subdivision: string;
  description: string;
  yearbuilt: number;
  latitude: number;
  longitude: number;
}

export function getUrlSearchParams(params: PropertySearchParams) {
  let searchParams =
    params.type + "/" + params.address + "/" + params.subtype + "/";

  searchParams += params["min-price"] + "-" + params["max-price"] + "/";
  searchParams += params["min-sqft"] + "-" + params["max-sqft"] + "/";
  searchParams += (params.beds && params.beds > 0 ? params.beds : "0") + "/";
  searchParams += (params.baths && params.baths > 0 ? params.baths : "0") + "/";

  let amenities = "";
  if (params.view) amenities += "view+";
  if (params.parking) amenities += "parking+";
  if (params.pool) amenities += "pool+";

  if (amenities.length > 0) searchParams += amenities + "/";
  else searchParams += "none/";

  searchParams += "1/";

  return encodeURI(searchParams);
}

export function getUrlLocationParams(params: PropertyLocationParams) {
  let searchParams =
    "sale/" + params.address + "/none/0-5000000/0-5000/0/0/none/1/";

  return encodeURI(searchParams);
}

export function getApiSearchParams(params: PropertySearchParams) {
  let searchParams = "&and[0][MlsStatus][in]=Active,Pending",
    index = 1;

  if (params.type) {
    if (params.type == "sale") {
      searchParams += "&and[" + index + "][PropertyType][eq]=Residential";
      index += 1;
    } else {
      searchParams += "&and[" + index + "][PropertyType][eq]=Residential Lease";
      index += 1;
    }
  }

  if (params.address) {
    if (
      params.address.length == 5 &&
      parseInt(params.address).toString().length == 5
    ) {
      searchParams += "&and[" + index + "][PostalCode][eq]=" + params.address;
      index += 1;
    } else if (
      params.address.length == 9 &&
      params.address.split(" ").length == 1
    ) {
      searchParams += "&and[" + index + "][ListingId][eq]=" + params.address;
      index += 1;
    } else {
      searchParams += "&and[" + index + "][City][eq]=" + params.address;
      index += 1;
    }
  }

  if (params.subtype && params.subtype != "none") {
    searchParams +=
      "&and[" + index + "][PropertySubType][eq]=" + params.subtype;
    index += 1;
  }

  if (params.beds) {
    searchParams += "&and[" + index + "][BedroomsTotal][eq]=" + params.beds;
    index += 1;
  }

  if (params.baths) {
    searchParams +=
      "&and[" + index + "][BathroomsTotalDecimal][eq]=" + params.baths;
    index += 1;
  }

  if (params.pool) {
    searchParams += "&and[" + index + "][PoolPrivateYN][eq]=true";
    index += 1;
  }

  if (params.view) {
    searchParams +=
      "&and[" + index + "][View][in]=Ocean View,Ocean,Direct Ocean";
    index += 1;
  }

  if (params.parking) {
    searchParams += "&and[" + index + "][GarageYN][eq]=true";
    index += 1;
  }

  /*if (params.YearBuilt) {
    searchParams += "&and[" + index + "][YearBuilt][eq]=" + params.YearBuilt;
    index += 1;
  }*/

  if (params["min-price"] && params["max-price"]) {
    searchParams +=
      "&and[" + index + "][ListPrice][gte]=" + params["min-price"];
    index += 1;
    searchParams +=
      "&and[" + index + "][ListPrice][lte]=" + params["max-price"];
    index += 1;
  } else if (params["min-price"]) {
    searchParams +=
      "&and[" + index + "][ListPrice][gte]=" + params["min-price"];
    index += 1;
  } else if (params["max-price"]) {
    searchParams +=
      "&and[" + index + "][ListPrice][lte]=" + params["max-price"];
    index += 1;
  }

  if (params["min-sqft"] && params["max-sqft"]) {
    searchParams +=
      "&and[" + index + "][LivingArea][gte]=" + params["min-sqft"];
    index += 1;
    searchParams +=
      "&and[" + index + "][LivingArea][lte]=" + params["max-sqft"];
    index += 1;
  } else if (params["min-sqft"]) {
    searchParams +=
      "&and[" + index + "][LivingArea][gte]=" + params["min-sqft"];
    index += 1;
  } else if (params["max-sqft"]) {
    searchParams +=
      "&and[" + index + "][LivingArea][lte]=" + params["max-sqft"];
    index += 1;
  }

  return searchParams;
}

export function getPropertyParams(params: PropertyParams) {
  let searchParams = "&and[0][MlsStatus][in]=Active,Pending";

  if (params.mlsnumber) {
    searchParams += "&and[1][ListingId][eq]=" + params.mlsnumber;
  } else return false;

  return searchParams;
}

export function getFullUrl(
  total = 12,
  page = 0,
  params = "&PostalCode=33139",
  key = "",
  url = ""
): string {
  const offset = page * total;

  let fullUrl =
    url +
    key +
    params +
    "&limit=" +
    total +
    "&offset=" +
    offset +
    "&sortBy[0]=BridgeModificationTimestamp&order=desc";

  return fullUrl;
}

export const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export const USNumber = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 0,
});
