"use client";
import { DatePicker } from '@mantine/dates';
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar, FiClock } from 'react-icons/fi';

// Define event type for calendar
interface CalendarEvent {
  id: string;
  title: string;
  subtitle?: string;
  startTime: string;
  endTime: string;
  date: string;
  color: string; // CSS class for background color
}

// Sample events data
const eventsData: CalendarEvent[] = [
  {
    id: "event1",
    title: "Mentorship session",
    subtitle: "with Saad Bashar",
    startTime: "9 AM",
    endTime: "10 AM",
    date: "2025-03-15",
    color: "bg-blue-600",
  },
  {
    id: "event2",
    title: "Weather Forecast",
    subtitle: "App Project",
    startTime: "12 PM",
    endTime: "01:30 PM",
    date: "2025-03-15",
    color: "bg-pink-500",
  },
];

const CalendarSidebar = ({
  selectedDate,
  onDateSelect,
  events=[]
}:{
  selectedDate: any;
  onDateSelect: (date: any) => void;
  events?: any[]
}) => {
 
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
  });

  // Format the selected date for display
  const formattedSelectedDate = new Date(selectedDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  function getNextHour(timeStr: string): string {
    if(!timeStr) return timeStr;
   
    const normalized = timeStr.replace(/\s+/g, '').toLowerCase();

    const match = normalized.match(/^(\d{1,2})(?::(\d{2}))?(am|pm)$/);
    if (!match) return timeStr;

    let hour = parseInt(match[1], 10);
    let minute = match[2] ? parseInt(match[2], 10) : 0;
    let period = match[3];

    // Convert to 24-hour time
    if (period === 'pm' && hour !== 12) hour += 12;
    if (period === 'am' && hour === 12) hour = 0;

    hour += 1;

    if (hour === 24) hour = 0;

    // Convert back to 12-hour time
    period = hour >= 12 ? 'PM' : 'AM';
    let displayHour = hour % 12;
    if (displayHour === 0) displayHour = 12;

    // Keep minutes if present
    const displayMinute = match[2] ? `:${match[2]}` : '';

    return `${displayHour}${displayMinute} ${period}`;
  }


  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
    

      {/* Calendar grid */}
      <DatePicker
        className='mx-auto  w-fit'
        value={new Date(selectedDate)}
        onChange={onDateSelect}
        renderDay={(date:any) => {
          // const isHighlighted = highlightedDates.some(
          //   (d) => d.toDateString() === date.toDateString()
          // );
          const jsDate = new Date(date);

          const newLyHiglighted = new Date(selectedDate)?.toDateString() == jsDate?.toDateString()

          return (
            <div
              className={`w-7 h-7 flex items-center justify-center rounded-full 
                
                  ${newLyHiglighted ? "bg-[#0532a3] text-white " : ""}
              `}
            >
              {jsDate?.getDate()}
            </div>
          );
        }}
      />

      {/* Today's schedule */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800">Today</h3>
          <p className="text-sm text-gray-500">{formattedSelectedDate}</p>
        </div>

        {/* Time slots */}
        <div className="relative">
          {/* {timeSlots.map((time, index) => (
            <div key={time} className="flex items-start h-10">
              <span className="text-xs text-gray-400 w-12 pt-1">{time}</span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>
          ))} */}

          {/* Events */}
          {events?.map((event:any, idx:number) => 
              <div
                key={idx}
                className={`rounded-md p-2 mb-4  ${idx % 2 ?'bg-blue-600':'bg-pink-500'} text-white`}
               
              >
                
                <p className="text-xs font-medium">{'Mentorship Session'}</p>
                {event?.subtitle && <p className="text-xs opacity-90">{event?.note}</p>}
                <p className="text-xs mt-1 opacity-80">{event?.time} - {getNextHour(event?.time)}</p>
              </div>
            
          )}

          {(!events || events.length === 0) && (
            <div className="text-center text-gray-400 text-sm mt-8 min-h-[100px] flex items-center justify-center">
              No events scheduled for this day.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
