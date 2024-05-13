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
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = { ...docSnap.data(), id: docSnap.id, ref: docRef }

        // Get download URL for the main image if it exists
        if (data.main_image) {
          try {
            const mainImageRef = ref(projectStorage, data.main_image)
            data.main_image = await getDownloadURL(mainImageRef)
          } catch (error) {
            console.error('Error downloading main image:', error)
            // Optionally handle errors or set a default image
          }
        }

        // Fetch URLs for related images if they exist
        if (data.related_images && data.related_images.length > 0) {
          try {
            const relatedImageUrls = await Promise.all(
              data.related_images.map(async (image) => {
                const imageRef = ref(projectStorage, image)
                return await getDownloadURL(imageRef)
              })
            )
            data.related_images = relatedImageUrls
          } catch (error) {
            console.error('Error downloading related images:', error)
            data.related_images = []
          }
        } else {
          data.related_images = []
        }

        // Fetch URLs for color images if they exist
        if (data.color_images && data.color_images.length > 0) {
          try {
            const colorImageUrls = await Promise.all(
              data.color_images.map(async (item) => {
                if (item.image) {
                  const imageRef = ref(projectStorage, item.image)
                  const imageUrl = await getDownloadURL(imageRef)
                  return { ...item, image: imageUrl } // Return color with updated URL
                }
                return item // Return item as is if no image to process
              })
            )
            data.color_images = colorImageUrls
          } catch (error) {
            console.error('Error downloading color images:', error)
            data.color_images = []
          }
        } else {
          data.color_images = []
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
