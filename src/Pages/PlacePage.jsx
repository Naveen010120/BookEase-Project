
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import BookingWidget from './BookingWidget';
import PlaceGallery from './PlaceGallery';
import AddressLinks from './AddressLinks';

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  
  useEffect(() => {
    if (!id)
      return;
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    })
  }, [id])
  if (!place) return '';

  return (
    <>
      <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>

        <h1 className='text-2xl'>{place.title}</h1>
        <AddressLinks>{place.address}</AddressLinks>
        <PlaceGallery place={place} />


        <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] ] '>
          <div>
            <div className='my-4'>
              <h2 className='font-semibold text-2xl text-justify'>Description</h2>
              {place.description}
            </div>
            <b>Check-in:</b> {place.checkIn} <br />
            <b>Check-out:</b> {place.checkOut} <br />
            <b>Max Number of guests:</b> {place.maxGuests} <br />
          </div>
          <BookingWidget place={place}/>

        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
        <h2 className='font-semibold text-2xl text-justify'>Extra Info</h2>
        
        </div>
              <div className='text-sm text-gray-700 leading mb-4 mt-2 leading-5'>{place.extraInfo}</div>
        </div>

      </div>

    </>
  )
}

export default PlacePage