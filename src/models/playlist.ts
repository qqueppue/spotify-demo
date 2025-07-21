import type { ApiResponse } from "./apiResponse";
import type { ExternalUrls, Image, Owner } from "./commonType";
import type { Episode, Track } from "./track";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type IPlaylist = SimplifiedPlaylistObject;

export type GetCurrentUserPlaylistResponse =
  ApiResponse<SimplifiedPlaylistObject>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id: string;
  images: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: "playlist";
  uri?: string;
}

export interface SimplifiedPlaylistObject extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends BasePlaylist {
  tracks?: ApiResponse<PlaylistTrack>;
  // follwers:
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  addtional_types?: string;
}

export interface GetPlaylistIitemRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

export type GetPlaylistItemsReponse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}

export interface CreatePlaylistRequest {
  name: string;
  playlistPublic?: boolean;
  collaborative?: boolean;
  description?: string;
}
