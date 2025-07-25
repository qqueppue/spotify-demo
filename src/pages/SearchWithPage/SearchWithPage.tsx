import React from "react";
import { useParams } from "react-router";
import { SEARCH_TYPE } from "../../models/search";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import { Box, Grid, styled, Typography } from "@mui/material";
import TopResultCard from "./components/TopResultCard";
import ArtistCardList from "./components/ArtistCardList";
import AlbumCardList from "./components/AlbumCardList";
import SearchSongItemList from "./components/SearchSongItemList";

const SearchTypeTitle = styled(Typography)({
  margin: "20px 0px",
});

const SearchWithPage: React.FC = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const {
    data: trackData,
    error: trackError,
    isLoading: trackLoading,
  } = useSearchItemsByKeyword({
    q: keyword || "",
    type: [SEARCH_TYPE.Track],
  });

  if (trackLoading) {
    return <LoadingSpinner />;
  }

  if (trackError) {
    return <ErrorMessage errorMessage={trackError.message || ""} />;
  }

  return (
    <div>
      <Box>
        <Grid container spacing={2}>
          <TopResultCard
            image={trackData?.pages[0].tracks?.items[0].album?.images[0].url}
            name={trackData?.pages[0].tracks?.items[0].name}
            artistName={trackData?.pages[0].tracks?.items[0].artists[0].name}
          />
          <SearchSongItemList
            songList={trackData?.pages[0].tracks?.items || []}
          />
        </Grid>
      </Box>
      <ArtistCardList keyword={keyword || ""} />
      <AlbumCardList keyword={keyword || ""} />
    </div>
  );
};

export default SearchWithPage;
