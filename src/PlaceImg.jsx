/* eslint-disable react/prop-types */
import React from 'react';

function PlaceImg({ place, index = 0, className = null }) {
  console.log('Place prop:', place); // Debugging

  if (!place?.photos?.length) {
    console.log('No photos available for this place');
    return null;
  }

  if (!className) {
    className = 'object-cover';
  }

  return (
    <img
      src={`https://bookease-apis.onrender.com/uploads/${place.photos[index]}`}
      alt="Place"
      className={className}
    />
  );
}

export default PlaceImg;
