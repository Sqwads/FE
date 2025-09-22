"use client"
import { TextInput, Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { useEffect, useRef, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { RichTextEditor, Link as RichTextLink } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '@mantine/tiptap/styles.css';

const BasicDetails = ({
    handleProceed,
    form,
    file,
    imageSrc,
    handleFileChange,
    previewMode
}: {
    handleProceed?: () => void;
    handleFileChange?: (e: any) => void;
    form?: UseFormReturnType<any>,
    file?: any,
    imageSrc?: any,
    previewMode?: boolean
}) => {
    const fileInputRef = useRef<any>(null);
    
    const featuresEditor = useEditor({
        extensions: [StarterKit],
        content: form?.values.features || '',
        editorProps: {
            attributes: {
                class: 'prose',
            },
        },
        onUpdate({ editor }) {
            const value = editor.getHTML();
            form?.setFieldValue('features', value);
        },
        immediatelyRender: false,
        editable: !previewMode, 
    });

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Update editor content when form values change (for edit mode)
    useEffect(() => {
        if (featuresEditor && form?.values.features) {
            featuresEditor.commands.setContent(form.values.features);
        }
    }, [form?.values.features, featuresEditor]);

    // Update editable state when previewMode changes
    useEffect(() => {
        if (featuresEditor) {
            featuresEditor.setEditable(!previewMode);
        }
    }, [previewMode, featuresEditor]);

    return (
        <>
            <div className={`font-semibold mb-7 ${previewMode && 'bg rounded px-4 py-2   bg-[#0234B81A] text-[#0234B8]'}`}>
                BASIC DETAILS
            </div>

            {!previewMode &&
            <div className={`border mb-4 lg:mx-0 mx-auto rounded flex flex-col items-center justify-center w-48 h-40`}>
                {imageSrc ?
                    <img
                        src={imageSrc} className='h-full rounded w-full object-cover cursor-pointer'
                        onClick={handleImageClick}
                    /> :

                    <>
                        <div
                            className="bg-[#F5F5F5] mb-2 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer"
                            onClick={handleImageClick}
                        >
                            <BsUpload />
                        </div>
                        <div className="font-semibold text-sm">Upload a cover image</div>
                    </>

                }
            </div>
            }

            <div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {/* @ts-ignore */}
                <form onSubmit={form.onSubmit(handleProceed)}>
                    <div className="mb-4">
                        <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Project Name</div>
                        <TextInput
                            styles={{
                                input: { fontSize: '1rem' }
                            }}
                            size='md'
                            {...form?.getInputProps('name')}
                            placeholder='For e.g Weather Forecast App'
                            disabled={previewMode}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Brief Information (15 word max)</div>
                        <TextInput
                            styles={{
                                input: { fontSize: '1rem' }
                            }}
                            size='md'
                            {...form?.getInputProps('description')}
                            disabled={previewMode}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Project Overview</div>
                        <Textarea
                            className="w-full resize-y rounded p-3"
                            rows={10}
                            styles={{
                                input: { fontSize: '1rem' }
                            }}
                            size='xl'
                            {...form?.getInputProps('overview')}
                            disabled={previewMode}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Key Features</div>
                        {featuresEditor && (
                            <RichTextEditor editor={featuresEditor} style={{ minHeight: 200 }}>
                                {!previewMode && (
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
                                )}
                                <RichTextEditor.Content style={{ minHeight: 200 }} />
                            </RichTextEditor>
                        )}
                    </div>

                    {!previewMode &&
                        <div className="flex justify-end mt-10">
                            <button type='submit' className='py-3 px-5 rounded-md bg-[#001D69] text-sm text-[white]'>Proceed to Next</button>
                        </div>
                    }
                </form>
            </div>
        </>
    );
}

export default BasicDetails;