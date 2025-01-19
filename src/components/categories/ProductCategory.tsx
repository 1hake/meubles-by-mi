import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { categories } from '../../data/categories'
import useCategories from '../../hooks/useCategorie'
import { getDownloadUrl } from '../../utils/firebaseUtils'
import Button from '../common/Button'
import { SectionTitle } from '../common/SectionTitle'
import ProductCard from '../products/ProductCard'
import { Product, ProductCardType } from '../types/types'

const ProductCategory: React.FC = () => {
  const [images, setImages] = useState<ProductCardType[]>([])
  const { category } = useParams()
  const elements: Product[] = useCategories('products', category)
  console.log('🚀 ~ elements:', elements)

  const navigate = useNavigate()

  useEffect(() => {
    if (elements && elements.length > 0) {
      const promises = elements.map((element) => {
        return getDownloadUrl(element.main_image)
      })
      Promise.all(promises).then((urls) => {
        const newImages = urls.map((url, index) => {
          return {
            main_image: url,
            id: elements[index].id,
            name: elements[index].name,
            categories: elements[index].categories,
            description: elements[index].description,
            price: elements[index].color_images?.[0].price || elements[index].price,
            published: elements[index].published,
            color_images: elements[index].color_images
          }
        })
        setImages(newImages)
      })
    }
  }, [elements])

  if (!category) {
    return null
  }

  return (
    <>
      <section className="py-4 col-span-10 col-start-2 col-end-12">
        <SectionTitle id="showcase">{categories?.[category]}</SectionTitle>
        <main className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.length > 0 ? (
            images.map((image, index) => (
              <ProductCard
                key={index}
                src={image.main_image}
                name={image.name}
                price={image.price}
                id={image.id}
                description={image.description}
                colorNb={image?.color_images?.length || 0}
                onClick={(id) => navigate(`/product/${image.id}`)}
              />
            ))
          ) : (
            <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-4 text-center">
              <p>Oups, il n'y a pas encore de produit dans cette categorie</p>
              <Button color="dark" onClick={() => navigate('/')}>
                Retour à l'accueil
              </Button>
            </div>
          )}
        </main>
      </section>
    </>
  )
}

export default ProductCategory
