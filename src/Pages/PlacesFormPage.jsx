/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
import axios from 'axios';
import { useState } from 'react'
import Perks from '../../Perks';

import PhotosUploader from './PhotosUploader';


function PlacesFormPage() {
    const [title, setTitle] = useState('');
        const [address, setAddress] = useState('');
        let [description, setDescription] = useState('')
        const [addedPhotos, setAddedPhotos] = useState([]);
        const [perks, setPerks] = useState([]);
        const [extraInfo, setExtraInfo] = useState('');
        const [checkIn, setCheckIn] = useState('');
        const [checkOut, setCheckOut] = useState('');
        const [maxGuests, setMaxGuests] = useState(1);
       
         function preInput(header, description) {
                return (
                    <>
                        {inputHeader(header)}
                        {inputDescr(description)}
                    </>
                )
            }
            async function addNewPlace(e){
                e.preventDefault();
              
              await axios.post('/places',{title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests});
             
        
            }
           
         function preInput(header, description) {
                return (
                    <>
                        {inputHeader(header)}
                        {inputDescr(description)}
                    </>
                )
            }
            async function addNewPlace(e){
                e.preventDefault();
              
              await axios.post('/places',{title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests});
              
        
            }
            
  return (
    <div>
    <form onSubmit={addNewPlace}>
        {preInput('Title', 'title for your place, should be short and catchy as in advertisement')}
        <input type="text" placeholder='title, for example: My lovely apt' value={title} onChange={e => setTitle(e.target.value)} />
        {preInput('Address', 'Address to this place')}
        <input type="text" placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
        {preInput('Photos', 'more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
        {preInput('Description', 'description of the place')}
        <textarea value={description} onChange={e => setDescription(e.target.value)}>
        </textarea>
        {preInput('Perks', 'select all the perks of your place')}
        <div className='grid grap-2 mt-2 grid-cols-2  md:grid-cols-3 lg:grid-cols-6'>
            <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra Info', 'house rules, etc.')}
        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} ></textarea>
        {preInput('Check in & out times, max guests', 'add check in and out time window for cleaning the room between guests')}
        <div className='grid sm:grid-cols-3 gap-2'>
            <div className='mt-2 -mb-1'>
                <h3>Check in time</h3>
                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder='14' />
            </div>
            <div>
                <h3>Check out time</h3>

                <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder='11' />
            </div>
            <div>
                <h3>Max number of guests</h3>
                <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
            </div>
        </div>

        <button className='primary my-4'>Save</button>

    </form>
</div>
  )
}

export default PlacesFormPage