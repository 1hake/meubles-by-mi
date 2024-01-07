import "yet-another-react-lightbox/styles.css";

import * as React from "react";

import Lightbox from "yet-another-react-lightbox";
import { getDownloadUrl } from "../utils/firebaseUtils";

export default function RelatedPhotosLightBox({ currentPhoto }) {
    const [open, setOpen] = React.useState(false);
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        if (currentPhoto?.related_images?.length > 0) {
            const promises = currentPhoto.related_images.map((url) => {
                return getDownloadUrl(url);
            });
            Promise.all(promises).then((urls) => {
                setImages(urls);
            });
        }
    }, [currentPhoto]);

    return (
        <div className="flex w-full justify-center p-4 bg-black">
            <button className="font-bold w-full h-max text-white px-4 py-2 text-2xl uppercase"
                type="button" onClick={() => setOpen(true)}>
                <h1>
                    Voir {currentPhoto?.related_images?.length} autres photos
                </h1>
            </button>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={images.map((image) => {
                    return {
                        src: image,
                    };
                })}
            />
        </div>
    );
}