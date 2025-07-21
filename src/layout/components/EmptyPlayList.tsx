import { Button, Card, styled, Typography } from "@mui/material";

const EmptyPlayListCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "20px",
  borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

const EmptyPlayList = () => {
  return (
    <EmptyPlayListCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <CreatePlaylistButton>Create playlist</CreatePlaylistButton>
    </EmptyPlayListCard>
  );
};

export default EmptyPlayList;
