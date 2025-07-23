import { useMutation } from "@tanstack/react-query";
import { addPlaylistItem } from "../apis/playlistApi";

interface AddPlaylistItemRequest {
  playlist_id: string;
  position: number;
  uris: string[];
}

const useAddPlaylistItem = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddPlaylistItemRequest) => {
      return addPlaylistItem(params);
    },
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: [""] });
      console.log("성공");
    },
  });
};

export default useAddPlaylistItem;
