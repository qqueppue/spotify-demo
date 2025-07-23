import type { SimplifiedAlbum } from "./album";
import type { ApiResponse } from "./apiResponse";
import type { Artist } from "./artist";
import type { SimplifiedPlaylistObject } from "./playlist";
import type { Show, SimplifiedAudio, SimplifiedEpisode, Track } from "./track";

export enum SEARCH_TYPE {
  Track = "track",
  Album = "album",
  Playlist = "playlist",
  Show = "show",
  Episode = "episode",
  AudioBook = "audioBook",
  Artist = "artist",
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface SearchResponse {
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  tracks?: ApiResponse<Track>;
  playlists?: ApiResponse<SimplifiedPlaylistObject>;
  shows?: ApiResponse<Show>;
  episodes?: ApiResponse<SimplifiedEpisode>;
  audiobooks?: ApiResponse<SimplifiedAudio>;
}

export interface CategoryRequestParams {
  locale: string;   //한국 ko_KR
  limit: number;
  offset: number;
}

export interface CategoriesItems {
  href: string;
  icons: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  id: string;
  name: string;
}

export type CategoriesReponse = ApiResponse<CategoriesItems>;
