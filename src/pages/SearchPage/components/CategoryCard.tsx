import { styled } from "@mui/material";

const CardText = styled("h1")({
  margin: "0px",
  fontWeight: "700",
  fontFamily: "Roboto, Arial, sans-serif",
  lineHeight: "1.167",
  fontSize: "1rem",
  padding: "16px",
  position: "absolute",
});

const CardImg = styled("img")({
  transform: "rotate(25deg) translate(18%, -2%)",
  borderFadius: "4px",
  boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px 0px",
  position: "absolute",
  width: "45%",
  right: "0px",
  bottom: "0px",
});

interface CategoryInfo {
  name: string;
  href: string;
}

const CategoryCard = ({ name, href }: CategoryInfo) => {
  const getRandomHex = () => {
    const randomValue = Math.floor(Math.random() * 16777216); // 16진수 최댓값 (2^24 - 1)
    const hexString = randomValue.toString(16);
    return "#" + "0".repeat(6 - hexString.length) + hexString; // 6자리로 패딩
  };

  const CardContainer = styled("div")({
    position: "relative",
    height: "100%",
    borderRadius: "8px",
    overflow: "hidden",
    paddingBottom: "56.25%",
    width: "100%",
    backgroundColor: getRandomHex(),
  });

  return (
    <CardContainer>
      <CardText>{name}</CardText>
      <CardImg src={href} />
    </CardContainer>
  );
};

export default CategoryCard;
