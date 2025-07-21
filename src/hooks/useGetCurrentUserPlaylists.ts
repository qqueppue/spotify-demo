import {
  useInfiniteQuery,
  type InfiniteData,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";
import type {
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
} from "../models/playlist";
import { getCurrentUserPlaylist } from "../apis/playlistApi";

const useGetCurrentUserPlaylists = ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): UseInfiniteQueryResult<
  InfiniteData<GetCurrentUserPlaylistResponse, Error>
> => {
  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylist({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetCurrentUserPlaylists;
