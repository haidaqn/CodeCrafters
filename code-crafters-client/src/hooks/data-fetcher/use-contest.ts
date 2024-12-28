import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {SuccessResponse} from "@/interfaces";
import {ParsedQuery} from "query-string";
import {LanguageApi} from "@/api/languageApi.ts";

type UseContestOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

interface IUseContest {
  options?: UseContestOptions<any>,
  queryParam: ParsedQuery
}

export const useContestFetcher = (props: IUseContest) => {
  const {options, queryParam} = props;

  return useQuery({
    ...options,
    queryKey: ['contest', queryParam],
    queryFn: async () => {
      const {data} = await LanguageApi.list(queryParam);
      return data;
    }
  })

}


