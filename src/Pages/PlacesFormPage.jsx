/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
import axios from 'axios';
import { useEffect, useState } from 'react'
import Perks from '../../Perks';

import PhotosUploader from './PhotosUploader';
import { Navigate, useParams } from 'react-router-dom';


function PlacesFormPage() {
    const {id}=useParams();
    console.log(id)
    // console.log(title)

    const [title, setTitle] = useState('');
        const [address, setAddress] = useState('');
        let [description, setDescription] = useState('')
        const [addedPhotos, setAddedPhotos] = useState([]);
        const [perks, setPerks] = useState([]);
        const [extraInfo, setExtraInfo] = useState('');
        const [checkIn, setCheckIn] = useState('');
        const [checkOut, setCheckOut] = useState('');
        const [maxGuests, setMaxGuests] = useState(1);
        const [price,setPrice]=useState(100);
        let [redirect,setRedirect]=useState(false)
        useEffect(()=>{
            
            if(!id){
                return;
            }
            axios.get('/places/'+id).then(response=>{
                const {data}=response;
                setTitle(data.title);
                console.log(data)
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests);
                setPrice(data.price)
            })
        },[id])
        function inputHeader(text){
            return(
                <h2 className='text-2xl mt-4'>{text}</h2>
            )
        }
        function inputDescr(text){
            return(
                <p>{text}</p>
            )
        }
       
         function preInput(header, description) {
                return (
                    <>
                        {inputHeader(header)}
                        {inputDescr(description)}
                    </>
                )
            }

            async function savePlace(e){
                e.preventDefault();
                const placeData={
                    title,address,addedPhotos,description,perks,extraInfo,checkIn,checkOut,maxGuests,price
                }
              if(id){
                await axios.post('/places',{id,...placeData});
                setRedirect(true)
              }else{
                //newplacw
                await axios.post('/places',placeData);
                setRedirect(true)
              }
              
             
        
            }
            if(redirect){
                return <Navigate to={'/account/places'}/>
            }
           
            
  return (
    <div>
    <form onSubmit={savePlace}>
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
        <div className='grid sm:grid-cols-2 gap-2 md:grid-cols-4'>
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
            <div>
                <h3>Price per night</h3>
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
        </div>

        <button className='primary my-4'>Save</button>

    </form>
</div>
  )
}

export default PlacesFormPage