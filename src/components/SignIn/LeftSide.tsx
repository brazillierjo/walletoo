"use client";
import React, { useEffect, useState } from "react";
import { useGetRandomImage } from "@/src/hooks/useGetRandomImage";

export default function LeftSide() {
    const { getRandomImage } = useGetRandomImage();
    const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);
    const backgroundImageStyle = backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

    useEffect(() => {
        setBackgroundImageUrl(getRandomImage());
    }, [getRandomImage]);

    return (
        <div className='h-40 w-full bg-no-repeat object-contain md:h-auto md:w-1/2 lg:w-2/3'>
            <div className='h-full w-full bg-cover' style={backgroundImageStyle} />
        </div>
    );
}
