import { doc, getDoc } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { useEffect, useState } from 'react'

import { projectFirestore, projectStorage } from '../firebase-config'

const useSingleDoc = (collectionName: string, id: string) => {
  const [element, setElement] = useState<any>(null)

  useEffect(() => {
    let isSubscribed = true

    const fetchData = async () => {
      const docRef = doc(projectFirestore, collectionName, id)
      console.log('🚀 ~ fetchData ~ docRef:', docRef)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = { ...docSnap.data(), id: docSnap.id, ref: docRef }

        // Get download URL for the main image
        if (data.main_image) {
          const mainImageRef = ref(projectStorage, data.main_image)
          data.main_image = await getDownloadURL(mainImageRef)
        }

        // Fetch URLs for related images
        if (data.related_images && data.related_images.length > 0) {
          const relatedImageUrls = await Promise.all(
            data.related_images.map(async (image) => {
              const imageRef = ref(projectStorage, image)
              return await getDownloadURL(imageRef)
            })
          )
          data.related_images = relatedImageUrls
        } else {
          data.related_images = [] // Set to empty array if no related images
        }

        // Fetch URLs for color images
        if (data.color_images && data.color_images.length > 0) {
          const colorImageUrls = await Promise.all(
            data.color_images.map(async (item) => {
              const imageRef = ref(projectStorage, item.image)
              const imageUrl = await getDownloadURL(imageRef)
              return { ...item, image: imageUrl } // Return color with updated URL
            })
          )
          data.color_images = colorImageUrls
        } else {
          data.color_images = [] // Set to empty array if no color images
        }

        if (isSubscribed) {
          setElement(data)
        }
      } else {
        console.log('No such document!')
        if (isSubscribed) {
          setElement(null)
        }
      }
    }

    fetchData()

    return () => {
      isSubscribed = false // Cleanup to prevent setting state on unmounted component
    }
  }, [collectionName, id])

  return element
}

export default useSingleDoc
