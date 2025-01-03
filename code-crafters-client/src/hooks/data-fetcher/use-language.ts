import {useQuery} from "@tanstack/react-query";
import {IUseQuery, Language} from "@/interfaces";
import {LanguageApi} from "@/api/language.ts";

export const useLanguageFetcher = (props: IUseQuery<Language[]>) => {
  const {options, queryParam} = props;
  return useQuery({
    ...options,
    queryKey: ['language', queryParam],
    queryFn: async () => {
      const {data} = await LanguageApi.list(queryParam);
      return data;
    }
  })
}