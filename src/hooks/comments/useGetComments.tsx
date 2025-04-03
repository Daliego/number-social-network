import { useQuery } from "@tanstack/react-query";
import {
  COMMENT_UNPROTECTED,
} from "../../services/apiService/endpoints/comment";
import { Comment } from "../../models/Comments";

const useGetComments = ({
  id,
  typeId,
}: {
  typeId: "publication" | "reply";
  id: string;
}) => {
  return useQuery({
    // Id da publicação ou do comentário
    enabled: !!id,
    queryFn: async (): Promise<Comment[]> => {
      const response = await COMMENT_UNPROTECTED.getList({
        params: {
          id,
          typeId,
        },
      });
      return response;
    },
    queryKey: ["admin", "publications"],
    refetchOnWindowFocus: false,
  });
};

export { useGetComments };
