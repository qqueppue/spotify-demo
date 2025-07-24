import React from "react";
import { useParams } from "react-router";
import { SEARCH_TYPE } from "../../models/search";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import Card from "../../common/components/Card";
import ArtistCard from "./components/ArtistCard";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TopResultCard from "./components/TopResultCard";

const PlayButtonContainer = styled("div")(({ theme }) => ({
  color: theme.palette.action.hover,
  "&:hover": {
    color: "#ffffff",
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

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

  const {
    data: artistData,
    error: artistError,
    isLoading: artistLoading,
  } = useSearchItemsByKeyword({
    q: keyword || "",
    type: [SEARCH_TYPE.Artist],
  });

  const {
    data: albumData,
    error: albumError,
    isLoading: albumLoading,
  } = useSearchItemsByKeyword({
    q: keyword || "",
    type: [SEARCH_TYPE.Album],
  });

  if (trackLoading || artistLoading || albumLoading) {
    return <LoadingSpinner />;
  }

  if (trackError || artistError || albumError) {
    const error = trackError || artistError || albumError;
    return <ErrorMessage errorMessage={error?.message || ""} />;
  }

  return (
    <div>
      <Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="h1" paddingTop={"8px"}>
              Top Result
            </Typography>
            <TopResultCard
              image={trackData?.pages[0].tracks?.items[0].album?.images[0].url}
              name={trackData?.pages[0].tracks?.items[0].name}
              artistName={trackData?.pages[0].tracks?.items[0].artists[0].name}
            />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="h1" paddingTop={"8px"}>
              Songs
            </Typography>
            <List>
              {trackData?.pages[0].tracks?.items.slice(0, 4).map((item) => (
                <ListItem>
                  <ListItemAvatar sx={{ flex: 1 }}>
                    <img
                      height={40}
                      width={40}
                      style={{ borderRadius: "4px", marginInlineEnd: "12px" }}
                      src={item.album?.images[0].url}
                    />
                  </ListItemAvatar>
                  <ListItemText sx={{ flex: 5 }}
                    primary={item.name || "no name"}
                    secondary={item.artists[0].name || "no name"}
                  />

                  <ListItemText sx={{ flex: 1 }}>
                    <PlayButtonContainer>
                      <AddCircleOutlineIcon />
                    </PlayButtonContainer>
                  </ListItemText>
                  <ListItemText>
                    {moment(item.duration_ms).format("mm:ss") || "Unknown"}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h1" paddingTop={"8px"}>
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
      <Box>
        <Typography variant="h1" paddingTop={"8px"}>
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
    </div>
  );
};

export default SearchWithPage;
