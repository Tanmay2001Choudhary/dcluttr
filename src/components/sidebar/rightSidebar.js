'use client'
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsUpDown,
  CircleHelp,
  Images,
  MonitorPause,
  Settings,
} from 'lucide-react'
import { useState } from 'react'

const RightSidebar = () => {
  const [activeNav, setActiveNav] = useState('Meta Ads')
  const getNavItemClasses = (item) =>
    `pl-8 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
      activeNav === item
        ? 'bg-gray-300/50 text-green-700'
        : 'text-gray-600 hover:bg-gray-300/50 hover:text-green-700'
    }`
  return (
    <div className='flex flex-col w-3/4 h-full bg-gray-50'>
      <div className='p-2 bg-white border-gray-200 flex items-center justify-between'>
        <div className='flex items-center justify-between w-4/5 bg-[#FaFaFa] p-2 border-2 border-gray-300 rounded-xl  my-2'>
          <div className='flex items-center'>
            <div className='w-7 h-7 rounded-md bg-[#309E96] flex items-center justify-center mr-2'>
              <span className='text-xs text-white font-medium'>TC</span>
            </div>
            <span className='font-medium'>BlinkIt</span>
          </div>
          <ChevronsUpDown size={16} />
        </div>
        <ChevronsLeft size={16} />
      </div>

      <nav className='flex-1 p-2 px-4'>
        <div className='px-4 py-2 flex items-center gap-3 font-medium'>
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
            ></path>
          </svg>
          <span>Overview</span>
        </div>

        <div className='mt-2 flex gap-2 flex-col'>
          <div className='px-4 py-2 flex items-center justify-between font-medium'>
            <div className='flex items-center gap-3'>
              <MonitorPause />
              <span>Channels</span>
            </div>
            <ChevronDown size={16} />
          </div>

          <div
            className={getNavItemClasses('Meta Ads')}
            onClick={() => setActiveNav('Meta Ads')}
          >
            Meta Ads
          </div>
          <div
            className={getNavItemClasses('Google Ads')}
            onClick={() => setActiveNav('Google Ads')}
          >
            Google Ads
          </div>
          <div
            className={getNavItemClasses('Quick Commerce')}
            onClick={() => setActiveNav('Quick Commerce')}
          >
            Quick Commerce
          </div>
        </div>

        <div className='px-4 py-2 flex items-center gap-3 font-medium mt-2'>
          <Images />
          <span>Creatives</span>
        </div>
      </nav>

      <div className='mt-auto p-2 px-4'>
        <div className='px-4 py-3 flex items-center font-medium'>
          <CircleHelp className='w-5 h-5 mr-3' />
          <span>Help</span>
        </div>

        <div className='px-4 py-3 flex items-center font-medium'>
          <Settings className='w-5 h-5 mr-3' />
          <span>Settings</span>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
