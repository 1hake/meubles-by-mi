import React from 'react'

const NumberInput = ({ value, onChange }) => {
  const handleDecrement = () => {
    if (value > 1) onChange(value - 1) // Optional: Prevent decrement below 1
  }

  const handleIncrement = () => {
    onChange(value + 1)
  }

  return (
    <div className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-slate-800 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md h-8 w-8 flex justify-center items-center"
          onClick={handleDecrement}
          disabled={value <= 1} // Optional: Disable button if value is 1 or less
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <input
          className="text-center w-full mx-2 text-lg leading-none bg-transparent outline-none border-none text-gray-800 dark:text-white"
          type="text"
          value={value}
          onChange={(e) => onChange(Math.max(1, parseInt(e.target.value, 10) || 1))} // Prevent non-numeric values and negative values
        />
        <button
          type="button"
          className="text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md h-8 w-8 flex justify-center items-center"
          onClick={handleIncrement}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NumberInput
