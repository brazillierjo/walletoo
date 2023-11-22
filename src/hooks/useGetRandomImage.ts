import { useState } from "react";
import BackgroundImage1 from "@/src/assets/webp/background-image-1.webp";
import BackgroundImage2 from "@/src/assets/webp/background-image-2.webp";
import BackgroundImage3 from "@/src/assets/webp/background-image-3.webp";
import BackgroundImage4 from "@/src/assets/webp/background-image-4.webp";
import BackgroundImage5 from "@/src/assets/webp/background-image-5.webp";
import BackgroundImage6 from "@/src/assets/webp/background-image-6.webp";
import BackgroundImage7 from "@/src/assets/webp/background-image-7.webp";
import BackgroundImage8 from "@/src/assets/webp/background-image-8.webp";
import BackgroundImage9 from "@/src/assets/webp/background-image-9.webp";

export function useGetRandomImage() {
    const imageArray = [
        BackgroundImage1,
        BackgroundImage2,
        BackgroundImage3,
        BackgroundImage4,
        BackgroundImage5,
        BackgroundImage6,
        BackgroundImage7,
        BackgroundImage8,
        BackgroundImage9,
    ];

    const [images] = useState(imageArray);

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };

    return { images, getRandomImage };
}
