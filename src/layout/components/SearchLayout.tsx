import { InputAdornment, styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";

const SearchFieldContainer = styled("div")({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  minWidth: "0px",
  padding: "0px",
  margin: "0px 0px 10px",
  border: "0px",
  verticalAlign: "top",
  width: "100%",
  maxWidth: "364px",
  height: "48px",
});

const SearchField = styled(TextField)({
  borderRadius: "50px",
  backgroundColor: "rgb(51, 51, 51)",
  color: "white",
});

const SearchLayout = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    navigate(`/search/${keyword}`);
  }, [keyword]);

  return (
    <div>
      <SearchFieldContainer>
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          value={keyword}
          onChange={handleSearchKeyword}
        />
      </SearchFieldContainer>
      <Outlet />
    </div>
  );
};

export default SearchLayout;
