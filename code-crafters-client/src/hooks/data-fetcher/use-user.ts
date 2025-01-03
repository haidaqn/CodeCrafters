import {useQuery} from "@tanstack/react-query";
import {IUseQuery, User} from "@/interfaces";
import {UserApi} from "@/api/user.ts";

export const useUserFetcher = (props: IUseQuery<User[]>) => {
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