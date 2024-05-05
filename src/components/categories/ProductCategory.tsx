import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { categories } from '../../data/categories'
import useCategories from '../../hooks/useCategorie'
import { getDownloadUrl } from '../../utils/firebaseUtils'
import { Loader } from '../common/Loader'
import { SectionTitle } from '../common/SectionTitle'
import ProductCard from '../products/ProductCard'
import { Product } from '../types/types'

export interface ProductCategoryProps {
  limit: boolean
}

export const ProductCategory: React.SFC<ProductCategoryProps> = ({ limit }) => {
  const { category } = useParams()
  const [images, setImages] = useState<Product[]>([])
  const [index, setIndex] = useState<number>(-1)
  const elements: Product[] = useCategories('products', false, category)

  const navigate = useNavigate()

  useEffect(() => {
    const promises = elements.map((element: Product) => {
      return getDownloadUrl(element.main_image)
    })
    Promise.all(promises).then((urls) => {
      const newImages = urls.map((url, index) => {
        return {
          src: url,
          id: elements[index].id,
          name: elements[index].name,
          description: elements[index].description,
          related_images: elements[index].related_images,
          price: elements[index].priceOptions[0].price,
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
    </>
  )
}

export default ProductCategory
