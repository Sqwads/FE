import React, { useState } from "react";
import { Modal, Textarea, Button as MantineButton, TextInput } from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import * as yup from "yup";


interface ScheduleModalProps {
  opened: boolean;
  onClose: () => void;
  slot: { date: string, time: string };
  mentor: any;
  handleSubmit: ()=>void,
  note?: string,
  title?: string,
  handleChange: (e:any, b: string)=>void,
  isSubmitting: boolean
}


const ScheduleModal = ({ opened, onClose, slot, mentor, note, isSubmitting, handleChange, handleSubmit, title }: ScheduleModalProps) => {
  

  return (
    <Modal opened={opened} onClose={onClose} title="Schedule a session" centered size="md">
      <div className="flex flex-col items-center gap-2 mb-4">
        <img src={ mentor?.profileImage || '/images/profile.jpg' } alt={mentor?.name} className="w-24 border h-24 rounded-full object-cover" />
        <div>
          <div className="font-semibold">{mentor?.name}</div>
          <div className="text-sm text-muted-foreground">{mentor?.title}</div>
        </div>
      </div>
      <div className="flex flex-row mb-4 gap-2 items-center justify-center">
        <div className="border px-3 py-2 rounded bg-muted text-sm font-medium">{slot?.date}</div>
        <div className="border px-3 py-2 rounded bg-blue-50 text-blue-700 text-sm font-medium">{slot?.time}</div>
      </div>
        <TextInput
          className="mb-4"
          placeholder="Enter Session Title"
          label="Session Subject"
          onChange={(e)=>handleChange(e.target.value, 'title')}
          value={title}
        />

        <Textarea
          label="Anything else to say? (optional)"
          placeholder="Type here..."
          minRows={3}
          value={note}
          onChange={(e)=>handleChange(e.target.value, 'note')}
        />
        <MantineButton disabled={isSubmitting}  onClick={handleSubmit} type="submit" className="w-full mt-5" loading={false} style={{background: "#0532a3"}}>
          {isSubmitting? 'Submitting...':'Confirm Booking'}
        </MantineButton>
      
    </Modal>
  );
};

export default ScheduleModal;