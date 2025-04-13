'use client'
import AnalyticsCards from '@/components/content/analyticsCard'
import Header from '@/components/content/header'
import PlatformSelector from '@/components/content/platformSelector'
import Table from '@/components/content/table'
import LeftSidebar from '@/components/sidebar/leftSidebar'
import RightSidebar from '@/components/sidebar/rightSidebar'
import { cityTableData, salesData, skuData } from '@/data'
import { useState } from 'react'

export default function Home() {
  const [selectedPlatforms, setSelectedPlatforms] = useState(['Blinkit'])
  return (
    <div className=' flex h-screen overflow-hidden'>
      <div className='w-1/4 h-screen bg-white flex'>
        <LeftSidebar />
        <RightSidebar />
      </div>
      <div className='w-3/4 flex-1 h-screen my-2 pr-2 overflow-auto custom-scrollbar'>
        <div className='rounded-lg border-2 bg-gray-50 mb-4 border-[#EBEBEB] overflow-hidden'>
          <Header />
          <PlatformSelector
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
          />
          <AnalyticsCards salesData={salesData} />

          <div className='p-4'>
            <Table
              tableData={skuData}
              tableName='SKU'
              heading='SKU level data'
              description='Analytics for all your SKUs'
            />
          </div>
          <div className='p-4'>
            <Table
              tableData={cityTableData}
              tableName='City'
              heading='City level data'
              description='Analytics for all your Cities'
            />
          </div>
        </div>
      </div>
    </div>
  )
}
