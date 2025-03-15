"use client"
import { Textarea, TextInput } from '@mantine/core';
import {  UseFormReturnType } from '@mantine/form';
import React, { useEffect, useRef, useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { BasicDetailsValidator } from '../validators';

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
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

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
                        // placeholder='For e.g. Design a Weather Forecast Application for the Nigeria National Space Research and Development (NASRDA)'
                        />
                    </div>

                    <div className="mb-4">
                        <div className="mb-1  text-[#16181BB2] text-sm lg:text-base">Project Overview</div>
                        <Textarea
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
                        <Textarea
                            styles={{
                                input: { fontSize: '1rem' }
                            }}
                            size='xl'
                            {...form?.getInputProps('features')}
                            disabled={previewMode}
                        />
                    </div>

                    {!previewMode &&
                        <div className="flex justify-end mt-10">
                            <button type='submit' className='py-3 px-5 rounded-md bg-[#001D69] rounded-md text-sm text-[white]'>Proceed to Next</button>
                        </div>
                    }
                </form>
            </div>
        </>
    );
}

export default BasicDetails;