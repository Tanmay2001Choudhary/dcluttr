import { cityData } from '@/data'
import { ArrowUpRight, CircleHelp } from 'lucide-react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import AreaChart from './lineChart'

const MetricCard = ({ title, value, growth, compareText, children }) => {
  return (
    <div className='bg-white border border-gray-300/50 rounded-lg'>
      <div className='p-4 flex justify-between items-center mb-2 border-b border-gray-300/50 text-gray-700'>
        <h2 className=''>{title}</h2>
        <CircleHelp className='w-5 h-5' />
      </div>

      <div className='p-4 flex items-center justify-between'>
        <h3 className='text-2xl font-bold'>{value}</h3>
        <div className='flex flex-col items-end justify-center'>
          <div className='flex items-center ml-4 text-sm text-green-600'>
            <ArrowUpRight size={16} />
            <span className='ml-1'>{growth}%</span>
          </div>
          <div className='text-xs text-gray-500 mb-4'>{compareText}</div>
        </div>
      </div>

      {children}

      <div className='p-4 flex border-t border-gray-300/50 justify-start mt-2 text-xs'>
        <div className='flex items-center mr-4'>
          <div className='h-2 w-2 rounded-full bg-green-500 mr-1'></div>
          <span>This Month</span>
        </div>
        <div className='flex items-center'>
          <div className='h-2 w-2 rounded-full bg-orange-500 mr-1'></div>
          <span>Last Month</span>
        </div>
      </div>
    </div>
  )
}

const TopCitiesCard = () => {
  const segments = [
    { percentage: 35, color: '#7C3AED' },
    { percentage: 28, color: '#EF4444' },
    { percentage: 18, color: '#FBBF24' },
    { percentage: 21, color: '#E5E7EB' },
  ]

  const layeredGauge = segments
    .map((seg, index) => {
      return {
        ...seg,
        accumulated: segments
          .slice(0, index + 1)
          .reduce((acc, s) => acc + s.percentage, 0),
      }
    })
    .reverse()
    .map((seg, index) => (
      <div className='absolute top-0 left-0 w-full h-full' key={index}>
        <CircularProgressbarWithChildren
          value={seg.accumulated}
          maxValue={100}
          strokeWidth={12}
          circleRatio={0.5}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: 'butt',
            trailColor: 'transparent',
            pathColor: seg.color,
            pathTransitionDuration: 0,
          })}
        />
      </div>
    ))

  return (
    <div className='bg-white rounded-lg shadow-sm'>
      <div className='flex p-4 justify-between items-center mb-2 border-b border-gray-300/50 text-gray-700'>
        <h2>Top Cities</h2>
        <CircleHelp className='w-5 h-5' />
      </div>

      <div className='p-4 h-40 flex justify-center items-center relative'>
        <div className='relative w-40 h-20 mt-4'>
          {layeredGauge}
          <div className='absolute top-[35%] left-1/2 transform -translate-x-1/2 text-center'>
            <div className='text-xs text-gray-500'>Total</div>
            <div className='text-xl font-bold'>₹68.2L</div>
            <div className='flex items-center justify-center text-xs text-green-600 mt-1'>
              <ArrowUpRight size={12} className='mr-1' />
              <span>2.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 mt-4 space-y-2'>
        {cityData.map((city, index) => (
          <div
            key={index}
            className='flex justify-between items-center text-sm'
          >
            <div className='flex items-center'>
              <div className={`h-2 w-2 rounded-full ${city.color} mr-2`}></div>
              <span>{city.name}</span>
            </div>
            <div className='flex space-x-4'>
              <span className='font-medium'>₹{city.value}L</span>
              <span className='text-gray-500'>{city.percentage}%</span>
              <span
                className={`text-${
                  city.trending === 'down' ? 'red' : 'green'
                }-600 flex items-center`}
              >
                <ArrowUpRight size={14} />
                {city.growth}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const AnalyticsCards = ({ salesData }) => {
  return (
    <div className='p-4 grid grid-cols-3 gap-4'>
      <MetricCard
        title='Sales (MRP)'
        value='125.49'
        growth='2.4'
        compareText='vs 113.69 last month'
      >
        <AreaChart
          data={salesData}
          height={40}
          customYAxis={{
            domain: [1.5, 6],
            ticks: [1.5, 3.0, 4.5, 6.0],
          }}
          showGradient={true}
          showComparison={true}
        />
      </MetricCard>

      <MetricCard
        title='Total Quantity Sold'
        value='125.49'
        growth='2.4'
        compareText='vs 113.69 last month'
      >
        <AreaChart
          data={salesData}
          height={40}
          customYAxis={{
            domain: [1.5, 6],
            ticks: [1.5, 3.0, 4.5, 6.0],
          }}
          showGradient={true}
          showComparison={true}
        />
      </MetricCard>

      <TopCitiesCard />
    </div>
  )
}

export default AnalyticsCards
