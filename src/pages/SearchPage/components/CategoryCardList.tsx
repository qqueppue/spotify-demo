import { Grid } from "@mui/material";
import useGetCategoriesItem from "../../../hooks/useGetCategoriesItem";
import CategoryCard from "./CategoryCard";

const CategoryCardList = () => {
  const { data, error, isLoading } = useGetCategoriesItem();
  console.log("cate", data);

  return (
    <Grid container spacing={2}>
      {data?.categories.items.map((item) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
          <div style={{padding: '16px 0px 0px 16px'}}>
            <CategoryCard name={item.name} href={item.icons[0].url} />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryCardList;
