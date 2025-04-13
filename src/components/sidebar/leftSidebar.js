import { Plus, Users } from 'lucide-react'
const SidebarItem = ({ children, isLast = false }) => {
  return (
    <div className={`mb-6 ${isLast ? 'mt-auto' : ''}`}>
      <div className='flex items-center justify-center'>{children}</div>
    </div>
  )
}
const LeftSidebar = () => {
  return (
    <div className='h-full w-1/5 bg-white flex flex-col items-center py-4'>
      <SidebarItem>
        <div className='rounded-xl border-2 border-green-800 w-10 h-10  bg-cover overflow-hidden'>
          <img src='/perfora.png' alt='' className='h-10' />
        </div>
      </SidebarItem>

      {/* Second item - Text */}
      <SidebarItem>
        <div className='w-10 h-10 flex flex-col items-center justify-center bg-cover overflow-hidden rounded-xl border border-gray-300'>
          <img src='/mamaearth.png' alt='' />
        </div>
      </SidebarItem>
      <SidebarItem>
        <div className='w-10 h-10 bg-black flex items-center justify-center bg-cover overflow-hidden rounded-xl'>
          <img src='/company.png' alt='' className='w-6' />
        </div>
      </SidebarItem>
      <SidebarItem href='/new'>
        <div className='w-10 h-10 border rounded-xl border-gray-400 flex items-center justify-center'>
          <Plus className='w-5 h-5 text-gray-500' />
        </div>
      </SidebarItem>
      <SidebarItem href='/new' isLast>
        <div className='w-10 h-10 flex items-center justify-center'>
          <Users className='w-5 h-5 text-gray-500' />
        </div>
      </SidebarItem>
      <SidebarItem href='/new'>
        <div className='w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center'>
          <span>TC</span>
        </div>
      </SidebarItem>
    </div>
  )
}

export default LeftSidebar
