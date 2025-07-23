import type { PlaylistTrack } from "../../../models/playlist";
import { TableCell, TableRow, Typography } from "@mui/material";
import type { Episode, Track } from "../../../models/track";
import moment from "moment";

interface DesktopPlaylistProps {
  index: number;
  item: PlaylistTrack;
}

const DesktopPlayItem = ({ item, index }: DesktopPlaylistProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  const formatDateAdded = (date: string): string => {
    let result = moment(date).format("YYYY-MM-DD");
    const yearDiff = moment().diff(moment(date), "years");
    const monthDiff = moment().diff(moment(date), "months");
    const dayDiff = moment().diff(moment(date), "days");
    const hourDiff = moment().diff(moment(date), "hours");
    if (yearDiff > 0) {
      result = yearDiff + "년전";
    } else if (monthDiff > 0) {
      result = monthDiff + "달전";
    } else if (dayDiff > 0) {
      result = dayDiff + "일전";
    } else if (hourDiff > 0) {
      result = hourDiff + "시간전";
    } else {
      result = moment().diff(moment(date), "hours") + "분전";
    }
    return result;
  };

  return (
    <TableRow>
      <TableCell>{index}</TableCell>
      <TableCell style={{ display: "flex" }}>
        <img
          height={40}
          width={40}
          style={{ borderRadius: "4px", marginInlineEnd: "12px" }}
          src={item.track.album.images[0].url}
        />
        <div>
          <Typography variant="body2">
            {item.track.name || "no name"}
          </Typography>
          <Typography variant="caption" color="var(--text-subdued, #b3b3b3)">
            {item.track.artists[0].name || "no name"}
          </Typography>
        </div>
      </TableCell>
      <TableCell>
        {isEpisode(item.track) ? "N/A" : item.track.album?.name}
      </TableCell>
      <TableCell>
        {item.added_at ? formatDateAdded(item.added_at) : "Unknown"}
      </TableCell>
      <TableCell>
        {moment(item.track.duration_ms).format("mm:ss") || "Unknown"}
      </TableCell>
    </TableRow>
  );
};

export default DesktopPlayItem;
