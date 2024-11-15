import { getJSON } from "wix-fetch";
import { getSecret } from "wix-secrets-backend";

// GET call using getJSON
export async function getProperties(
  total = 12,
  page = 0,
  params = "&PostalCode=33139"
) {
  const url =
    "https://api.bridgedataoutput.com/api/v2/miamire/listings?access_token=";
  const key = await getSecret("server_token");

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

  const response = await getJSON(encodeURI(fullUrl));

  return response;
}

export function getSearchParams(params) {
  let searchParams = "&and[0][MlsStatus][in]=Active,Pending",
    index = 1;

  if (params.address) {
    searchParams +=
      "&and[" + index + "][PropertyType][in]=Residential Lease,Residential";
    index += 1;

    if (!isNaN(params.address) && params.address.length == 5) {
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
  if (params.PropertyType) {
    searchParams +=
      "&and[" + index + "][PropertyType][eq]=" + params.PropertyType;
    index += 1;
  } else {
    searchParams +=
      "&and[" + index + "][PropertyType][in]=Residential Lease,Residential";
    index += 1;
  }

  if (params.PropertySubType) {
    searchParams +=
      "&and[" + index + "][PropertySubType][eq]=" + params.PropertySubType;
    index += 1;
  }

  if (params.BedroomsTotal) {
    searchParams +=
      "&and[" + index + "][BedroomsTotal][eq]=" + params.BedroomsTotal;
    index += 1;
  }

  if (params.BathroomsTotalDecimal) {
    searchParams +=
      "&and[" +
      index +
      "][BathroomsTotalDecimal][eq]=" +
      params.BathroomsTotalDecimal;
    index += 1;
  }

  if (params.PoolPrivateYN && params.PoolPrivateYN == "Si") {
    searchParams += "&and[" + index + "][PoolPrivateYN][eq]=true";
    index += 1;
  }

  if (params.View && params.View == "Si") {
    searchParams +=
      "&and[" + index + "][View][in]=Ocean View,Ocean,Direct Ocean";
    index += 1;
  }

  if (params.YearBuilt) {
    searchParams += "&and[" + index + "][YearBuilt][eq]=" + params.YearBuilt;
    index += 1;
  }

  if (params.minListPrice && params.maxListPrice) {
    searchParams +=
      "&and[" +
      index +
      "][ListPrice][gte]=" +
      params.minListPrice.replace("$", "");
    index += 1;
    searchParams +=
      "&and[" +
      index +
      "][ListPrice][lte]=" +
      params.maxListPrice.replace("$", "");
    index += 1;
  } else if (params.minListPrice) {
    searchParams +=
      "&and[" +
      index +
      "][ListPrice][gte]=" +
      params.minListPrice.replace("$", "");
    index += 1;
  } else if (params.maxListPrice) {
    searchParams +=
      "&and[" +
      index +
      "][ListPrice][lte]=" +
      params.maxListPrice.replace("$", "");
    index += 1;
  }

  if (params.minLivingArea && params.maxLivingArea) {
    searchParams +=
      "&and[" + index + "][LivingArea][gte]=" + params.minLivingArea;
    index += 1;
    searchParams +=
      "&and[" + index + "][LivingArea][lte]=" + params.maxLivingArea;
    index += 1;
  } else if (params.minLivingArea) {
    searchParams +=
      "&and[" + index + "][LivingArea][gte]=" + params.minLivingArea;
    index += 1;
  } else if (params.maxLivingArea) {
    searchParams +=
      "&and[" + index + "][LivingArea][lte]=" + params.maxLivingArea;
    index += 1;
  }

  return searchParams;
}

import { getSearchParams, getProperties } from "backend/dataProperties";
import { session } from "wix-storage";
import wixLocationFrontend from "wix-location";
import wixWindowFrontend from "wix-window";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});
const PROPS_FOR_PAGE = 12;

async function setSession(val) {
  let searchParams = await getSearchParams({ address: val });

  session.setItem("propSearchParams", searchParams);

  wixLocationFrontend.to("/results");
}

export function searchByAddress(loading, input, button) {
  let val = input.value;
  loading.hide();

  input.onKeyPress((e) => {
    val = input.value;
    if (e.key == "Enter" && val.length > 0) {
      loading.show();
      setSession(val);
    }
  });

  button.onClick((e) => {
    val = input.value;
    if (val.length > 0) {
      loading.show();
      setSession(val);
    }
  });
}

export function searchByText(loading, text, button) {
  loading.hide();

  button.onClick((e) => {
    if (text.length > 0) {
      loading.show();
      setSession(text);
    }
  });
}

export function searchByForm(loading, button, form) {
  loading.hide();
  button.enable();

  form.onWixFormSubmit(async ({ fields }) => {
    let searchFields = {},
      searchvalid = false;

    loading.show();

    fields.forEach((field) => {
      if (field.fieldValue) {
        searchFields[field.id] = field.fieldValue;
        searchvalid = true;
      }
    });

    if (searchvalid) {
      button.disable();
      let searchParams;

      searchParams = await getSearchParams(searchFields);

      session.setItem("propSearchParams", searchParams);

      wixLocationFrontend.to("/results");
    } else loading.hide();
  });
}

function getLanguageTexts(url) {
  if (
    url == "https://www.hidalgorealtor.com/en" ||
    url == "http://www.hidalgorealtor.com/en"
  ) {
    return {
      sqft: "SQFT",
      garage: "GARAGE",
      beds: "BEDS",
      baths: "BATHS",
      rent: "FOR RENT",
      sale: "FOR SALE",
    };
  }

  return {
    sqft: "SQFT",
    garage: "GARAJE",
    beds: "CUARTOS",
    baths: "BAÑOS",
    rent: "RENTA",
    sale: "VENTA",
  };
}

export async function resultProperties(
  loading,
  notfound,
  back,
  repeater,
  pagination
) {
  loading.show();
  notfound.hide();

  session.setItem("propertyDetails", "");

  let actualPage = 0;
  let GENERAL_TEXT = getLanguageTexts(wixLocationFrontend.baseUrl);

  repeater.onItemReady(($item, itemData, index) => {
    $item("#address").text = itemData.UnparsedAddress;
    $item("#sqft").text = itemData.LivingArea + " " + GENERAL_TEXT.sqft;
    $item("#garage").text = itemData.GarageSpaces + " " + GENERAL_TEXT.garage;
    $item("#beds").text = itemData.BedroomsTotal + " " + GENERAL_TEXT.beds;
    $item("#baths").text =
      itemData.BathroomsTotalDecimal + " " + GENERAL_TEXT.baths;
    $item("#xtype").text =
      itemData.PropertyType + " - " + itemData.PropertySubType;
    $item("#lprice").text = USDollar.format(itemData.ListPrice);
    $item("#buttype").label =
      itemData.PropertyType == "Residential"
        ? GENERAL_TEXT.sale
        : GENERAL_TEXT.rent;

    $item("#img").src = itemData.Media[0].MediaURL;
    loading.hide();
    $item("#container1").onClick((event) => {
      loading.show();
      session.setItem("propertyDetails", JSON.stringify(itemData));
      wixLocationFrontend.to("/overview");
    });
    wixWindowFrontend.scrollTo(0, 0);
  });

  let searchParams = session.getItem("propSearchParams") ?? {
    address: "&PostalCode=33139",
  };

  // Get initial page result
  const externalData = await getProperties(
    PROPS_FOR_PAGE,
    actualPage,
    searchParams
  );
  const total = externalData.total;
  let propertyData = externalData.bundle;

  // Make the data suitable for a repeater by adding a valid and unique `_id` values
  propertyData = propertyData.map((item) => {
    item._id = item.ListingId;
    return item;
  });

  if (propertyData.length == 0) {
    loading.hide();
    notfound.show();
  }

  // Set the data to associate with the repeater
  repeater.data = propertyData;

  pagination.currentPage = 1;
  pagination.totalPages = Math.ceil(total / 10);

  pagination.onChange(async (event) => {
    loading.show();
    let pag = event.target.currentPage; // 4

    const externalData = await getProperties(
      PROPS_FOR_PAGE,
      pag - 1,
      searchParams
    );
    let propertyData = externalData.bundle;

    propertyData = propertyData.map((item) => {
      item._id = item.ListingId;
      return item;
    });

    // Set the data to associate with the repeater
    repeater.data = propertyData;
  });

  if (back) {
    back.onClick((e) => {
      wixLocationFrontend.to("/search");
    });
  }
}

export function getProperty(
  fulladdress,
  address,
  id,
  status,
  price,
  remark,
  type,
  beds,
  baths,
  sqft,
  garage,
  year,
  map,
  gallery,
  back
) {
  let prop = session.getItem("propertyDetails");

  if (prop != "") {
    const property = JSON.parse(prop);

    const GENERAL_TEXT = getLanguageTexts(wixLocationFrontend.baseUrl);

    fulladdress.text = property.UnparsedAddress;
    address.text = property.UnparsedAddress;
    id.text = property.ListingId + ", " + property.SubdivisionName;
    status.text =
      property.PropertyType == "Residential"
        ? GENERAL_TEXT.sale
        : GENERAL_TEXT.rent;
    price.text = USDollar.format(property.ListPrice);

    remark.text = property.PublicRemarks;

    type.text = property.PropertySubType;
    beds.text = property.BedroomsTotal.toString();
    baths.text = property.BathroomsTotalDecimal.toString();

    sqft.text = property.LivingArea + " " + GENERAL_TEXT.sqft;
    garage.text = property.GarageSpaces.toString();
    year.text = property.YearBuilt.toString();

    map.location = {
      latitude: property.Latitude,
      longitude: property.Longitude,
      description: "Property: " + property.ListingId,
    };

    let galleryItems = property.Media.map((x) => {
      return {
        type: "image",
        src: x.MediaURL,
        link: x.MediaURL,
      };
    });

    gallery.items = galleryItems;

    if (back) {
      back.onClick((e) => {
        wixLocationFrontend.to("/results");
      });
    }
  } else {
    wixLocationFrontend.to("/results");
  }
}
