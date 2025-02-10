import React from 'react';

function AddressLinks({ children }) {
  return (
    <a 
      target='_blank' 
      rel='noopener noreferrer'
      href={'https://maps.google.com/?q=' + children} 
      className='font-semibold underline my-3 flex flex-wrap items-center gap-2 md:gap-3 text-sm sm:text-base'
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-5 h-5 sm:w-6 sm:h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
      {children}
    </a>
  );
}

export default AddressLinks;
