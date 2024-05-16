import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  color?: 'light' | 'dark'
  size?: 'small' | 'large'
}

const Button = ({ children, onClick, disabled, color = 'light', size = 'large', className }: Props) => {
  const baseClasses = 'border-2 rounded-lg text-lg'
  const lightClasses = 'bg-white text-black border-black'
  const darkClasses = 'bg-black text-white border-white'

  const shadowColor = color === 'light' ? 'rgba(0,0,0)' : 'rgba(255,255,255)'

  const largeClasses = `px-4 py-2 shadow-[5px_5px_0px_0px_${shadowColor}]`
  const smallClasses = `px-2 py-1 shadow-[2px_2px_0px_0px_${shadowColor}]`

  const colorClasses = color === 'light' ? lightClasses : darkClasses
  const sizeClasses = size === 'small' ? smallClasses : largeClasses

  const classes = `${baseClasses} ${colorClasses} ${sizeClasses} ${className || ''}`

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}

export default Button
