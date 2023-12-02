import { useInfiniteQuery, useQuery } from "react-query";

import { get_conversations_api } from "../../../ApiRoutes";
import MainApi from "../../../MainApi";
import { onErrorResponse } from "../../../api-error-response/ErrorResponses";

const getData = async (params, pageParam) => {
  const { channelId, apiFor, page_limit, offset } = params;

  const { data } = await MainApi.get(
    `${get_conversations_api}?${apiFor}=${
      channelId === "admin" ? 0 : channelId
    }?&offset=${pageParam}&limit=${page_limit}`
  );
  return data;
};
export const useGetConversation = (params) => {
  return useInfiniteQuery(
    "get_conversation",
    ({ pageParam = params.offset }) => getData(params, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.messages.length > 0 ? nextPage : undefined;
      },
      enabled: false,
      onError: onErrorResponse,
    }
  );
};
