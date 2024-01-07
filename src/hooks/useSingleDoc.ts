import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";

import { projectFirestore, projectStorage } from "../firebase-config";

const useSingleDoc = (collectionName, id) => {
  const [element, setElement] = useState(null);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const docRef = doc(projectFirestore, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = { ...docSnap.data(), id: docSnap.id };

        // Get download URLs for images
        const mainImageRef = ref(projectStorage, data.main_image);
        const mainImageUrl = await getDownloadURL(mainImageRef);

        const relatedImageUrls = await Promise.all(
          data.related_images.map(async (image) => {
            const imageRef = ref(projectStorage, image);
            return await getDownloadURL(imageRef);
          })
        );

        data.main_image = mainImageUrl;
        data.related_images = relatedImageUrls;

        if (isSubscribed) {
          setElement(data);
        }
      } else {
        console.log("No such document!");
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, [collectionName, id]);

  return element;
};

export default useSingleDoc;
