"use client"
import React, { useState, useEffect } from "react";

import AboutSection from "../components/about";
import ReviewList from "../components/review";
import ScheduleModal from "../components/schedule";
import { DatePicker } from "@mantine/dates";
import { Button as MantineButton } from "@mantine/core";
import { useParams, useSearchParams } from "next/navigation";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/api/instance";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Select } from "@mantine/core";

const presetDates = [
  new Date(2025, 6, 2), // Oct 2, 2025
  new Date(2025, 6, 6), // Oct 6
  new Date(2025, 6, 20), // Oct 20
  new Date(2025, 6, 27), // Oct 27
];


const availableTimeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
];
const MentorProfile = () => {

    const params = useParams()
    const userId = params?.id 

   
    const [selectedTab, setSelectedTab] = useState<"about" | "review">("about");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string>("11:00 AM");
    const [modalOpen, setModalOpen] = useState(false);
    const [note, setNote] = useState('')
    const [title, setTitle] = useState('')
    const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);

  // Simulate loading preselected calendar dates in effect
    // useEffect(() => {
    //     setHighlightedDates(presetDates);
    //     // setSelectedDate(presetDates[0]);
    // }, []);

    const {data: response, isPending} = useQuery({
        queryFn: ()=>instance.get(`/mentors/${userId}`),
        queryKey: ['mentors', userId],
        enabled: !!userId
    })

    const { mutate: bookSession, isPending: isBooking } = useMutation({
        mutationFn: (payload: any) => instance.post("/mentors/book", payload),
        onSuccess(data)  {
            setModalOpen(false);
            toast.success('Session Booked')
        },
        onError(error) {
            toast.error('Failed to book session')
            // console.error(error);
        },
    });

  
    const mentor = response?.data?.data

    const rating = 3

    // const handleDateChange = (date: any) => {
    //     if (date && presetDates.some((d) => d.toDateString() === date.toDateString())) {
    //         return;
    //     }
    //     // setHighlightedDates((prev) => {
    //     //     if (!date) return presetDates;
    //     //     const isPreset = presetDates.some((d) => d.toDateString() === date.toDateString());
    //     //     return isPreset ? presetDates : [...presetDates, date];
    //     // });
    //     setSelectedDate(date);
    //     if (date) {
            
    //         // setHighlightedDates((prev) => {
    //         //     const exists = prev.some((d) => d.toDateString() === date.toDateString());
    //         //     return exists ? prev : [...prev, date];
    //         // });
    //     }

    //     // console.log(selectedDate)
    // };

    const handleDateChange = (date: Date | string | null) => {
        // Handle null case
        if (!date) {
            setSelectedDate(null);
            return;
        }

        // Convert string to Date if needed
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        
        // Validate it's a proper date
        if (isNaN(dateObj.getTime())) {
            setSelectedDate(null);
            return;
        }

        // Check against preset dates
        if (presetDates.some(d => d.toDateString() === dateObj.toDateString())) {
            return;
        }

        setSelectedDate(dateObj);
    };

    const handleSubmit = ()=>{

        const payload = {
            date: selectedDate,
            time: selectedSlot,
            mentor: mentor._id,
            note,
            title
        }
        bookSession(payload)
    }

  return (
    <>
      <ScheduleModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        note={note}
        title={title}
        handleChange={(val:any, label: string)=>{
          if(label === 'note') {
            setNote(val)
          } else if(label === 'title') {
            setTitle(val)
          }
        }}
        mentor={mentor}
        handleSubmit = {handleSubmit}
        isSubmitting = {isBooking}
        slot={{
          date: selectedDate
            ? selectedDate.toLocaleDateString("en-US", {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
              })
            : "",
          time: selectedSlot
        }}
      />
      
      <div className="min-h-screen mb-20">
        <div
          className="w-full rounded-b-lg text-lg flex text-[#7B0000] font-semibold uppercase justify-center items-center px-7 py-10 mb-4"
          style={{
            background:'linear-gradient(90deg, #f7cac9 0%, #ede574 100%)',
            minHeight: 140,
            
            alignItems: "center",
          }}
        >
           {mentor?.title} with {mentor?.years_of_experience} Years of Experience
        </div>

        <div className="lg:flex">
             <img src={mentor?.profileImage ||  "/images/profile.jpg"} className='lg:h-36 ml-5 lg:w-36 h-24 w-24 object-cover rounded-full border lg:mt-[-70px] mt-[-45px]' alt="" />
             <div className="pl-5">
                <div className="text-2xl mb-1 text-[#16181B]">{mentor?.firstName} {mentor?.lastName}</div>
                <div className="text-gray-600 mb-2">{mentor?.bio}.</div>
                {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>
                    {rating && rating >= i + 1 ? <span className="text-yellow-500">★</span> : <span className="text-gray-300">★</span>}
                </span>
                ))}
                <span className="ml-1 text-sm">{rating?.toFixed(1)}</span>

             </div>
        </div>

         <div className="border-b mx-7 mt-7 mb-10 border-border mb-6 flex gap-2">
            <button
            className={`py-2 px-5 font-semibold text-base transition-colors rounded-t ${selectedTab === "about" ? "bg-white text-blue-800 border-b-2 border-blue-800" : "text-muted-foreground"}`}
            onClick={() => setSelectedTab("about")}
            >
            About
            </button>
            <button
            className={`py-2 px-5 font-semibold text-base transition-colors rounded-t ${selectedTab === "review" ? "bg-white text-blue-800 border-b-2 border-blue-800" : "text-muted-foreground"}`}
            onClick={() => setSelectedTab("review")}
            >
            Review
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 px-7">
          {/* Tabs + Info */}
          <div className="flex-1">
           
            <div>
              {selectedTab === "about" ? <AboutSection mentor={mentor} /> : <ReviewList />}
            </div>
          </div>

          {/* Calendar + Book */}
          
          <div className="flex flex-col items-center w-full md:w-[400px]  gap-5 bg-white border rounded-lg p-6">
            <div className="mb-3 font-semibold ">Check for mentor's availability</div>
            
            <DatePicker
              value={selectedDate}
              onChange={handleDateChange}
              renderDay={(date) => {
                // const isHighlighted = highlightedDates.some(
                //   (d) => d.toDateString() === date.toDateString()
                // );
                 const dayDate = new Date(date)
                const newLyHiglighted = selectedDate?.toDateString() == dayDate.toDateString()

                return (
                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full 
                       
                         ${newLyHiglighted ? "bg-[#0532a3] text-white " : ""}
                    `}
                  >
                    {dayDate.getDate()}
                  </div>
                );
              }}
            />
            <div>
              <div className="mb-2 font-medium">Available Time Slots</div>
              <div className="flex flex-wrap gap-3 mb-4">
                <Select
                    data={availableTimeSlots.map((slot) => ({ value: slot, label: slot }))}
                    value={selectedSlot}
                    onChange={(value) => value && setSelectedSlot(value)}
                    placeholder="Select a time slot"
                    className="mb-4 w-full"
                />
                {/* {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`px-3 py-2 text-sm rounded border ${selectedSlot === slot ? "-100 bg-blue-50 text-blue-400 border-blue-400" : " text-blue-800"}`}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {slot}
                  </button>
                ))} */}
              </div>
              <MantineButton
                fullWidth
                size="md"
                style={{ background: "#0532a3" }}
                onClick={() => setModalOpen(true)}
              >
                Schedule a Session
              </MantineButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorProfile;