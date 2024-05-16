import classNames from 'classnames'
import React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  color?: 'light' | 'dark'
  size?: 'small' | 'large'
}

const Button = ({ children, onClick, disabled = false, color = 'light', size = 'large', className }: Props) => {
  const shadowColor = color === 'light' ? 'rgb(0,0,0)' : 'rgba(255,255,255)'

  const baseClasses = 'border-2 rounded-lg text-lg cursor-pointer'
  const lightClasses = 'bg-white text-black border-black'
  const darkClasses = 'bg-black text-white border-white'
  const disabledClasses = 'opacity-50 cursor-not-allowed'

  const sizeClasses =
    size === 'small'
      ? `px-2 py-1 shadow-[2px_2px_0px_0px_${shadowColor}]`
      : `px-4 py-2 shadow-[${shadowColor}_5px_5px_0px_0px]`

  const colorClasses = color === 'light' ? lightClasses : darkClasses

  const classes = classNames(baseClasses, colorClasses, sizeClasses, className, { [disabledClasses]: disabled })

  return (
    <button onClick={onClick} disabled={disabled} className={classes} aria-disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
