import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {SuccessResponse, User} from "@/interfaces";
import {ParsedQuery} from "query-string";
import {UserApi} from "@/api/userApi.ts";


type UseUserOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

interface IUseUser {
  options?: UseUserOptions<User[]>,
  queryParam: ParsedQuery
}

export const useUserFetcher = (props: IUseUser) => {
  const {options, queryParam} = props;

  return useQuery({
    ...options,
    queryKey: ['user', queryParam],
    queryFn: async () => {
      const {data} = await UserApi.list(queryParam);
      return data;
    },
  });
}