import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import type { ClientCredentialTokenResponse, ExchangeTokenResponse } from "../models/auth";
import { REDIRECT_URI } from "../configs/commonConfig";

const encodedBase64 = (data: string): string => {
  // return Buffer.from(data).toString("base64");
  if (typeof window !== "undefined") {
    return btoa(data);
  } else {
    return Buffer.from(data).toString("base64");
  }
};

export const getClientCredientialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            Authorization: `Basic ${encodedBase64(
              CLIENT_ID + ":" + CLIENT_SECRET
            )}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Fail to fetch client credential token");
    }
  };

export const exchangeToken = async (code: string, codeVerifier: string): Promise<ExchangeTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";
    if (!CLIENT_ID || !REDIRECT_URI) {
      throw new Error("Missing required parameters");
    }
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;

  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch token");
  }
};
