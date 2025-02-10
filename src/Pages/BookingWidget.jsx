/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { UserContext } from '../UserContext';

function BookingWidget({ place }) {
  let [checkIn, setCheckIn] = useState('');
  let [checkOut, setCheckOut] = useState('');
  let [numberOfGuests, setNumberOfGuests] = useState(1);
  let [name, setName] = useState('');
  let [phone, setPhone] = useState('');
  let [redirect, setRedirect] = useState('');
  let { user } = useContext(UserContext);
  let numberOfNights = 0;

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    try {
      let response = await axios.post('/bookings', {
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });
      setRedirect(`/account/bookings/${response.data._id}`);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className='bg-white shadow p-4 rounded-2xl max-w-lg mx-auto w-full md:max-w-xl lg:max-w-2xl'>
      <div className='text-2xl text-center font-semibold'>
        <b>Price:</b> ₹{place.price} /per night
      </div>
      <div className='border rounded-2xl mt-4 p-4 space-y-4'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1'>
            <label>Check In:</label>
            <input className='w-full p-2 border rounded-lg' type='date' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
          <div className='flex-1'>
            <label>Check Out:</label>
            <input className='w-full p-2 border rounded-lg' type='date' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
        </div>
        <div>
          <label>Number of guests:</label>
          <input className='w-full p-2 border rounded-lg' type='number' value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)} />
        </div>
        {numberOfNights > 0 && (
          <div className='space-y-3'>
            <label>Your Full Name:</label>
            <input className='w-full p-2 border rounded-lg' type='text' placeholder='Enter Full Name' value={name} onChange={(e) => setName(e.target.value)} />
            <label>Phone Number:</label>
            <input className='w-full p-2 border rounded-lg' type='tel' placeholder='xxxxxxxxx' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        )}
      </div>
      <button className='primary
       text-white w-full py-2 mt-4 rounded-lg hover:bg-blue-700' onClick={bookThisPlace}>
        Book this place {numberOfNights > 0 && <span> - ₹{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
}

export default BookingWidget;