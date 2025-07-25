import { Grid, styled, Typography } from "@mui/material";
import PlayButton from "../../../common/components/PlayButton";
const CardContainer = styled("div")(({ theme }) => ({
  minWidth: "160px",
  width: "100%",
  //   height: "auto",
  height: "calc(100% - 72px)",
  padding: "12px",
  "&:hover": {
    borderRadius: "8px",
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));
const AlbumImage = styled("img")({
  maxWidth: 140,
  maxHeight: 140,
  marginBottom: "8px",
});
const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const Overlay = styled("div")({
  position: "absolute",
  bottom: "20px",
  right: "8px",
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});

interface CardProps {
  name: string | undefined;
  artistName?: string | undefined;
  image: string | undefined;
}

const TopResultCard = ({ name, artistName, image }: CardProps) => {
  return (
    <Grid size={{ xs: 6, sm: 6, md: 6 }}>
      <Typography variant="h1" margin={"20px 0px"}>
        Top Result
      </Typography>
      <CardContainer>
        <div style={{ position: "relative" }}>
          <AlbumImage src={image} />
        </div>

        <EllipsisTypography variant="h2">
          {name || "No name"}
        </EllipsisTypography>
        <EllipsisTypography variant="body1" color="text.secondary">
          {artistName || "No artist"}
        </EllipsisTypography>
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </CardContainer>
    </Grid>
  );
};

export default TopResultCard;
