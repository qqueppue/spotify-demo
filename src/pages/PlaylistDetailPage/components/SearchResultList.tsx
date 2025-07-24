import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
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
        console.log('no id');
    }
  };

  return (
    <Table>
      <TableBody>
        {list.map((track) => (
          <TableRow hover key={track.id}>
            <TableCell style={{ display: "flex", border: "none" }}>
              <img
                height={40}
                width={40}
                style={{ borderRadius: "4px", marginInlineEnd: "12px" }}
                src={track.album.images[0].url}
              />
              <div>
                <Typography variant="body2">
                  {track.name || "no name"}
                </Typography>
                <Typography
                  variant="caption"
                  color="var(--text-subdued, #b3b3b3)"
                >
                  {track.artists[0].name || "no name"}
                </Typography>
              </div>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <div>{track.album?.name || "no name"}</div>
            </TableCell>
            <TableCell style={{ border: "none" }}>
              <Button onClick={() => handleAddItem(track.uri)}>
                ADD
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
