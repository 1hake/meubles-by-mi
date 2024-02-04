import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { categories } from '../data/categories'
import useCategories from '../hooks/useCategorie'
import { getDownloadUrl } from '../utils/firebaseUtils'
import { Loader } from './Loader'
import { MyDialog } from './Panel'
import ProductCard from './ProductCard'
import { SectionTitle } from './SectionTitle'

export interface ProductCategoryProps {
  limit: boolean
}

interface FirebaseElement {
  url: string
  width: number
  height: number
  images: string[]
  description: string
  name: string
  related_images: string[]
  gif: string
}

export const ProductCategory: React.SFC<ProductCategoryProps> = ({ limit }) => {
  const { category } = useParams()
  const [images, setImages] = useState<FirebaseElement[]>([])
  console.log('🚀 ~ images:', images)
  const [index, setIndex] = useState<number>(-1)
  const elements: FirebaseElement[] = useCategories('products', false, category)

  const navigate = useNavigate()

  useEffect(() => {
    const promises = elements.map((element: FirebaseElement) => {
      return getDownloadUrl(element.main_image)
    })
    Promise.all(promises).then((urls) => {
      const newImages = urls.map((url, index) => {
        return {
          src: url,
          id: elements[index].id,
          width: elements[index].width,
          height: elements[index].height,
          name: elements[index].name,
          description: elements[index].description,
          related_images: elements[index].related_images,
          gif: elements[index].gif,
          price: elements[index].price,
          promotion: elements[index].promotion,
          new: elements[index].new
        }
      })
      setImages(newImages)
    })
  }, [category, elements])

  return (
    <>
      <SectionTitle id="category">{categories[category]}</SectionTitle>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
        {images.length !== 0 ? (
          images.map((image, index) => (
            <ProductCard
              key={index}
              src={image.src}
              name={image.name}
              price={image.price}
              id={image.id}
              description={image.description}
              promotion={image.promotion}
              new={image.new}
              onClick={() => navigate(`/product/${image.id}`)}
            />
          ))
        ) : (
          <Loader />
        )}
      </main>
      <MyDialog isOpen={index > 0} currentPhoto={images[index - 1]} onClose={() => setIndex(-1)} />
    </>
  )
}

export default ProductCategory
