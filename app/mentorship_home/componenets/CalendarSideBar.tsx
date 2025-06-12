"use client";
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

const CalendarSidebar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2)); // March 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 2, 15)); // March 15, 2025

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Get the last day of the previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    
    // Days from previous month to display
    const prevMonthDays = [];
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      prevMonthDays.push({
        day: prevMonthLastDay - i,
        month: month - 1,
        year,
        isCurrentMonth: false
      });
    }
    
    // Days from current month
    const currentMonthDays = [];
    for (let i = 1; i <= totalDays; i++) {
      currentMonthDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true
      });
    }
    
    // Days from next month to display
    const nextMonthDays = [];
    const totalCells = 42; // 6 rows x 7 days
    const remainingCells = totalCells - (prevMonthDays.length + currentMonthDays.length);
    for (let i = 1; i <= remainingCells; i++) {
      nextMonthDays.push({
        day: i,
        month: month + 1,
        year,
        isCurrentMonth: false
      });
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  // Format date as YYYY-MM-DD for event lookup
  const formatDateKey = (date: Date): string => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  // Get events for the selected date
  const getEventsForDate = (date: Date): CalendarEvent[] => {
    const dateKey = formatDateKey(date);
    return eventsData.filter(event => event.date === dateKey);
  };

  // Get today's events
  const todaysEvents = getEventsForDate(selectedDate);

  // Handle month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  // Handle date selection
  const handleDateClick = (day: number, month: number, year: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  // Check if a date is the selected date
  const isSelectedDate = (day: number, month: number, year: number) => {
    return selectedDate.getDate() === day && 
           selectedDate.getMonth() === month && 
           selectedDate.getFullYear() === year;
  };

  // Check if a date has events
  const hasEvents = (day: number, month: number, year: number) => {
    const date = new Date(year, month, day);
    const dateKey = formatDateKey(date);
    return eventsData.some(event => event.date === dateKey);
  };

  // Generate time slots for the day view
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
  });

  // Format the selected date for display
  const formattedSelectedDate = selectedDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Get the days of the week
  const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Get all calendar days
  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Previous month"
          >
            <FiChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Next month"
          >
            <FiChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="mb-6">
        {/* Days of week header */}
        <div className="grid grid-cols-7 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isSelected = isSelectedDate(day.day, day.month, day.year);
            const hasEvent = hasEvents(day.day, day.month, day.year);
            
            return (
              <button
                key={index}
                onClick={() => handleDateClick(day.day, day.month, day.year)}
                className={`
                  h-10 w-10 flex items-center justify-center rounded-full text-sm
                  ${!day.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                  ${isSelected ? 'bg-blue-600 text-white font-medium' : 'hover:bg-gray-100'}
                `}
              >
                <div className="relative">
                  {day.day}
                  {hasEvent && !isSelected && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's schedule */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-gray-800">Today</h3>
          <p className="text-sm text-gray-500">{formattedSelectedDate}</p>
        </div>

        {/* Time slots */}
        <div className="relative">
          {timeSlots.map((time, index) => (
            <div key={time} className="flex items-start h-10">
              <span className="text-xs text-gray-400 w-12 pt-1">{time}</span>
              <div className="flex-1 border-t border-gray-100"></div>
            </div>
          ))}

          {/* Events */}
          {todaysEvents.map((event) => {
            // Calculate position based on time
            const startHour = parseInt(event.startTime.split(' ')[0]);
            const startPeriod = event.startTime.split(' ')[1];
            const startHour24 = startPeriod === 'PM' && startHour !== 12 ? startHour + 12 : startHour;
            
            // Calculate top position (each hour = 40px, starting from 8 AM)
            const topPosition = (startHour24 - 8) * 40;
            
            // Calculate height based on duration
            const endHour = parseInt(event.endTime.split(' ')[0]);
            const endPeriod = event.endTime.split(' ')[1];
            const endHour24 = endPeriod === 'PM' && endHour !== 12 ? endHour + 12 : endHour;
            
            // Calculate duration in hours
            let duration = endHour24 - startHour24;
            if (event.endTime.includes(':')) {
              // Add partial hour if minutes are specified
              const endMinutes = parseInt(event.endTime.split(':')[1]);
              duration += endMinutes / 60;
            }
            
            // Height based on duration (each hour = 40px)
            const height = duration * 40;

            return (
              <div
                key={event.id}
                className={`absolute left-12 right-0 rounded-md p-2 ${event.color} text-white`}
                style={{
                  top: `${topPosition}px`,
                  height: `${height - 4}px`, // Subtract for gap
                }}
              >
                <p className="text-xs font-medium">{event.title}</p>
                {event.subtitle && <p className="text-xs opacity-90">{event.subtitle}</p>}
                <p className="text-xs mt-1 opacity-80">{event.startTime} - {event.endTime}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
