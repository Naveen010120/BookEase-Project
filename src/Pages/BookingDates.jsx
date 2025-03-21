/* eslint-disable react/prop-types */
import React from 'react';
import { format, differenceInCalendarDays } from 'date-fns';

function BookingDates({ booking }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-t border-gray-300 mt-4 py-2 text-gray-500">
      
      {/* Check-in Date */}
      <div className="flex gap-1 items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        {format(new Date(booking.checkIn), 'yyyy-MM-dd')}
      </div>

      &rarr;

      {/* Check-out Date */}
      <div className="flex gap-1 items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
        {format(new Date(booking.checkOut), 'yyyy-MM-dd')}
      </div>

      {/* Number of Nights */}
      <p className="flex gap-1 items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5 sm:w-6 sm:h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
        {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} nights
      </p>

    </div>
  );
}

export default BookingDates;
