import * as React from 'react'
import { useEffect, useState } from 'react'
import Lightbox from 'react-image-lightbox'
import PhotoAlbum from 'react-photo-album'

import useCategories from '../hooks/useCategorie'
import useDatabase from '../hooks/useDatabase'
import useMediaQuery from '../hooks/useMediaQuery'
import { getDownloadUrl } from '../utils/firebaseUtils'
import { MyDialog } from './Panel'
import { SectionTitle } from './SectionTitle'

export interface ShowcaseProps {
  limit: boolean
  categorie: string
}

interface PhotoAlbumElement {
  src: string
  width: number
  height: number
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

export const DisplayCategory: React.SFC<ShowcaseProps> = ({ limit, category }) => {
  const [images, setImages] = useState<PhotoAlbumElement[]>([])
  const [index, setIndex] = useState<number>(-1)
  const elements: FirebaseElement[] = useCategories('images', false, category)
  const slides = images.map(({ src, width, height, images }) => src)

  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (elements.length > 0) {
      const promises = elements.map((element: FirebaseElement) => {
        return getDownloadUrl(element.url)
      })
      Promise.all(promises).then((urls) => {
        const newImages = urls.map((url, index) => {
          return {
            src: url,
            width: elements[index].width,
            height: elements[index].height,
            name: elements[index].name,
            description: elements[index].description,
            related_images: elements[index].related_images,
            gif: elements[index].gif
          }
        })
        setImages(newImages)
      })
    }
  }, [elements])

  if (images.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <>
      <PhotoAlbum
        photos={images}
        layout={'columns'}
        columns={isMobile ? 2 : 3}
        onClick={(event, photo, index) => {
          setIndex(index + 1)
        }}
      />
      <MyDialog isOpen={index > 0} currentPhoto={images[index - 1]} onClose={() => setIndex(-1)}></MyDialog>
    </>
  )
}
