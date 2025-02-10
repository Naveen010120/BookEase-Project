import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLinks from './AddressLinks';
import PlaceGallery from './PlaceGallery';
import BookingDates from './BookingDates';
import { differenceInCalendarDays } from 'date-fns';

function BookingPage() {
    let { id } = useParams();
    let [booking, setBookings] = useState(null);

    useEffect(() => {
        axios.get('/bookings')
            .then(response => {
                let foundBooking = response.data.find(({ _id }) => _id.toString() === id);
                if (foundBooking) {
                    setBookings(foundBooking);
                }
            })
            .catch(error => console.error("Error fetching bookings:", error));
    }, [id]);

    if (!booking) {
        return <div className="text-center text-gray-500">Loading booking details...</div>;
    }

    return (
        <div className="my-4 md:my-8 px-2 md:px-6">
            <h1 className="text-xl md:text-2xl font-semibold">{booking.place.title}</h1>
            <AddressLinks>{booking.place.address}</AddressLinks>

            {/* Booking Information Section */}
            <div className="bg-gray-200 p-2 md:p-4 mb-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                    <h2 className="text-lg md:text-xl mb-2 md:mb-4">Your Booking Information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-3 md:p-4 text-white rounded-2xl flex flex-col items-center justify-center w-full md:w-auto">
                    <div className="text-sm md:text-base">Total Price:</div>
                    <div className="text-2xl md:text-3xl font-bold">{booking.price}</div>
                </div>
            </div>

            {/* Place Gallery Section */}
            <PlaceGallery place={booking.place} />
        </div>
    );
}

export default BookingPage;
