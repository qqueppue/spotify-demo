import React from "react";
import { useParams } from "react-router";
import { SEARCH_TYPE } from "../../models/search";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Card from "../../common/components/Card";
import ArtistCard from "./components/ArtistCard";
import moment from "moment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TopResultCard from "./components/TopResultCard";

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
  console.log("data1- ", trackData);
  console.log("data2- ", artistData);
  console.log("data3- ", albumData);

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
          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <Typography variant="h1" paddingTop={"8px"}>
              Top Result
            </Typography>
            <TopResultCard
              image={trackData?.pages[0].tracks?.items[0].album?.images[0].url}
              name={trackData?.pages[0].tracks?.items[0].name}
              artistName={trackData?.pages[0].tracks?.items[0].artists[0].name}
            />
          </Grid>
          <Grid size={{ xs: 4, sm: 4, md: 4 }}>
            <Typography variant="h1" paddingTop={"8px"}>
              Songs
            </Typography>
            <Table>
              <TableBody>
                {trackData?.pages[0].tracks?.items.slice(0,4).map((item) => (
                  <TableRow>
                    <TableCell style={{ display: "flex" }}>
                      <img
                        height={40}
                        width={40}
                        style={{ borderRadius: "4px", marginInlineEnd: "12px" }}
                        src={item.album.images[0].url}
                      />
                      <div>
                        <Typography variant="body2">
                          {item.name || "no name"}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="var(--text-subdued, #b3b3b3)"
                        >
                          {item.artists[0].name || "no name"}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell><AddCircleOutlineIcon /></TableCell>
                    <TableCell>
                      {moment(item.duration_ms).format("mm:ss") || "Unknown"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                image={artist.images.length > 0 ? artist.images[0].url : ''}
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
