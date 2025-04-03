import { useQuery } from "@tanstack/react-query";
import { PUBLICATION_UNPROTECTED } from "../../services/apiService/endpoints/publication";
import { Publication } from "../../models/Publication";

const useGetPublications = () => {
  return useQuery({
    queryFn: async (): Promise<Publication[]> => {
      const response = await PUBLICATION_UNPROTECTED.getList();
      return response.data;
    },
    queryKey: ["admin", "publications"],
    refetchOnWindowFocus: false,
  });
};

export { useGetPublications };
