"use client"
import React from 'react';
import { Button, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import toast from 'react-hot-toast';



const Security = () => {

    const validtor = Yup.object({
        oldPassword: Yup.string().required('Old Password is required'),
        newPassword: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match')
    })

    const form = useForm({
        validate: yupResolver(validtor),
        initialValues: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
    });

     const { mutate, isPending } = useMutation({
        mutationFn: (data: any) => instance.post('/auth/update-password', data),
        mutationKey: ['password', 'update'],
        onSuccess() {
            toast.success("Password Updated!!!");
        },
        onError(error: any) {
            toast.error(error?.response?.data?.message || 'Action Failed');
        },
    });

    const handleSubmit = (values: typeof form.values)=>{
        mutate({
            oldPassword: values.oldPassword,
            newPassword: values?.newPassword
        })
    }
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-card-foreground mb-6">SECURITY</h3>
      
      <form onSubmit={form.onSubmit(handleSubmit)}>
      <div className="space-y-4">
        <TextInput
          label="Old Password"
          type="password"
          placeholder="••••••"
          {...form.getInputProps('oldPassword')}
        />
        
        <TextInput
          label="New Password"
          type="password"
          placeholder="••••••"
          description="Minimum of 8 characters"
          {...form.getInputProps('newPassword')}
        />
        
        <TextInput
          label="Confirm New Password"
          type="password"
          placeholder="••••••"
          {...form.getInputProps('confirmPassword')}
        />

         <Button disabled={isPending} type="submit" className="px-6 mt-4">
            {isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
      </form>
    </div>
  );
};

export default Security;