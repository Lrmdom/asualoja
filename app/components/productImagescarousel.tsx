

import { useState } from "react"

export default function Component(props) {
    const [selectedImage, setSelectedImage] = useState(0)

    let imgs= props.images?.map((element) => element["url"])
    const images = imgs
   //console.log(props.images)
    return (
        <div className="container grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 items-start">
            <div className="grid grid-cols-2 gap-4 container">
                {images.map((image, index) => (

                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`rounded-lg border transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary ${
                            index === selectedImage ? "border-primary ring-2 ring-primary" : "border-muted"
                        }`}
                    >
                        <img
                            src={image} // Replace with your image
                            alt={`Thumbnail ${index + 1}`}
                            width={100}
                            height={100}
                            className="object-cover w-full aspect-square"
                        />
                    </button>
                ))}
            </div>
            <div className="relative rounded-lg">
                <img
                    src={images[selectedImage]}
                    alt="Main Product Image"
                    width={800}
                    height={600}
                    className="object-cover w-full aspect-[4/3]"
                />
            </div>
        </div>
    )
}