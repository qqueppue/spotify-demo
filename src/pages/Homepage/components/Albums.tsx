import { SEARCH_TYPE } from "../../../models/search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { Grid, Typography } from "@mui/material";
import Card from "../../../common/components/Card";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";

const Albumes = () => {
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: "k-pop",
    type: [SEARCH_TYPE.Album],
  });
  console.log('Data',data);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" paddingTop={"8px"} margin={"20px 0px"}>
        Albums
      </Typography>
      {data && data?.pages[0].albums?.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.pages[0].albums?.items.slice(0,12).map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists[0].name}
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
