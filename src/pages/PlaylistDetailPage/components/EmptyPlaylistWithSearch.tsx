import { styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import { SearchResultList } from "./SearchResultList";
import SearchIcon from "@mui/icons-material/Search";

const SearchForm = styled("div")({
  width: "600px",
  height: "27px",
  borderRadius: "5px",
  border: "solid 1px rgba(0, 0, 0, 0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: "1",
  opacity: "1",
});

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });
  console.log("ddd", data);
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div>
      <Typography variant="h1" my="10px" style={{ padding: "10px 0px" }}>
        Let's find something for your playlist
      </Typography>
      <SearchForm>
        {/* <SearchIcon style={{ position: "absolute" }} /> */}
        <TextField
          style={{ width: "100%", margin: '10px 0px' }}
          value={keyword}
          onChange={handleSearchKeyword}
        />
      </SearchForm>
      {data?.pages.map((item) => {
        if (!item.tracks) return false;
        return <SearchResultList list={item.tracks?.items} />;
      })}
    </div>
  );
};

export default EmptyPlaylistWithSearch;
