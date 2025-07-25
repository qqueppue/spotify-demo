import { Box, Grid, Typography } from "@mui/material";
import ArtistCard from "./ArtistCard";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";

const ArtistCardList = ({ keyword }: { keyword: string }) => {
  const {
    data: artistData,
    error: artistError,
    isLoading: artistLoading,
  } = useSearchItemsByKeyword({
    q: keyword || "",
    type: [SEARCH_TYPE.Artist],
  });

  if (artistLoading) {
    return <LoadingSpinner />;
  }

  if (artistError) {
    return <ErrorMessage errorMessage={artistError.message || ""} />;
  }

  return (
    <Box>
      <Typography variant="h1" margin={"20px 0px"}>
        Artists
      </Typography>
      <Grid container spacing={2}>
        {artistData?.pages[0].artists?.items.slice(0, 6).map((artist) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={artist.id}>
            <ArtistCard
              image={artist.images.length > 0 ? artist.images[0].url : ""}
              name={artist.name}
              type={artist.type}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ArtistCardList;
