import {Category, IUseQuery} from "@/interfaces";
import {useQuery} from "@tanstack/react-query";
import {CategoryApi} from "@/api/category.ts";

export const useCategoryFetcher = (props: IUseQuery<Category[]>) => {
  const {options, queryParam} = props;
  return useQuery({
    ...options,
    queryKey: ['category', queryParam],
    queryFn: async () => {
      const {data} = await CategoryApi.list(queryParam);
      return data;
    }
  })
}