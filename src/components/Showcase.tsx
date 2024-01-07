import * as React from "react";

import { useEffect, useState } from "react";

import { MyDialog } from "./Panel";
import PhotoAlbum from "react-photo-album";
import { SectionTitle } from "./SectionTitle";
import { getDownloadUrl } from "../utils/firebaseUtils";
import useDatabase from "../hooks/useDatabase";
import useMediaQuery from "../hooks/useMediaQuery";

export interface ShowcaseProps {
  limit: boolean;
}

interface PhotoAlbumElement {
  src: string;
  width: number;
  height: number;
}

interface FirebaseElement {
  url: string;
  width: number;
  height: number;
  images: string[];
}

const randomlySliceNElems = (arr, n) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const ShowcaseIntro: React.SFC<ShowcaseProps> = (ShowcaseProps) => {
  const [images, setImages] = useState<PhotoAlbumElement[]>([]);
  const [index, setIndex] = useState(-1);
  const elements: FirebaseElement[] = useDatabase("images", false);
  const slides = images.map(({ src, width, height, images }) => src);

  useEffect(() => {
    if (elements.length > 0) {
      const promises = elements.map((element: FirebaseElement) => {
        return getDownloadUrl(element.url);
      });
      Promise.all(promises).then((urls) => {
        const newImages = urls.map((url, index) => {
          return {
            src: url,
            width: elements[index].width,
            height: elements[index].height,
            name: elements[index].name,
            description: elements[index].description,
          };
        });
        setImages(newImages);
      });
    }
  }, [elements]);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <section className="py-4 col-span-10 col-start-2 col-end-12">
        <SectionTitle id="showcase">Showcase</SectionTitle>
        <main className=" grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 w-full ">
          {images && (
            <PhotoAlbum
              photos={randomlySliceNElems(images, 5)}
              layout={"columns"}
              columns={isMobile ? 2 : 3}
              onClick={(event, photo, index) => {
                console.log("clicked", photo);

              }}
            />
          )}
        </main>
        <MyDialog
          isOpen={index > 0}
          currentPhoto={images[index - 1]}
          onClose={() => setIndex(-1)}
        ></MyDialog>

      </section>
    </>
  );
};
