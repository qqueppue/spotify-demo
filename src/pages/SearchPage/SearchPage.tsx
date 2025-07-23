import React, { useState } from "react";
import { InputAdornment, styled, TextField } from "@mui/material";
import CategoryCardList from "./components/CategoryCardList";
import SearchIcon from "@mui/icons-material/Search";

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

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("");
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <SearchFieldContainer>
        <TextField
          id="input-with-icon-textfield"
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
      {keyword.length === 0 ? <CategoryCardList /> : <div>test</div>}
    </div>
  );
};

export default SearchPage;
