// ProductsShowCase.jsx

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCollectionName } from '../../hooks/useDatabase'
import useMediaQuery from '../../hooks/useMediaQuery'
import { getDownloadUrl } from '../../utils/firebaseUtils'
import { SectionTitle } from '../common/SectionTitle'
import ProductCard from '../products/ProductCard'

export interface ShowcaseProps {
  limit: boolean
}

interface FirebaseElement extends DatabaseElement {
  main_image: string
  related_images: string[]
  categories: string[]
  description: string
  price: number
  published: boolean
  promotion: number
  new: boolean
}

export const ProductsShowCase: React.FC<ShowcaseProps> = ({ limit }) => {
  const [images, setImages] = useState<FirebaseElement[]>([])
  const [index, setIndex] = useState(-1)
  const elements: FirebaseElement[] = useCollectionName('products', false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const navigate = useNavigate()
  useEffect(() => {
    if (elements.length > 0) {
      const promises = elements.map((element) => {
        return getDownloadUrl(element.main_image)
      })
      Promise.all(promises).then((urls) => {
        const newImages = urls.map((url, index) => {
          return {
            src: url,
            id: elements[index].id,
            name: elements[index].name,
            categories: elements[index].categories,
            description: elements[index].description,
            price: elements[index].priceOptions[0].price,
            published: elements[index].published,
            promotion: elements[index].promotion,
            new: elements[index].new
          }
        })
        setImages(newImages)
      })
    }
  }, [elements])

  const isMobile = useMediaQuery('(max-width: 768px)')

  const filteredImages = images
    .filter((image) => (selectedCategory ? image.categories.includes(selectedCategory) : true))
    .slice()
    .sort((a, b) => (sortByPrice ? (sortOrder === 'asc' ? a.price - b.price : b.price - a.price) : 0))

  return (
    <>
      <section className="py-4 col-span-10 col-start-2 col-end-12">
        <SectionTitle id="showcase">Produits</SectionTitle>
        {/* <FilterBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortByPrice={sortByPrice}
          setSortByPrice={setSortByPrice}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        /> */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredImages.map((image, index) => (
            <ProductCard
              key={index}
              src={image.src}
              name={image.name}
              price={image.price}
              id={image.id}
              description={image.description}
              promotion={image.promotion}
              new={image.new}
              onClick={(id) => navigate(`/product/${image.id}`)}
            />
          ))}
        </main>
      </section>
    </>
  )
}

export default ProductsShowCase
