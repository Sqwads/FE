"use client"
import { Select, Switch } from "@mantine/core";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { FiInfo, FiCalendar, FiX } from "react-icons/fi";

// Define day type
type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

// Define time slot interface
interface TimeSlot {
  startTime: string;
  endTime: string;
}

// Define available days state interface
interface AvailableDaysState {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}

// Define time slots state interface
interface TimeSlotsState {
  sunday: TimeSlot[];
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
}

// Define time option interface
interface TimeOption {
  value: string;
  label: string;
}

const MentorAvailabilityPage = () => {
  const router = useRouter();
  
  // Initial state matching the UI: Only Sunday available by default
  const [availableDays, setAvailableDays] = useState<AvailableDaysState>({
    sunday: true,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false
  });

  // Initial time slots matching the UI: Only Sunday has a default slot
  const [timeSlots, setTimeSlots] = useState<TimeSlotsState>({
    sunday: [{ startTime: "08:45 AM", endTime: "02:00 PM" }],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: []
  });

  // Generate time options for dropdowns
  const generateTimeOptions = (): TimeOption[] => {
    const times: string[] = [];
    const hours = ["12", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"];
    const minutes = ["00", "15", "30", "45"];
    const periods = ["AM", "PM"];

    periods.forEach(period => {
      hours.forEach(hour => {
        minutes.forEach(minute => {
          times.push(`${hour}:${minute} ${period}`);
        });
      });
    });
    times.sort((a, b) => {
      const [timeA, periodA] = a.split(' ');
      const [hourA, minuteA] = timeA.split(':').map(Number);
      const [timeB, periodB] = b.split(' ');
      const [hourB, minuteB] = timeB.split(':').map(Number);

      let hA = hourA === 12 ? (periodA === 'AM' ? 0 : 12) : (periodA === 'PM' ? hourA + 12 : hourA);
      let hB = hourB === 12 ? (periodB === 'AM' ? 0 : 12) : (periodB === 'PM' ? hourB + 12 : hourB);

      if (hA !== hB) return hA - hB;
      return minuteA - minuteB;
    });

    return times.map(time => ({ value: time, label: time }));
  };

  const timeOptions = generateTimeOptions();

  // Handle day toggle
  const handleDayToggle = (day: DayOfWeek): void => {
    setAvailableDays(prev => {
      const isCurrentlyAvailable = prev[day];
      const newState = { ...prev, [day]: !isCurrentlyAvailable };
      
      if (!isCurrentlyAvailable && timeSlots[day].length === 0) {
        setTimeSlots(prevSlots => ({
          ...prevSlots,
          [day]: [{ startTime: "09:00 AM", endTime: "05:00 PM" }]
        }));
      }
      
      return newState;
    });
  };

  // Handle time slot change
  const handleTimeChange = (day: DayOfWeek, index: number, field: 'startTime' | 'endTime', value: string | null): void => {
    if (value === null) return;
    
    setTimeSlots(prev => {
      const daySlots = [...prev[day]];
      daySlots[index] = { ...daySlots[index], [field]: value };
      return { ...prev, [day]: daySlots };
    });
  };

  // Handle removing a time slot
  const handleRemoveTimeSlot = (day: DayOfWeek, index: number): void => {
    setTimeSlots(prev => {
      const daySlots = [...prev[day]];
      if (daySlots.length > 1) { // Only allow removal if more than one slot exists
         daySlots.splice(index, 1);
      }
      return { ...prev, [day]: daySlots };
    });
  };

  // Handle adding a new time slot
  const handleAddTimeSlot = (day: DayOfWeek): void => {
     if (!availableDays[day]) {
        handleDayToggle(day); // Toggle on first
        if (timeSlots[day].length === 0) {
            setTimeSlots(prev => ({
              ...prev,
              [day]: [{ startTime: "09:00 AM", endTime: "05:00 PM" }]
            }));
        }
     } else {
        setTimeSlots(prev => ({
          ...prev,
          [day]: [...prev[day], { startTime: "09:00 AM", endTime: "05:00 PM" }]
        }));
     }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    const formattedAvailability = Object.keys(availableDays).map(day => {
      const typedDay = day as DayOfWeek;
      return {
        day: typedDay,
        available: availableDays[typedDay],
        timeSlots: availableDays[typedDay] && timeSlots[typedDay].length > 0 ? timeSlots[typedDay] : []
      };
    });
    
    console.log('Availability data:', formattedAvailability);
    // router.push('/next-step');
  };

  // Handle back button
  const handleBack = (): void => {
    // router.back();
  };

  const daysOrder: DayOfWeek[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm w-full">
        <h1 className="text-3xl text-center text-[#001D69] font-bold mb-6">
          Set your availability
        </h1>

        <div className="bg-blue-50 p-4 rounded-md mb-8 flex items-start">
          <FiInfo className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
          <p className="text-blue-700 text-sm">
            The times you choose here will be accessible to mentees worldwide; you can always change it later
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {daysOrder.map((day) => (
              <div key={day} className="border-b pb-4 last:border-b-0">
                {/* Main row for Switch, Day Name, and Right-side content */}
                <div className="flex items-center justify-between mb-3">
                  {/* Left side: Switch and Day Name */}
                  <div className="flex items-center w-1/3"> {/* Give left side a width */} 
                    <Switch 
                      checked={availableDays[day]}
                      onChange={() => handleDayToggle(day)}
                      size="md"
                      color="blue"
                      classNames={{ track: availableDays[day] ? 'bg-blue-600' : 'bg-gray-200' }}
                    />
                    <span className="ml-3 font-medium text-[#001D69] uppercase tracking-wider text-sm">{day}S</span>
                  </div>

                  {/* Right side: Centered Unavailable text OR empty space, plus Calendar Icon */} 
                  <div className="flex items-center justify-end flex-grow pl-4"> {/* Right side takes remaining space */} 
                    {!availableDays[day] && (
                       <span className="text-gray-500 text-sm text-center flex-grow">Unavailable</span>
                    )}
                    {/* Calendar Icon - Always visible */} 
                    <button 
                      type="button"
                      className="text-blue-600 hover:text-blue-800 ml-4 flex-shrink-0" // Added flex-shrink-0
                      onClick={() => handleAddTimeSlot(day)}
                    >
                      <FiCalendar className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Time Slots (only if available and exist) - Indented */} 
                {availableDays[day] && timeSlots[day].length > 0 && (
                  <div className="ml-10 space-y-2">  
                    {timeSlots[day].map((slot, index) => (
                      <div key={index} className="flex items-center space-x-2"> 
                        <Select
                          data={timeOptions}
                          value={slot.startTime}
                          onChange={(value) => handleTimeChange(day, index, 'startTime', value)}
                          className="w-36"
                          searchable
                          size="sm"
                        />
                        <span className="text-gray-500 text-sm">to</span>
                        <Select
                          data={timeOptions}
                          value={slot.endTime}
                          onChange={(value) => handleTimeChange(day, index, 'endTime', value)}
                          className="w-36"
                          searchable
                          size="sm"
                        />
                        {/* Show remove button only if there's more than one slot */}
                        {timeSlots[day].length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => handleRemoveTimeSlot(day, index)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <FiX className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Navigation buttons - Aligned to the right */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium"
              >
                Back
              </button>
              <Link href='/mentor_individual_intro'>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-[#001D69] text-white rounded-md hover:bg-blue-800 text-sm font-medium"
                    >
                        Continue
                    </button>
              </Link>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MentorAvailabilityPage;

