'use client'

import {useEffect} from 'react';
import {useDialogStore} from '@/store/dialog-state-store';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {toast} from 'sonner';
import {Form} from '@/components/ui/form';
import {TextField} from '@/components/common/form-controls';
import {DialogClose, DialogFooter} from '@/components/ui/dialog';
import {cn} from '@/lib/utils';
import {Button, buttonVariants} from '@/components/ui/button';
import {KeyDialogs} from "@/constant";
import {DialogActionType} from "@/interfaces";
import {CategoryApi} from "@/api/category.ts";
import {CategorySchema} from "@/schema";


export type CategoryValue = z.infer<typeof CategorySchema>;

interface ICategoryForm {
  refetch: () => void
}

export function CategoryForm(props: ICategoryForm) {
  const {refetch} = props
  const {closeDialog, dialogs} = useDialogStore();
  const queryClient = useQueryClient();

  const form = useForm<CategoryValue>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const currentDialog = dialogs[KeyDialogs.category];
  const isEdit = currentDialog?.action === DialogActionType.EDIT;

  useEffect(() => {
    if (isEdit) {
      form.reset({
        name: currentDialog.data.name,
      });
    }
  }, [isEdit, currentDialog?.data]);

  const mutation = useMutation({
    mutationFn: (variables: { id?: number; data: CategoryValue }) => {
      return isEdit && variables.id
        ? CategoryApi.update(variables.id, variables.data)
        : CategoryApi.create(variables.data);
    },
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({queryKey: ['category']}).then(() => {
        form.reset();
        toast.success(data.message);
        closeDialog(KeyDialogs.category);
        refetch()
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const onSubmit: SubmitHandler<CategoryValue> = (values) => {
    mutation.mutate({
      id: isEdit ? currentDialog?.data?.id : undefined,
      data: values,
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          name="name"
          label="Category Name"
          placeholder="Enter category name"
          require
        />
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({variant: 'outline'}))}>Cancel</DialogClose>
          <Button loading={mutation.isPending} type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
