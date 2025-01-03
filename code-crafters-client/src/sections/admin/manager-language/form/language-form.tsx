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
import {LanguageApi} from "@/api";
import {LanguageSchema} from "@/schema";

export type LanguageValue = z.infer<typeof LanguageSchema>;

interface ILanguageForm {
  refetch: () => void
}

export function LanguageForm(props: ILanguageForm) {
  const {refetch} = props
  const {closeDialog, dialogs} = useDialogStore();
  const queryClient = useQueryClient();

  const form = useForm<LanguageValue>({
    resolver: zodResolver(LanguageSchema),
    defaultValues: {
      name: '',
      version: '',
      isActivated: false,
    },
  });

  const currentDialog = dialogs[KeyDialogs.language];
  const isEdit = currentDialog?.action === DialogActionType.EDIT;

  useEffect(() => {
    if (isEdit) {
      form.reset({
        name: currentDialog.data.name,
        version: currentDialog.data.version,
        isActivated: currentDialog.data.isActivated,
      });
    }
  }, [isEdit, currentDialog?.data]);

  const mutation = useMutation({
    mutationFn: (variables: { id?: number; data: LanguageValue }) => {
      return isEdit && variables.id
        ? LanguageApi.update(variables.id, variables.data)
        : LanguageApi.create(variables.data);
    },
    onSuccess: ({data}) => {
      queryClient.invalidateQueries({queryKey: ['languages']}).then(() => {
        form.reset();
        toast.success(data.message);
        closeDialog(KeyDialogs.language);
        refetch()
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const onSubmit: SubmitHandler<LanguageValue> = (values) => {
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
          label="Language Name"
          placeholder="Enter language name"
          require
        />
        <TextField
          name="version"
          label="Version"
          placeholder="Enter version"
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

