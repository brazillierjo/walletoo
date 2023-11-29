"use client"

import SpinnerLoadingScreen from "@/src/components/Commons/LoadingScreen"
import { useGetRandomImageUrl } from "@/src/hooks/useGetRandomImageUrl"

export const LeftSide: React.FC = () => {
  const randomImageUrl = useGetRandomImageUrl()

  return (
    <div className="h-40 w-full bg-no-repeat object-contain md:h-[85vh] md:w-1/2 lg:w-2/3">
      {randomImageUrl ? (
        <picture>
          <img
            className="h-full w-full rounded-md bg-cover object-cover"
            src={randomImageUrl ?? ""}
            alt="Left side presentation"
          />
        </picture>
      ) : (
        <SpinnerLoadingScreen />
      )}
    </div>
  )
}
