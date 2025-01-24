import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCollectionName } from '../../hooks/useDatabase'
import { getDownloadUrl } from '../../utils/firebaseUtils'
import { SectionTitle } from '../common/SectionTitle'
import ProductCard from '../products/ProductCard'
import { Product, ProductCardType } from '../types/types'

export const ProductsShowCase: React.FC = () => {
  const [products, setProducts] = useState<ProductCardType[]>([])
  const elements: Product[] = useCollectionName('products', false)
  const navigate = useNavigate()

  useEffect(() => {
    if (elements.length > 0) {
      const fetchProductImages = async () => {
        const productPromises = elements.map(async (element) => {
          const url = await getDownloadUrl(element.main_image)
          return {
            ...element,
            src: url,
            price: element?.priceOptions?.[0]?.price || element.color_images?.[0].price || 0
          }
        })
        const productsWithImages = await Promise.all(productPromises)
        setProducts(productsWithImages)
      }
      fetchProductImages()
    }
  }, [elements])

  return (
    <section className="py-4 col-span-10 col-start-2 col-end-12">
      <SectionTitle id="showcase">Produits</SectionTitle>
      <main className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            src={product.src}
            name={product.name}
            price={product.price}
            description={product.description}
            colorNb={product.color_images?.length || 0}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </main>
    </section>
  )
}

export default ProductsShowCase
