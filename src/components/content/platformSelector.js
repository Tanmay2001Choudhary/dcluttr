const PlatformSelector = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const platforms = [
    {
      id: 'Blinkit',
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Blinkit-yellow-rounded.svg',
      color: 'yellow',
    },
    {
      id: 'Zepto',
      img: './zepto.png',
      color: 'purple',
    },
    { id: 'Instamart', img: './instamart.png', color: 'orange' },
  ]

  return (
    <div className='bg-white px-4 py-3 border-b-2 border-[#EBEBEB] flex space-x-2'>
      <div className='border border-gray-300/50 rounded-2xl flex items-center justify-evenly gap-2 p-1'>
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`px-3 py-1.5 rounded transition-all duration-200 ease-in-out ${
              selectedPlatforms.includes(platform.id)
                ? `bg-[#DFEAE8] text-gray-600`
                : ``
            } flex items-center cursor-pointer rounded-xl gap-2`}
            onClick={() => setSelectedPlatforms([platform.id])}
          >
            <img src={platform.img} alt='' className='w-6 h-6 rounded-[2px]' />
            <span>{platform.id}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlatformSelector
