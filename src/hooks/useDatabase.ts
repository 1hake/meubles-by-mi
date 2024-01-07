import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { projectFirestore } from "../firebase-config";

// useDatabase hook to fetch data from firestore using firebase version 9 modular

const useDatabase = (collectionName: string, limit: boolean) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      const q = query(collection(projectFirestore, "products"));
      const querySnapshot = await getDocs(q);
      let documents: any = [];
      querySnapshot.forEach((doc: any) => {
        documents.push({ ...doc.data(), id: doc.id });
      });

      if (limit) {
        documents = documents.filter((doc: any) => doc.forShowcase === true);
      }
      if (isSubscribed) {
        setImages(documents);
      }
    };
    fetchData();
    return () => {
      isSubscribed = false;
    };
  }, [collectionName]);

  return images;
};

export default useDatabase;
