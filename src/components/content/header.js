'use client'
import { CalendarDays, ChartLine, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isChecked, setIsChecked] = useState(false)

  const handleToggle = () => {
    setIsChecked((prev) => !prev)
  }
  return (
    <div className='bg-white p-4 border-b-2 border-[#EBEBEB] flex justify-between items-center'>
      <h1 className='text-lg font-medium'>Quick Commerce</h1>

      <div className='flex items-center space-x-2'>
        <div className='border py-2 px-3 gap-2 border-gray-200 shadow-sm rounded-md flex items-center'>
          <ChartLine />
          <div className='cont'>
            <div className='toggle'>
              <input
                type='checkbox'
                id='mode-toggle'
                className='toggle__input'
                checked={isChecked}
                onChange={handleToggle}
              />
              <label htmlFor='mode-toggle' className='toggle__label'></label>
            </div>
          </div>
        </div>

        <div className='border shadow-sm border-gray-200 rounded-md px-3 py-2 flex items-center space-x-2'>
          <CalendarDays />
          <span>April 13, 2025 - April 20, 2025</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  )
}

export default Header
