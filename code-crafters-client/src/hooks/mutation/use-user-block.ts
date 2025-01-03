import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {UserApi} from "@/api/user.ts";
import {IMutation} from "@/interfaces";

export const useUserBlocks = (props?: IMutation) => {
  const handleSuccess = props?.handleSuccess;
  const handleError = props?.handleError;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UserApi.block,
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({queryKey: ['user']}).then(() => {
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