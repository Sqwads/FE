"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { FiArrowLeft, FiImage } from 'react-icons/fi';
import { RichTextEditor, Link as RichTextLink } from '@mantine/tiptap';
import { useRouter } from 'next/navigation';
import { Textarea, TextInput } from '@mantine/core';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import * as yup from 'yup';
import { useForm, yupResolver } from '@mantine/form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/api/instance';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';


const CreatePostModule = () => {
  const router = useRouter();
  
 
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [textContent, setTextContent] = useState('');
  const [contentLength, setContentLength] = useState(0);
  const searchParams = useSearchParams();
  const queryParam = searchParams.get('edit');
  const queryClient = useQueryClient()

  const {data: response, isPending: isFetchingBlog} = useQuery({
    queryFn: ()=>instance.get(`/blog/${queryParam}`),
    queryKey: ['getBlogEdit'],
    enabled: !!queryParam,
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: textContent,
    editorProps: {
      attributes: {
        class: 'prose',
      },
    },
    onUpdate({ editor }) {
      const value = editor.getHTML();
      setTextContent(value);
      // console.log('Content updated:', value);
      setContentLength(editor.getText().length);
    },
    immediatelyRender: false,
  });


  useEffect(() => {
    if (response?.data?.data) {
      const blogData = response.data.data;
      form.setValues({
        title: blogData?.title,
        final_thought: blogData?.final_thought || '',
      });

      setTextContent(blogData?.content || '');
      
      if (editor && blogData?.content) {
        editor.commands.setContent(blogData.content); // this will populate the editor
      }

      setImageUrl(blogData.cover_image || null);
    }
  }, [queryParam, response, editor]);

  const handleGoBack = () => {
    router.push('/blog-manager');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        setFile(file);
        reader.onload = () => {
            setImageUrl(reader?.result as string);
        };
        reader.readAsDataURL(file);
    }
    
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required').max(300, 'Title is too long'),
    final_thought: yup.string().max(700, 'Final thought is too long'),
  });

  const form = useForm({
    initialValues: {
      title: '',
      final_thought: '',
    },
    validate: yupResolver(validationSchema),
  })

  const {mutate, isPending} = useMutation({
    mutationFn: (data: any) => instance.post('/blog', data),
    mutationKey: ['createBlogPost'],
    onSuccess(data, variables, context) {
        toast.success('Post created successfully');
        router.push('/blog-manager');
    },
    onError(error:any, variables, context) {
      toast.error(error?.response?.data?.message || 'An error occurred while creating the post');
    },
  })

  const {mutate: editBlog, isPending: editIsPending} = useMutation({
    mutationFn: (data: any) => instance.patch('/blog', data),
    mutationKey: ['editBlogPost'],
    onSuccess(data, variables, context) {
        toast.success('Post Edited successfully');
        router.push('/blog-manager');
        queryClient.invalidateQueries({
          queryKey: ['get-blog-posts'],
        });
    },
    onError(error:any, variables, context) {
      toast.error(error?.response?.data?.message || 'An error occurred while editing the post');
    },
  })

  const handleSubmit = (values:any)=>{
   
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('final_thought', values.final_thought);
    formData.append('content', textContent);

    if (file) {
      formData.append('file', file);
    }
    if (queryParam) {
      formData.append('blogId', queryParam);
    }
    queryParam ? editBlog(formData) : mutate(formData);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">

        <div className="mb-8">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 mb-6"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
        
          <div className="text-left">
            <h1 className="text-2xl font-semibold text-blue-800 mb-2">Create Post</h1>
            <p className="text-gray-600">An Overview of all sqwads mentors</p>
          </div>
        </div>

   
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 relative">
         
          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg py-10  text-center hover:border-gray-400 transition-colors duration-300">
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {imageUrl &&  <img src={imageUrl} className='h-48 mx-auto mb-7 object-cover' alt="url" />}
              <label htmlFor="coverImage" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <FiImage className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Add cover image</p>
              
                </div>
              </label>
             
            </div>
          </div>

        
          <div className="space-y-6 mb-24">

            <form onSubmit={form.onSubmit(handleSubmit)}>
      
          <div className="mb-5">
            <TextInput
              label="Title"
              placeholder="e.g. How to present your projects"
              {...form.getInputProps('title')}
            />
          </div>
            
            <div className='mb-5'>
              <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <span className="text-sm text-gray-500">
                {contentLength}/1024
              </span>
              </div>

              {editor && (
                <RichTextEditor editor={editor} style={{ minHeight: 300 }}>
                  <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.ClearFormatting />
                      <RichTextEditor.Highlight />
                      <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                      <RichTextEditor.Subscript />
                      <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>

                  <RichTextEditor.Content style={{ minHeight: 200 }} />
                </RichTextEditor>
              )}

            </div>
      
            <Textarea
              className="w-full border rounded p-3 resize-y"
              rows={6}
              label="Final thought"
              placeholder='e.g. "I hope this helps you in your journey!"'
              {...form.getInputProps('final_thought')}
            />

              <button 
                className="px-8 disabled:opacity-50 disabled:cursor-not-allowed mt-7 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                type='submit'
                disabled={isPending || editIsPending}
              >
                {(isPending || editIsPending) ? 'Saving Post...' : 'Save Post'}
              </button>
            
            </form>

          </div>

     
          

        </div>
      </div>
    </div>
  );
};

const CreatePostPage = ()=>{
  return(
    <Suspense>
      <CreatePostModule />
    </Suspense>
  )
}

export default CreatePostPage;