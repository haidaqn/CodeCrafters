import {useQuery} from "@tanstack/react-query";
import {Contest, IUseQuery} from "@/interfaces";
import {LanguageApi} from "@/api/language.ts";

export const useContestFetcher = (props: IUseQuery<Contest>) => {
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


