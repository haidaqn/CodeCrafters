import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {IMutation} from "@/interfaces";
import {LanguageApi} from "@/api";

export const useLanguageBlocks = (props?: IMutation) => {
  const handleSuccess = props?.handleSuccess;
  const handleError = props?.handleError;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: LanguageApi.block,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({queryKey: ['language']}).then(() => {
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