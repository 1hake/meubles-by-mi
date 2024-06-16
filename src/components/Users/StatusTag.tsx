import React from 'react'

import { Status } from '../types/types'

interface Props {
  status: Status
}

export const StatusTag = ({ status }: Props) => {
  const classes: string[] = []

  if (status === 'en attente') {
    classes.push('bg-red-400')
  }

  if (status === 'en cours de livraison') {
    classes.push('bg-blue-400')
  }

  if (status === 'livré') {
    classes.push('bg-green-400')
  }

  return (
    <div
      className={`${classes.join()} flex justify-center text-white rounded-full px-2 py-1 text-xs uppercase font-semibold tracking-wide`}
    >
      {status}
    </div>
  )
}
