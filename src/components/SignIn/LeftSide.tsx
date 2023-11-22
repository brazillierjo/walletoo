"use client";
import { useGetRandomImageUrl } from "@/src/hooks/useGetRandomImageUrl";
import SpinnerLoadingScreen from "../Commons/LoadingScreen";

export const LeftSide: React.FC = () => {
    const randomImageUrl = useGetRandomImageUrl();

    return (
        <div className='h-40 w-full bg-no-repeat object-contain md:h-auto md:w-1/2 lg:w-2/3'>
            {randomImageUrl ? (
                <picture>
                    <img
                        className='h-full w-full bg-cover object-cover'
                        src={randomImageUrl ?? ""}
                        alt='Left side presentation'
                    />
                </picture>
            ) : (
                <SpinnerLoadingScreen />
            )}
        </div>
    );
};
