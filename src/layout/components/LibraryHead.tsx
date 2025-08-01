import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import useCreatePlaylist from "../../hooks/useCreatePlaylist";

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",
  justifyContent: "space-between",
});

const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  
  const handleCreatePlaylist = () => {
    createPlaylist({name: '나의 플레이리스트'});
  };

  return (
    <Head>
      <Box display={"flex"}>
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon />
      </Button>
    </Head>
  );
};

export default LibraryHead;
