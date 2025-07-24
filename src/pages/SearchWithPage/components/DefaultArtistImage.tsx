import styled from "@emotion/styled";
import { Box } from "@mui/material";

const DefaultArtistImage = styled(Box)({
  backgroundColor: "#282828",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  minWidth: "128px",
  width: "100%",
//   paddingBottom: "100%",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
});

export default DefaultArtistImage;
