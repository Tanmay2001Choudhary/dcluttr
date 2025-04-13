import {
  ArrowDownRight,
  ArrowUpRight,
  ChartLine,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { useState } from 'react'

const Table = ({ tableData, heading, tableName, description }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'sales',
    direction: 'descending',
  })
  const [selectedRows, setSelectedRows] = useState([])

  const [filters, setFilters] = useState({})

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = [...tableData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1
    }
    return 0
  })

  const totals = tableData.reduce(
    (acc, item) => {
      return {
        sales: acc.sales + item.sales,
        outOfStock: acc.outOfStock + parseFloat(item.outOfStock),
        totalInventory: acc.totalInventory + item.totalInventory,
        averageRank: acc.averageRank + item.averageRank,
        estTraffic: acc.estTraffic + item.estTraffic,
        estImpressions: acc.estImpressions + item.estImpressions,
        clicks: acc.clicks + item.clicks,
      }
    },
    {
      sales: 0,
      outOfStock: 0,
      totalInventory: 0,
      averageRank: 0,
      estTraffic: 0,
      estImpressions: 0,
      clicks: 0,
    }
  )

  totals.averageRank = totals.averageRank / tableData.length
  totals.outOfStock = `${(totals.outOfStock / tableData.length).toFixed(0)}%`

  const SortHeader = ({ title, dataKey, isLast }) => {
    const isSortedColumn = sortConfig.key === dataKey

    const icon =
      isSortedColumn && sortConfig.direction === 'ascending' ? (
        <ChevronUp size={16} className='ml-1' />
      ) : (
        <ChevronDown size={16} className='ml-1' />
      )

    return (
      <th
        className={`px-3 py-3 bg-white text-left text-sm font-medium text-gray-700 tracking-wider whitespace-nowrap ${
          isLast ? 'border-r border-gray-300/50' : ''
        }`}
      >
        <div
          className='flex items-center cursor-pointer'
          onClick={() => handleSort(dataKey)}
        >
          {title}
          {icon}
        </div>
      </th>
    )
  }

  return (
    <div className=''>
      <div className='flex justify-between items-center mb-4'>
        <div>
          <h2 className='text-lg font-semibold'>{heading}</h2>
          <p className='text-sm text-gray-500'>{description}</p>
        </div>

        <button className='bg-green-700 text-white px-3 py-1.5 rounded flex items-center text-sm'>
          <span>Filters({Object.keys(filters).length || 1})</span>
          <ChevronDown size={16} className='ml-1' />
        </button>
      </div>

      <div className='bg-white rounded-2xl border border-gray-300/50 overflow-auto custom-table-scroller'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr className='border-gray-300/50'>
              <th
                rowSpan={2}
                className='px-3 py-3 bg-white text-left text-sm font-medium text-gray-700 tracking-wider border-r border-gray-300/50'
              >
                <div className='flex items-center'>
                  <ChartLine className='mr-1' />
                  {tableName} Name
                </div>
              </th>
              <th
                colSpan={3}
                className='px-3 py-3 bg-white text-center text-sm font-medium text-gray-700 tracking-wider border-b border-r border-gray-300/50'
              >
                Availability
              </th>
              <th
                colSpan={4}
                className='px-3 py-3 bg-white text-center text-sm font-medium text-gray-700 tracking-wider border-b border-gray-300/50'
              >
                Visibility
              </th>
            </tr>
            <tr>
              <SortHeader title='Sales' dataKey='sales' />
              <SortHeader title='Out of Stock' dataKey='outOfStock' />
              <SortHeader
                title='Total Inventory'
                dataKey='totalInventory'
                isLast
              />
              <SortHeader title='Average Rank' dataKey='averageRank' />
              <SortHeader title='Est. Traffic' dataKey='estTraffic' />
              <SortHeader title='Est. Impressions' dataKey='estImpressions' />
              <SortHeader title='Clicks' dataKey='clicks' />
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {sortedData.map((item) => {
              const growth = item.growth || 0
              const isPositive = growth >= 0

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-gray-100 ${
                    selectedRows.includes(item.id) ? 'bg-gray-100' : ''
                  }`}
                >
                  <td className='px-3 py-4 whitespace-nowrap font-medium flex items-center gap-2 underline border-r border-gray-300/50'>
                    <input
                      type='checkbox'
                      className='h-4 w-4 border-gray-300 rounded text-green-600'
                      checked={selectedRows.includes(item.id)}
                      onChange={() => {
                        setSelectedRows((prev) =>
                          prev.includes(item.id)
                            ? prev.filter((id) => id !== item.id)
                            : [...prev, item.id]
                        )
                      }}
                    />
                    {item.name}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    <div>₹{item.sales.toLocaleString('en-IN')}</div>
                    {item.growth && (
                      <div
                        className={`text-xs flex items-center ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}
                        {Math.abs(growth)}%
                      </div>
                    )}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    {item.outOfStock}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap border-r border-gray-300/50'>
                    {item.totalInventory}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    {item.averageRank}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    {item.estTraffic.toLocaleString()}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap'>
                    {item.estImpressions.toLocaleString()}
                  </td>
                  <td className='px-3 py-4 whitespace-nowrap'>{item.clicks}</td>
                </tr>
              )
            })}
            <tr className='bg-gray-50 font-semibold'>
              <td className='px-3 py-4 whitespace-nowrap border-r border-gray-300/50'>
                Total
              </td>
              <td className='px-3 py-4 whitespace-nowrap'>
                ₹{totals.sales.toLocaleString('en-IN')}
              </td>
              <td className='px-3 py-4 whitespace-nowrap'>
                {totals.outOfStock}
              </td>
              <td className='px-3 py-4 whitespace-nowrap border-r border-gray-300/50'>
                {totals.totalInventory.toLocaleString()}
              </td>
              <td className='px-3 py-4 whitespace-nowrap'>
                {totals.averageRank.toFixed(1)}
              </td>
              <td className='px-3 py-4 whitespace-nowrap'>
                {totals.estTraffic.toLocaleString()}
              </td>
              <td className='px-3 py-4 whitespace-nowrap'>
                {totals.estImpressions.toLocaleString()}
              </td>
              <td className='px-3 py-4 whitespace-nowrap'>
                {totals.clicks.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
