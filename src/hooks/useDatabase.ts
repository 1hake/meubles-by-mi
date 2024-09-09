import { collection, getDocs, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { projectFirestore } from '../firebase-config'

// Updated useDatabase hook to fetch data and include Firestore references

export const useCollectionName = (collectionName: string, limit: boolean) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    let isSubscribed = true

    const fetchData = async () => {
      const q = query(collection(projectFirestore, collectionName))
      const querySnapshot = await getDocs(q)
      let documents: any = []
      querySnapshot.forEach((doc) => {
        // Include the document reference in the stored object
        documents.push({ ...doc.data(), id: doc.id, ref: doc.ref })
      })

      // Optionally filter documents if limit is true and the field `forShowcase` should be true
      if (limit) {
        documents = documents.filter((doc: any) => doc.forShowcase === true)
      }

      if (isSubscribed) {
        setImages(documents)
      }
    }

    fetchData()

    return () => {
      isSubscribed = false // Cleanup to prevent setting state on unmounted component
    }
  }, [collectionName, limit]) // Include limit in the dependencies array if its changes should trigger re-fetching

  return images
}
