import {useState} from "react"
import EmblaCarousel from "~/components/emblaCarousel/EmblaCarousel";

export default function Component(props) {
    const [selectedImage, setSelectedImage] = useState(0)

    let imgs = props.images?.map((element) => element["url"])
    const images = imgs
    //console.log(props.images)
    return (
        <div className="container items-start">
            <div className="">
                {images.map((image, index) => (

                    <button
                        key={index}
                        onClick={() => props.setEmblaImage(index)}
                        className={`rounded transition-all hover:scale-105  ${
                            index === props.emblaImage ? "opacity-50 border-primary border-2" : "opacity-80"
                        }`}
                    >

                        <img
                            src={image} // Replace with your image
                            alt={`Thumbnail ${index + 1}`}
                            width={25}
                            height={25}
                            className="aspect-square object-cover m-1 rounded"
                        />
                    </button>
                ))}
            </div>

        </div>
    )
}