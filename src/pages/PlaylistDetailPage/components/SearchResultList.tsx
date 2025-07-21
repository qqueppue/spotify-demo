import { Typography } from "@mui/material";
import type { Track } from "../../../models/track";

interface SearchResultListProps {
  list: Track[];
}

export const SearchResultList = ({ list }: SearchResultListProps) => {
  return (
    <div>
      {list.map((track) => (
        <Typography variant="h2">{track.name}</Typography>
      ))}
    </div>
  );
};
