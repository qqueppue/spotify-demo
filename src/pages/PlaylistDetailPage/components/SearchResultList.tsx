import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import type { Track } from "../../../models/track";
import useAddPlaylistItem from "../../../hooks/useAddPlaylistItem";
import { useParams } from "react-router";

interface SearchResultListProps {
  list: Track[];
}

export const SearchResultList = ({ list }: SearchResultListProps) => {
  const { id } = useParams<{ id: string }>();
  const { mutate: addSearchItems } = useAddPlaylistItem();
  const handleAddItem = (uri: string) => {
    if (id) {
      addSearchItems({ playlist_id: id, position: 0, uris: [uri] });
    } else {
      console.log("no id");
    }
  };

  return (
    <List style={{ margin: '16px 0px' }}>
      {list.map((track) => (
        <ListItem key={track.id}>
          <ListItemAvatar>
            <img
              height={40}
              width={40}
              style={{ borderRadius: "4px", marginInlineEnd: "12px" }}
              src={track.album?.images[0].url}
            />
          </ListItemAvatar>
          <ListItemText
            sx={{ flex: 3 }}
            primary={track.name || "no name"}
            secondary={track.artists[0].name || "no name"}
          />
          <ListItemText
            sx={{
              flex: 2,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            primary={track.album?.name || "no name"}
          />
          <ListItemText sx={{ flex: 1 }}>
            <Button onClick={() => handleAddItem(track.uri)}>ADD</Button>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
