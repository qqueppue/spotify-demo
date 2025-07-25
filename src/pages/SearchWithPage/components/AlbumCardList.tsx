import { Box, Grid, Typography } from "@mui/material";
import Card from "../../../common/components/Card";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";

const AlbumCardList = ({ keyword }: { keyword: string }) => {
  const {
    data: albumData,
    error: albumError,
    isLoading: albumLoading,
  } = useSearchItemsByKeyword({
    q: keyword || "",
    type: [SEARCH_TYPE.Album],
  });

  if (albumLoading) {
    return <LoadingSpinner />;
  }

  if (albumError) {
    return <ErrorMessage errorMessage={albumError.message || ""} />;
  }

  return (
    <Box>
      <Typography variant="h1" margin={"20px 0px"}>
        Albums
      </Typography>
      <Grid container spacing={2}>
        {albumData?.pages[0].albums?.items.slice(0, 6).map((album) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
            <Card
              image={album.images[0].url}
              name={album.name}
              artistName={album.artists[0].name}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AlbumCardList;
