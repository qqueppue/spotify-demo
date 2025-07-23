import type {
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistIitemRequest,
  GetPlaylistItemsReponse,
  GetPlaylistRequest,
  Playlist,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylist = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get("/me/playlists", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch current user playlist");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistIitemRequest
): Promise<GetPlaylistItemsReponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to fetch playlist items");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to create playlist");
  }
};

export const addPlaylistItem = async (params: {
  playlist_id: string;
  position: number;
  uris: string[];
}): Promise<{ snapshot_id: string }> => {
  const body = new URLSearchParams({
    position: params.position.toString(),
    uris: params.uris.toString(),
  });
  try {
    const { playlist_id, position, uris } = params;
    const response = await api.post(`/playlists/${playlist_id}/tracks`, body, {
      params: { position: position, uris: "uris=" + uris.join(",") },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to add track");
  }
};
