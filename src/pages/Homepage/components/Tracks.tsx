import { SEARCH_TYPE } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { Grid, Typography } from "@mui/material";
import Card from "../../../common/components/Card";

const Albumes = () => {
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: "k-pop",
    type: [SEARCH_TYPE.Track],
  });

  return (
    <div>
      <Typography variant="h1" paddingTop={"8px"}>
        Tracks
      </Typography>
      {data && data?.pages[0].tracks?.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.pages[0].tracks?.items.map((track, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={track.album.id + index}>
              <Card
                image={track.album.images[0].url}
                name={track.album.name}
                artistName={track.album.artists[0].name}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No Data</Typography>
      )}
    </div>
  );
};

export default Albumes;
