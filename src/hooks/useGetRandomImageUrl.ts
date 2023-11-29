import { useEffect, useState } from "react"
import BackgroundImage1 from "@/public/assets/webp/background-image-1.webp"
import BackgroundImage2 from "@/public/assets/webp/background-image-2.webp"
import BackgroundImage3 from "@/public/assets/webp/background-image-3.webp"
import BackgroundImage4 from "@/public/assets/webp/background-image-4.webp"
import BackgroundImage5 from "@/public/assets/webp/background-image-5.webp"
import BackgroundImage6 from "@/public/assets/webp/background-image-6.webp"
import BackgroundImage7 from "@/public/assets/webp/background-image-7.webp"
import BackgroundImage8 from "@/public/assets/webp/background-image-8.webp"
import BackgroundImage9 from "@/public/assets/webp/background-image-9.webp"

export function useGetRandomImageUrl() {
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
  ]

  const [randomImageUrl, setRandomImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageArray.length)
    const randomImage = imageArray[randomIndex]

    if (typeof randomImage === "object" && "src" in randomImage) {
      setRandomImageUrl(randomImage.src)
    } else {
      setRandomImageUrl(randomImage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return randomImageUrl
}
