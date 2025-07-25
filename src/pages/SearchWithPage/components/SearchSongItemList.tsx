import { Grid, List, Typography } from "@mui/material";
import SearchSongItem from "./SearchSongItem";
import type { Track } from "../../../models/track";

const SearchSongItemList = ({ songList }: { songList: Track[] }) => {
  console.log("song", songList);
  return (
    <Grid size={{ xs: 6, sm: 6, md: 6 }}>
      <Typography variant="h1" margin={"20px 0px"}>
        Songs
      </Typography>
      <List>
        {songList.slice(0, 4).map((item) => (
          <SearchSongItem
            key={item.album?.id}
            image={item.album?.images[0].url || ""}
            name={item.name || "no name"}
            artistName={item.artists[0].name || "no name"}
            time={item.duration_ms || 0}
          />
        ))}
      </List>
    </Grid>
  );
};

export default SearchSongItemList;
