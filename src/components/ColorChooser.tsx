import React from 'react'

const ColorChooser = ({ colors, selectedColor, onColorChange }) => {
  return (
    <div className="flex items-center">
      {colors.map((color, index) => (
        <div
          key={index}
          onClick={() => onColorChange(color)}
          className={`w-8 h-8 border rounded-full mx-2 cursor-pointer ${
            selectedColor === color ? 'border-2 border-white' : ''
          }`}
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  )
}

export default ColorChooser
