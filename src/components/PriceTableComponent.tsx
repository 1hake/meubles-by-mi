import React, { useState } from 'react'

interface PriceRow {
  quantity: string
  price: string
}

interface Props {
  priceData: PriceRow[]
  onChange: (quantity: string) => void
}

export const PriceTableComponent: React.FC = ({ priceData, onChange }: Props) => {
  const [selectedQuantity, setSelectedQuantity] = useState<string>('')

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl border-2 border-black shadow-lg overflow-hidden md:max-w-2xl w-full">
        <div className="p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-bold text-center mb-4">Options de Prix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Article
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Prix TTC
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`cursor-pointer ${
                      row.quantity === selectedQuantity ? 'bg-blue-100' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      onChange(row.quantity)
                      setSelectedQuantity(row.quantity)
                    }}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{row.quantity}</td>
                    <td className="px-6 py-4">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
