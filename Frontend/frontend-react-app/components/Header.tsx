import React from 'react'
import Image from "next/image"
import {GlobeAltIcon, MenuIcon, SearchIcon, UserCircleIcon} from '@heroicons/react/solid'


function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
        {/* 
            left 
        */}
        <div className="relative flex items-center h-10 cursor-pointer my-auto">
                <Image
                    src="https://links.papareact.com/qd3"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
        </div>

        {/* 
            Mid 
        */}
        <div className='flex items-center md:border-2 rounded-full py-2 md:shadow-sm'>
            <input 
                className='flex-grow pl-6 bg-transparent outline-none text-sm text-gray-500 placeholder-gray-400'
                type = "text" 
                placeholder='Start Searching'
            />
            <SearchIcon className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2  cursor-pointer md:mx-3'/>
        </div>

        {/* 
            Right 
        */}
        <div className='flex items-center space-x-4 justify-end text-gray-500'>
            <p className='hidden md:inline cursor-pointer'>
                Join Jeebnb
            </p>
            <GlobeAltIcon className='h-6 cursor-pointer'/>

            <div className='flex items-center space-x-2 border-2 rounded-full p-2 cursor-pointer'>
                <MenuIcon className='h-6 cursor-pointer'/>
                <UserCircleIcon className='h-6 cursor-pointer'/>
            </div>
        </div>
    </header>
  )
}

export default Header