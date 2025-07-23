import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import LoadingSpinner from "../../common/components/LoadingSpinner";
import ErrorMessage from "../../common/components/ErrorMessage";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import {
  Box,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import DefaultImage from "../../common/components/DefaultImage";
import DesktopPlayItem from "./components/DesktopPlayItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import EmptyPlaylistWithSearch from "./components/EmptyPlaylistWithSearch";

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

const PlaylistDetailPage: React.FC = () => {
  const [playlistId, setPlaylistId] = useState<string | undefined>('');
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setPlaylistId(id);
  }, [id])
  
  if (id === undefined) return <Navigate to="/" />;

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    error: playlistError,
  } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });
  console.log("eee", playlistItems);

  if (isPlaylistLoading) return <LoadingSpinner />;
  if (playlistError)
    return <ErrorMessage errorMessage={playlistError.message} />;
  return (
    <div>
      <PlaylistHeader container spacing={7}>
        <ImageGrid item sm={12} md={2}>
          {playlist?.images ? (
            <AlbumImage
              src={playlist?.images[0].url}
              alt="playlist_cover.jpg"
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid item sm={12} md={10}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist?.owner?.display_name
                  ? playlist?.owner.display_name
                  : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
      {playlist?.tracks?.total === 0 ? (
        <EmptyPlaylistWithSearch  />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Date added</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlistItems?.pages.map((page, pageIndex) =>
              page.items.map((item, itemIndex) => (
                <DesktopPlayItem
                  item={item}
                  key={itemIndex}
                  index={pageIndex * PAGE_LIMIT + itemIndex + 1 }
                />
              ))
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PlaylistDetailPage;
