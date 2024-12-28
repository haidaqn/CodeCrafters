import {useQuery, UseQueryOptions} from "@tanstack/react-query";
import {SuccessResponse} from "@/interfaces";
import {ParsedQuery} from "query-string";
import {LanguageApi} from "@/api/languageApi.ts";

type UseLanguageOptions<T> = Omit<UseQueryOptions<SuccessResponse<T>>, 'queryFn' | 'queryKey'>

interface IUseLanguage {
  options?: UseLanguageOptions<any>,
  queryParam: ParsedQuery
}

export const useLanguageFetcher = (props: IUseLanguage) => {
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


