import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import type { GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async (clientCredentialToken: string): Promise<GetNewReleasesResponse> => {
  try {
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/browse/new-releases`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      }
    );
    return response.data;

  } catch (err) {
    console.log(err);
    throw new Error("fail to fetch new releases");
  }
};
