import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPlaylistItem } from "../apis/playlistApi";

interface AddPlaylistItemRequest {
  playlist_id: string;
  position: number;
  uris: string[];
}

let paramId: string = "";
const useAddPlaylistItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddPlaylistItemRequest) => {
      paramId = params.playlist_id;
      return addPlaylistItem(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist-detail", paramId] });
      console.log("성공");
    },
  });
};

export default useAddPlaylistItem;
