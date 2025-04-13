import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const AreaChart = ({
  data,
  height = 40,
  hideYAxis = false,
  customYAxis = null,
  showDots = false,
  showGradient = false,
  showComparison = true,
}) => {
  return (
    <div className={`h-${height} mr-2`}>
      <ResponsiveContainer width='100%' height='100%'>
        <RechartsAreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            horizontal={true}
            vertical={false}
            stroke='#EEEEEE'
          />
          <XAxis
            dataKey='day'
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            stroke='#999999'
            tickFormatter={(day) => (day === '0' ? '' : day)}
          />
          {hideYAxis ? (
            <YAxis hide={true} />
          ) : customYAxis ? (
            <YAxis
              axisLine={false}
              tickLine={false}
              tickCount={4}
              domain={customYAxis.domain}
              ticks={customYAxis.ticks}
              stroke='#999999'
              tickFormatter={(value) => value.toFixed(1)}
            />
          ) : (
            <YAxis
              axisLine={false}
              tickLine={false}
              stroke='#999999'
              tickFormatter={(value) => value.toFixed(1)}
            />
          )}
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const thisMonth = payload.find(
                  (p) => p.dataKey === 'thisMonth'
                )?.value
                const lastMonth = payload.find(
                  (p) => p.dataKey === 'lastMonth'
                )?.value

                return (
                  <div
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #E0E0E0',
                      borderRadius: '4px',
                      padding: '8px',
                      fontSize: '12px',
                      color: '#333',
                      lineHeight: 1.5,
                    }}
                  >
                    <div className='text-green-400'>
                      <strong className='text-black'>This Month:</strong>{' '}
                      {thisMonth}
                    </div>
                    <div className='text-orange-400'>
                      <strong className='text-black'>Last Month:</strong>{' '}
                      {lastMonth}
                    </div>
                  </div>
                )
              }
              return null
            }}
          />

          <defs>
            <linearGradient id='greenGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#10B981' stopOpacity={0.2} />
              <stop offset='100%' stopColor='#10B981' stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* This Month line with area */}
          <Area
            type='monotone'
            dataKey='thisMonth'
            stroke='#10B981'
            strokeWidth={2}
            fill='url(#greenGradient)'
            dot={false}
            activeDot={{
              r: 4,
              fill: '#10B981',
              stroke: 'white',
              strokeWidth: 2,
            }}
            isAnimationActive={false}
          />

          {/* Last Month comparison line - explicitly force to front */}
          {showComparison && (
            <Area
              type='monotone'
              dataKey='lastMonth'
              stroke='#FE6D73'
              fill='none' // no fill to keep it line-style
              strokeWidth={2}
              strokeDasharray='4 4'
              dot={false}
              activeDot={{
                r: 4,
                fill: '#FE6D73',
                stroke: 'white',
                strokeWidth: 2,
              }}
              isAnimationActive={false}
            />
          )}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AreaChart
