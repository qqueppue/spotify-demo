import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  styled,
  type SnackbarCloseReason,
} from "@mui/material";
import moment from "moment";
import DefaultImage from "../../../common/components/DefaultImage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import useGetPlaylist from "../../../hooks/useGetPlaylist";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../../common/components/LoadingSpinner";
import ErrorMessage from "../../../common/components/ErrorMessage";
import useGetCurrentUserPlaylists from "../../../hooks/useGetCurrentUserPlaylists";
import { useInView } from "react-intersection-observer";
import useAddPlaylistItem from "../../../hooks/useAddPlaylistItem";

interface SongListProps {
  image: string;
  name: string;
  artistName: string;
  time: number;
}

const SongContainer = styled(ListItem)(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: "2px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
    "& svg": {
      color: "#FFFFFF",
    },
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));

const AddIcon = styled(AddCircleOutlineIcon)({
  color: "#121212",
});

const AddButton = styled("button")({
  background: "inherit",
  border: "none",
  boxShadow: "none",
  borderRadius: 0,
  padding: 0,
  overflow: "visible",
  cursor: "pointer",
});

const SearchSongItem = ({ image, name, artistName, time }: SongListProps) => {
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [playlistID, setPlaylistId] = useState<string>('');
  const [uri, setUri] = useState<string>('');
  const playlistOpen = Boolean(anchorEl);

  const { mutate: addSearchItems } = useAddPlaylistItem();
  const { data: userProfile } = useGetCurrentUserProfile();
  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  const handleAddSongs = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (userProfile) {
      setAnchorEl(event.currentTarget);
      // useGetPlaylist();
    } else {
      setSnackOpen(true);
    }
  };

  const handleSnackbarClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handlePlaylistClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (event) => {
    console.log('event',event);
    // addSearchItems({ playlist_id: event.target.value, playlistID, position: 0, uris: [uri] });
    setAnchorEl(null);
  }

  return (
    <SongContainer key={image + name + artistName + time}>
      <ListItemAvatar sx={{ flex: 1 }}>
        {image === "" ? (
          <DefaultImage />
        ) : (
          <img
            height={40}
            width={40}
            style={{ borderRadius: "4px", marginInlineEnd: "12px" }}
            src={image}
          />
        )}
      </ListItemAvatar>
      <ListItemText sx={{ flex: 5 }} primary={name} secondary={artistName} />
      <ListItemText sx={{ flex: 1 }}>
        <AddButton
          onClick={handleAddSongs}
          aria-controls={playlistOpen ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={playlistOpen ? "true" : undefined}
        >
          <AddIcon />
        </AddButton>
        <Menu
          anchorEl={anchorEl}
          open={playlistOpen}
          onClose={handlePlaylistClose}
          slotProps={{
            paper: {
              style: {
                maxHeight: 48 * 4.5,
                width: "20ch",
              },
            },
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
        >
          {data?.pages[0].items.map((item) => (
            <MenuItem value={item.id} onClick={handleMenuClick}>
              {item.name}
            </MenuItem>
          ))}
          <div ref={ref}>test{isFetchingNextPage && <LoadingSpinner />}</div>
        </Menu>
        <Snackbar
          open={snackOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message="로그인을 해주세요."
        />
      </ListItemText>

      {/* <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div> */}
      <ListItemText>{moment(time).format("mm:ss") || "Unknown"}</ListItemText>
    </SongContainer>
  );
};

export default SearchSongItem;
