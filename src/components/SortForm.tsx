import { useState } from "react";

import { actions } from "astro:actions";
import { navigate } from "astro:transitions/client";

import type { LabelsSortParams } from "@/utils/property";

export interface SortInputProps {
  sort: string;
  order: string;
  url: string;
  labels: LabelsSortParams;
}

const Sort = ({ sort, order, url, labels }: SortInputProps) => {
  var [sortData, setSortData] = useState({
    sort: sort,
    order: order,
    url: url,
  });

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { value } = e.target;

    const sort = value.split("-")[0];
    const order = value.split("-")[1];

    setSortData((prevState) => ({
      ...prevState,
      ["sort"]: sort,
      ["order"]: order,
    }));

    const isSpa = sortData.url.includes("/es/");
    const url = sortData.url
      .replace("/es/buyer/result/", "")
      .replace("/buyer/result/", "");

    const { data, error } = await actions.property.getUrlSortParams({
      url: url,
      sort: sort,
      order: order,
    });

    if (!error) navigate(`${isSpa ? "/es" : ""}/buyer/result/${data}`);
    else console.error(error);
  };

  return (
    <div
      className={`w-85 flex justify-start items-center gap-4 font-sans text-sm`}
    >
      <label className="font-bold capitalize" htmlFor="property-sort">
        {labels.sort}
      </label>
      <select
        className="w-full bg-primary-100 accent-primary-700 border border-black rounded py-1 px-2 font-sans"
        id="property-sort"
        name="sort"
        value={
          sortData.sort ? sortData.sort + "-" + sortData.order : "date-desc"
        }
        onChange={handleSelectChange}
      >
        <option value="date-desc">{labels.opt1}</option>
        <option value="date-asc">{labels.opt2}</option>
        <option value="price-desc">{labels.opt3}</option>
        <option value="price-asc">{labels.opt4}</option>
        <option value="sqft-desc">{labels.opt5}</option>
        <option value="sqft-asc">{labels.opt6}</option>
      </select>
    </div>
  );
};

export default Sort;
