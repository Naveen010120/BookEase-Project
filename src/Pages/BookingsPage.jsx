import { useEffect, useState } from "react";
import AccountNavigation from "./AccountNavigation";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "./BookingDates";

function BookingsPage() {
  let [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div className="px-2 md:px-6">
      <AccountNavigation />
      <div className="mt-4 md:mt-6">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id || booking.place}
              className="flex flex-col md:flex-row gap-2 md:gap-4 bg-gray-200 rounded-2xl overflow-hidden p-2 md:p-4"
            >
              {/* Image Section */}
              <div className="w-full md:w-48 h-42">
                <PlaceImg place={booking.place} />
              </div>

              {/* Booking Details */}
              <div className="py-2 md:py-3 pr-2 md:pr-3 flex-1">
                <h2 className="text-lg md:text-xl font-semibold">
                  {booking.place.title}
                </h2>
                <BookingDates booking={booking} />

                {/* Nights Count */}
                <div className="text-lg md:text-xl mt-2">
                  <p className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 md:w-6 md:h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                      />
                    </svg>
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    )}{" "}
                    nights
                  </p>
                </div>

                {/* Total Price */}
                <p className="flex items-center gap-1 text-xl md:text-2xl mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 md:w-7 md:h-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                  Total price: ₹{booking.price}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default BookingsPage;
