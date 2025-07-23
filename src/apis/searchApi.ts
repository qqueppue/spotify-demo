import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import type {
  CategoriesReponse,
  CategoryRequestParams,
  SearchRequestParams,
  SearchResponse,
} from "../models/search";

export const searchItemsByKeyword = async (
  token: string,
  params: SearchRequestParams
): Promise<SearchResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);
    searchParams.append("type", params.type.join(","));

    if (params.market) searchParams.append("market", params.market);
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.include_external)
      searchParams.append("include_external", params.include_external);

    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to search by keyword");
  }
};

export const searchCategoryList = async (
  token: string
): Promise<{categories: CategoriesReponse}> => {
  const params: CategoryRequestParams = {
    locale: "ko_KR",
    limit: 50,
    offset: 0,
  };
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log('responsess',response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to search catetories");
  }
};
