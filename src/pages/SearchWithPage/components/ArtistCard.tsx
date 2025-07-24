import { styled, Typography } from "@mui/material";
import PlayButton from "../../../common/components/PlayButton";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DefaultArtistImage from "./DefaultArtistImage";

const CardContainer = styled("div")(({ theme }) => ({
  minWidth: "160px",
  width: "100%",
  height: "100%",
  padding: "12px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));
const AlbumImageFrame = styled("div")({
  width: "100%",
  position: "relative",
});
const AlbumImage = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "50%",
});
const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  marginTop: "8px",
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
  type?: string | undefined;
  image: string | undefined;
}

const ArtistCard = ({ name, type, image }: CardProps) => {
  return (
    <CardContainer>
      <div style={{ position: "relative" }}>
        {image ? (
          <AlbumImage src={image} />
        ) : (
          <DefaultArtistImage>
            <PersonSearchIcon fontSize="large" />
          </DefaultArtistImage>
        )}
      </div>

      <EllipsisTypography variant="h2">{name || "No name"}</EllipsisTypography>
      <EllipsisTypography variant="body1" color="text.secondary">
        {type || "No artist"}
      </EllipsisTypography>
      <Overlay className="overlay">
        <PlayButton />
      </Overlay>
    </CardContainer>
  );
};

export default ArtistCard;
