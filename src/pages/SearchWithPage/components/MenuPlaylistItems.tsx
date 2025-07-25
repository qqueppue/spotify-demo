import type { IPlaylist } from "../../../models/playlist";
import useAddPlaylistItem from "../../../hooks/useAddPlaylistItem";
import { MenuItem } from "@mui/material";

interface MenuPlaylistProps {
  playlists: IPlaylist[];
  closeMenu: () => void;
}

const MenuPlaylistItems = ({ playlists, closeMenu }: MenuPlaylistProps) => {
  const { mutate: addSearchItems } = useAddPlaylistItem();
  console.log(playlists);

  const handleMenuClick = (event) => {
    console.log("event", event);
    //  addSearchItems({ playlist_id: event.target.value, playlistID, position: 0, uris: [uri] });
    //  closeMenu();
  };

  return (
    <div>
      {playlists.map((item) => (
        <MenuItem onClick={handleMenuClick}>{item.name || "no name"}</MenuItem>
      ))}
    </div>
  );
};

export default MenuPlaylistItems;
