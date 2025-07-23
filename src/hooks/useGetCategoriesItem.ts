import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { searchCategoryList } from "../apis/searchApi";

const useGetCategoriesItem = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["categories-list"],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return searchCategoryList(clientCredentialToken);
    },
  });
};

export default useGetCategoriesItem;
