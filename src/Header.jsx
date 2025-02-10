import { useContext, useState } from 'react';
import img from './assets/BookEase.png';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

function Header({ data, setData }) {
    let { user } = useContext(UserContext);
    let [search, setSearch] = useState(false);

    function searchAction() {
        setSearch(true);
    }

    return (
        <header className='flex flex-wrap justify-between items-center p-4 shadow-md bg-white'>
            {/* Logo Section */}
            <Link to={'/'} className='w-24 md:w-28'>
                <img src={img} alt="BookEase Logo" className='w-full' />
            </Link>

            {/* Search Bar */}
            <div className='flex flex-grow max-w-md md:max-w-lg lg:max-w-xl gap-2 border border-gray-300 rounded-full px-4 py-2 shadow-sm items-center'>
                {!search ? (
                    <>
                        <div className='hidden md:block mr-20 ml-5'>Anywhere</div>
                        <div className='border-l border-gray-900 h-5 hidden md:block mr-10'></div>
                        <div className='hidden md:block mr-20'>Add guests</div>
                        <div className='border-l border-gray-900 h-5 hidden md:block mr-10'></div>
                    </>
                ) : (
                    <input 
                        type='text' 
                        className='border-none outline-none w-full' 
                        placeholder='Search...'
                        onChange={(e) => setData(e.target.value)}
                    />
                )}
                <button className='bg-primary text-white p-2 rounded-full' onClick={searchAction}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='w-6 h-6'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>

            {/* User Account Section */}
            <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className='w-6 h-6'>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden w-8 h-8 flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className='w-6 h-6'>
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>
                </div>
                {!!user && <div className='hidden md:block'>{user.name}</div>}
            </Link>
        </header>
    );
}

export default Header;
