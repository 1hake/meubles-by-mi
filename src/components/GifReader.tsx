import React, { useEffect, useState } from "react";

import { getDownloadUrl } from "../utils/firebaseUtils";

export const GifReader = ({ path }) => {
    const [url, setUrl] = useState<string>("");
    useEffect(() => {
        const url = getDownloadUrl(path);
        url.then((url) => {
            setUrl(url);

        });
    }, [path]);

    if (!url) {
        return null;
    }

    return (

        <img className="w-full" src={url} alt="gif" />

    );
}
