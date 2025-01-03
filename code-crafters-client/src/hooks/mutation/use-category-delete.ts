import {IMutation} from "@/interfaces";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {CategoryApi} from "@/api/category.ts";

export const useCategoryDelete = (props?: IMutation) => {
  const handleSuccess = props?.handleSuccess;
  const handleError = props?.handleError;
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: CategoryApi.delete,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({queryKey: ['category']}).then(() => {
        toast.success(data.message);
        if (handleSuccess) {
          handleSuccess();
        }
      });

    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
      if (handleError) {
        handleError();
      }
    },
  })
}